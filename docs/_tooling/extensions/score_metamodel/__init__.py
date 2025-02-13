# *******************************************************************************
# Copyright (c) 2025 Contributors to the Eclipse Foundation
#
# See the NOTICE file(s) distributed with this work for additional
# information regarding copyright ownership.
#
# This program and the accompanying materials are made available under the
# terms of the Apache License Version 2.0 which is available at
# https://www.apache.org/licenses/LICENSE-2.0
#
# SPDX-License-Identifier: Apache-2.0
# *******************************************************************************
import importlib
import os
import pkgutil
from typing import Callable

from ruamel.yaml import YAML
from sphinx.application import Sphinx
from sphinx_needs import logging
from sphinx_needs.data import NeedsInfoType, SphinxNeedsData

from .log import CheckLogger

logger = logging.get_logger(__name__)

local_checks: list[Callable[[NeedsInfoType, CheckLogger], None]] = []
graph_checks: list[Callable[[dict[str, NeedsInfoType], CheckLogger], None]] = []


def discover_checks():
    """
    Dynamically import all checks.
    They will self-register with the decorators below.
    """

    package_name = ".checks"  # load ./checks/*.py
    package = importlib.import_module(package_name, __package__)
    for _, module_name, _ in pkgutil.iter_modules(package.__path__):
        logger.debug(f"Importing check module: {module_name}")
        importlib.import_module(f"{package_name}.{module_name}", __package__)


def local_check(func: Callable[[NeedsInfoType, CheckLogger], None]):
    """Use this decorator to mark a function as a local check."""
    logger.debug(f"new local_check: {func}")
    local_checks.append(func)
    return func


def graph_check(func: Callable[[dict[str, NeedsInfoType], CheckLogger], None]):
    """Use this decorator to mark a function as a graph check."""
    logger.debug(f"new graph_check: {func}")
    graph_checks.append(func)
    return func


def _run_checks(app: Sphinx, exception: Exception | None) -> None:
    # Do not run checks if an exception occurred during build
    if exception:
        return

    needs_all_needs = SphinxNeedsData(app.env).get_needs_view()

    logger.debug(f"Running checks for {len(needs_all_needs)} needs")

    log = CheckLogger(logger)

    # Need-Local checks: checks which can be checked file-local, without a
    # graph of other needs.
    for need in needs_all_needs.values():
        for check in local_checks:
            check(need, log)

    # Graph-Based checks: These warnings require a graph of all other needs to
    # be checked.
    needs = needs_all_needs.values()
    for check in graph_checks:
        check(needs, log)

    if log.has_warnings:
        log.warning("Some needs have issues. See the log for more information.")
        # TODO: exit code


def setup(app: Sphinx):
    app.config.needs_id_required = True
    app.config.needs_id_regex = r"^[A-Za-z0-9_-]{6,}"

    # load metamodel.yaml via ruamel.yaml
    here = os.path.abspath(os.path.dirname(__file__))
    yaml_path = os.path.join(here, "metamodel.yaml")

    yaml = YAML()
    with open(yaml_path, "r", encoding="utf-8") as f:
        data = yaml.load(f)

    types_dict = data.get("types", {})
    links_dict = data.get("links", {})

    # Convert "types" from {directive_name: {...}, ...} to a list of dicts
    needs_types_list = []
    for directive_name, directive_data in types_dict.items():
        # Build up a single "needs_types" item
        one_type = {
            "directive": directive_name,
            "title": directive_data.get("title", ""),
            "prefix": directive_data.get("prefix", ""),
        }

        if "color" in directive_data:
            one_type["color"] = directive_data["color"]
        if "style" in directive_data:
            one_type["style"] = directive_data["style"]

        # mandatory_options => "req_opt" as list of (name, regex)
        req_opts_yaml = directive_data.get("mandatory_options", {})
        req_opt_list = [(k, v) for k, v in req_opts_yaml.items()]
        one_type["req_opt"] = req_opt_list

        # optional_options => "opt_opt" as list of (name, regex)
        opt_opts_yaml = directive_data.get("optional_options", {})
        opt_opt_list = [(k, v) for k, v in opt_opts_yaml.items()]
        one_type["opt_opt"] = opt_opt_list

        # mandatory_links => "req_link"
        mand_links_yaml = directive_data.get("mandatory_links", {})
        if mand_links_yaml:
            one_type["req_link"] = [(k, v) for k, v in mand_links_yaml.items()]

        # optional_links => "opt_link"
        opt_links_yaml = directive_data.get("optional_links", {})
        if opt_links_yaml:
            one_type["opt_link"] = [(k, v) for k, v in opt_links_yaml.items()]

        needs_types_list.append(one_type)

    # Convert "links" dict -> list of {"option", "incoming", "outgoing"}
    needs_extra_links_list = []
    for link_option, link_data in links_dict.items():
        needs_extra_links_list.append({
            "option": link_option,
            "incoming": link_data.get("incoming", ""),
            "outgoing": link_data.get("outgoing", ""),
        })

    # Compute needs_extra_options from all mandatory + optional options
    all_options = set()
    for directive_data in types_dict.values():
        all_options.update(directive_data.get("mandatory_options", {}).keys())
        all_options.update(directive_data.get("optional_options", {}).keys())
    needs_extra_options = sorted(all_options)

    # Assign everything to Sphinx config
    app.config.needs_types = needs_types_list
    app.config.needs_extra_links = needs_extra_links_list
    app.config.needs_extra_options = needs_extra_options

    # Dynamically discover checks
    discover_checks()

    # Connect the check runner at the end of build
    app.connect("build-finished", _run_checks)

    # Return extension metadata
    return {
        "version": "0.1",
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
