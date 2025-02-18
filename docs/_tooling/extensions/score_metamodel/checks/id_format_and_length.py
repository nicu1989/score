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
import os

from sphinx_needs.data import NeedsInfoType

from score_metamodel import CheckLogger, local_check





@local_check
def check_id_length(need: NeedsInfoType, log: CheckLogger):
    """
    Validates that the requirement ID does not exceed the hard limit of 40 characters.
    While the recommended limit is 30 characters, this check enforces a strict maximum of 40 characters.
    If the ID exceeds 40 characters, a warning is logged specifying the actual length.
    ---
    """
    if len(need["id"]) > 40:
        msg = f"exceeds the maximum allowed length of 40 characters (current length: {len(need['id'])})."
        log.warning_for_option(need, "id", msg)
