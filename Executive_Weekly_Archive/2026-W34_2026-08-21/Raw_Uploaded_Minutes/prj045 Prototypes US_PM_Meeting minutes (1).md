Date: August 4, 2026

Project Manager: Camilo Mogni

Attendees: Adrien Gesulfo, Kirsten Wall, Camilo Mogni, Phillip Nezandonyi

# **US/ZA \- Production optimisation**

## **Meeting Details**

* **Title**: US/ZA \- Production optimisation  
* **Date**: 2026-08-04  
* **Location**: Google Meet  
* **Project Manager**: Camilo Mogni

## **Metadata**

* **Project ID**: CITRA-PROD-001  
* **Meeting ID**: MTG-20260804  
* **Facilitator**: Camilo Mogni  
* **Status**: Approved

## **Participants**

* Adrien Gesulfo  
* Kirsten Wall  
* Camilo Mogni  
* Phillip Nezandonyi

### **1\. Meeting Objective / Purpose**

To address production complications affecting the Pine Brook project and the US prototype, establish a mandatory design freeze process, and align architectural design requirements with manufacturing capabilities to reduce material waste and production costs.

### **2\. Executive Summary**

The team debated the necessity of production standardization and design integration to ensure efficient manufacturing processes across multiple projects. Key discussions centered on implementing a firm design freeze, rationalizing production geometries (including snapping to 50mm increments to reduce the current 36+ unique panel depths), and adjusting structural models to simplify transport and assembly. The team also agreed to refine the BIM workflow to prevent duplicated modeling efforts between the engineering and production units.

### **3\. Agenda Items & Discussion Notes**

* **Design Freeze & Quality Control:** Emphasized the need for a mandatory design freeze prior to production to lock in structural parameters, avoid costly on-the-fly clash resolutions, and transform current feedback loops into a workshop-based quality control system.  
* **Grid Standardization:** Debated metric (600mm/500mm) versus imperial (2 ft) spacing. Concluded that the production and engineering units should define main grids early in the process. Establishing increments of 50mm will minimize unique panel depths and offcut waste.  
* **Material Rationalization & Costs:** Discussed the financial impact of specialized panel cuts, noting that each unique cut adds approximately 1,000 Rand in cost.  
* **Profile 2 Geometries:** Highlighted current 2D CNC machine limitations with complex concave/convex roof-to-wall junctions. Agreed to simplify T-piece and curved joints to straight cuts for the prototypes, utilizing on-site PU foam applications for the final shape.  
* **Handling Constraints & Assembly:** Addressed the massive weight of the US prototype "elephant ear" panels (which accommodate 300mm HVAC tubing). Clarified that the Pine Brook project will not require these, significantly easing transport logistics and on-site assembly risks.  
* **BIM Workflow Refinement:** Identified significant workflow duplication. Moving forward, engineering will focus on solid wall models and standard details, while production will handle the internal panel element modeling.

## **Decisions Made**

* **Decision 1**: The team mandates a design freeze and value engineering process prior to project development to ensure designs align with production capabilities.  
* **Decision 2**: The production and engineering units are now responsible for defining grid line layouts to minimize production complexity, rather than leaving this entirely to the architectural design team.  
* **Decision 3**: The design of the T-piece roof-to-wall joint is simplified to a straight-cut detail to improve production feasibility for the prototype.  
* **Decision 4**: The BIM modeling workflow is refined to eliminate duplication; Engineering will focus on standard details and solid wall structures, while the production unit develops the internal production models.  
* **Decision 5**: Production will establish a process to snap measurements to 50mm or 25mm increments to severely limit the number of unique panel depths per project.

## **Risk Register**

| Risk Name | Description | Mitigation |
| :---- | :---- | :---- |
| Unique Panel Cost Inflation (High) | High volumes of unique, specialized panel cuts increase manufacturing time and costs significantly. | Rationalize dimensions to 50mm increments and establish a KPI to strictly limit total unique panel depths. |
| Profile 2 Cutting Failures (Medium) | Current CNC machinery struggles with complex concave/convex geometries, leading to production bottlenecks. | Replace curved geometries with straight-cut elements in the production model and apply PU foam on-site. |
| Panel Damage During Assembly (High) | Extremely heavy "elephant ear" panels pose significant transport and on-site handling risks, including breaking vital web connections. | Implement specialized rack systems for transport and simplify splicing methods for high scaffolding assembly. |

## **Issue Register**

* Issue: Excessive duplication of modeling effort between engineering and production teams. **Root Cause**: Both teams are modeling detailed webs and cores in Revit without a clear boundary of responsibility. **Proposed Solution**: Redefine workflows so engineering provides standard solid structures and production handles detailed internal panelization.  
* Issue: Architectural designs frequently deviate from standard grids due to ad-hoc window/door placements. **Root Cause**: Architects lack visibility into panel-specific constraints like plaster thickness and web alignment during initial drafting. **Proposed Solution**: Production and engineering teams to establish "main grids" early in the design stage for architects to work within.

## **Action Items**

| ID | Task Description | Assignee | Deadline | Status |
| :---- | :---- | :---- | :---- | :---- |
| ACT-001 | Create a standardized design workflow to decompose complex architectural details into buildable components. | Adrien Gesulfo | ASAP | Pending |
| ACT-002 | Verify the required grid spacing standards (2ft vs 600mm) with the engineering department. | The Group | ASAP | Pending |
| ACT-003 | Develop a plan view with defined grid lines for the architectural framework. | Production Unit | ASAP | Pending |
| ACT-004 | Supply production constraint feedback to the design team to ensure future plans align with material capabilities. | The Group | ASAP | Pending |
| ACT-005 | Modify the T-piece joint configuration to enable straight cuts. | Camilo Mogni | ASAP | Pending |
| ACT-006 | Update assembly drawings with instructions for extra foam application. | The Group | ASAP | Pending |
| ACT-007 | Establish a standardized workflow for handling complex Profile 2 geometries on the CNC machine. | Adrien Gesulfo | ASAP | Pending |

## **Metrics**

* **BPI**: 1.0  
* **SPI**: 1.0  
* **Progress**: 50

## **Tags**

* Production, Optimisation, Design Freeze, BIM, Grid Lines, CNC Milling, Assembly

