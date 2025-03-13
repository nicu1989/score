..
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

.. _chm_impact_analysis_templates:

Impact Analysis Template
========================

.. gd_temp:: Impact Analysis Template
   :id: gd_temp__change__impact_analysis
   :status: valid
   :complies: std_req__aspice_40__SUP-10-BP2, std_req__iso26262__support_22, , std_req__iso26262__support_23

[will be updated by improvement issue: #621]

Type of Change Request
----------------------

[New Feature/Component, Modification of an existing Feature/Component]

Dependencies on other Change Requests
-------------------------------------

[List all dependencies on other Change Request]

Affected Work Products
----------------------

[List all work products and elements affected by the Change Request]

    .. note::
     For the identification of the affected work products use the Traceability Analysis approach.
     Traceability analysis uses the existing links between different elements (requirements, architecture, implementation, etc.)
     for the identification of the affected work products and elements.

Work Products to be changed
---------------------------

[List all work products and elements to be modified by the Change Request]

    .. note::
     Use the results from the Traceability Analysis approach.


Stakeholder identification
--------------------------

[Describe here which stakeholder and which roles of the stakeholder are involved to execute the Change Request]


   .. note::
      Typically the :need:`Technical Project Leads <rl__technical_lead>` or :need:`Module Leads <rl__module_lead>` are involved
      for planning and approval activities. As well as :need:`Safety Manager <rl__safety_manager>` or :need:`Security Manager <rl__security_manager>`
      are responsible for Change Request which has impact on functional safety or security.

Schedule for realization and verification of the Change Request
---------------------------------------------------------------

[Describe here which Milestones are considered to realize the Change Request.]
[Describe here which work products to be changed.]
[Describe here the verification methods used for the changed work products]

    .. note::
     A draft realization plan may support the realization proposal.

Potential Impact on Security
-----------------------------

[How could a malicious user take advantage of this new/modified feature/component?]

Which security requirements are affected or has to be changed?
Could the new/modified feature/component enable new threat scenarios?
Could the new/modified feature/component enable new attack paths?
Could the new/modified feature/component impact functional safety?
If applicable, which additional security measures must be implemented to mitigate the risk.

    .. note::
     Use Trust Boundary, Defense in Depth Analysis and/or Security Software Critically Analysis,
     Vulnerability Analysis.
     [Methods will be defined later in Process area Security Analysis]

Potential Impact on Safety
--------------------------

[How could the safety be impacted by the new/modified feature/component?]

Which safety requirements are affected or has to be changed?
Could the new/modified feature/component be a potential common cause or cascading failure initiator?
If applicable, which additional safety measures must be implemented to mitigate the risk.

    .. note::
     Use Dependency Failure Analysis and/or Safety Software Critically Analysis.
     [Methods will be defined later in Process area Safety Analysis]

For new feature/component contributions:

[What is the expected ASIL level?]
[What is the expected classification of the contribution?]

   .. note::
      Use the component classification method here to classify your component, if it shall to be used in a safety context: :need:`gd_temp__component_classification`.
