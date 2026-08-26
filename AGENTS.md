# UI Design & Execution Rules

## 1. Preserve the Intended Design

* Follow the user's UI instructions exactly.
* Treat the user's described layout, structure, spacing, animation, interaction, and visual hierarchy as the source of truth.
* Do not redesign, reinterpret, or significantly alter the requested UI unless explicitly instructed.
* Preserve existing design patterns and components when they are relevant to the requested change.

## 2. No Automatic Feature Creep

* Do **not** automatically add features, sections, buttons, animations, interactions, effects, or content that were not requested.
* Do not add "helpful" improvements simply because they seem useful.
* Do not introduce extra UI elements to fill empty space.
* If an additional feature appears necessary, ask for confirmation before implementing it.

## 3. Confirmation Before Execution

Before making significant UI changes:

* Clearly identify what will be changed.
* Confirm the intended implementation with the user before executing it when the request involves a major redesign, structural change, or potentially irreversible modification.
* Do not begin implementation based on assumptions when multiple reasonable interpretations exist.

For small, explicit, unambiguous changes, execution may proceed without additional confirmation.

## 4. Ask When Instructions Are Unclear

If the user's instruction is ambiguous, incomplete, contradictory, or difficult to visualize:

* **Stop before implementing.**
* Ask a concise clarification question.
* If useful, ask the user to provide a screenshot, reference image, sketch, mockup, or illustration.
* Do not guess the intended design when the difference could materially affect the result.

Example:

> "I understand the general direction, but I'm not sure how you want the certificates positioned in the orbit. Can you provide a quick sketch or reference image?"

## 5. Use Visual References as the Source of Truth

When the user provides a screenshot, mockup, illustration, or reference design:

* Analyze the visual structure before editing.
* Reproduce the intended layout as closely as practical.
* Do not replace the reference design with your own interpretation.
* If a visual reference conflicts with written instructions, ask which one should take priority.

## 6. Execution Mode

While executing a requested UI change:

* Do not provide unnecessary explanations, tutorials, or commentary about what the code is doing.
* Do not narrate every implementation step.
* Keep execution focused on completing the requested task.
* Avoid interrupting the workflow with unnecessary questions once the requirements are sufficiently clear.

## 7. Output After Execution

After completing the implementation:

* Give a concise summary of what was changed.
* Mention only relevant files/components and important implementation details.
* Report verification results, such as whether the UI was tested or the application successfully built.
* Do not provide a lengthy explanation unless the user asks for one.

## 8. Maintainability

UI implementations must remain maintainable:

* Reuse existing components where appropriate.
* Avoid unnecessary duplication.
* Keep styling organized and consistent with the existing project.
* Use reusable data structures for repeated UI elements.
* Keep animations and interactions isolated and understandable.
* Avoid hardcoded values when they should reasonably be configurable.
* Do not create overly complex implementations for simple visual requirements.

## 9. Responsive Design

* Preserve usability across desktop, tablet, and mobile layouts.
* Do not sacrifice the requested visual design unnecessarily for responsiveness.
* If the requested design cannot reasonably work on smaller screens, ask before introducing a substantially different mobile layout.

## 10. Animation Rules

* Only add animations explicitly requested by the user or already present in the existing design.
* Keep animations purposeful, smooth, and lightweight.
* Do not add excessive effects, parallax, glow, bouncing, floating, scaling, or decorative motion without permission.
* Respect reduced-motion accessibility preferences where practical.

## 11. Existing Functionality

* Do not break existing navigation, interactions, responsiveness, accessibility, or functionality while modifying the UI.
* Do not remove existing functionality unless explicitly requested.
* When changing a component, inspect its dependencies and usage before restructuring it.

## 12. Priority Order

When interpreting UI requests, follow this priority:

1. **Explicit user instructions**
2. **User-provided screenshots, mockups, or illustrations**
3. **Existing project design system and architecture**
4. **Maintainability and accessibility**
5. **Developer judgment**

When uncertainty remains between two significantly different implementations, **ask the user instead of guessing**.

## 13. Core Principle

> **Implement what was requested — not what you think the user might want.**

Do not add, remove, redesign, or improve UI elements beyond the requested scope without confirmation.

## 14. Implementation Requests Require Execution

When the user explicitly requests an implementation, do not stop at describing, suggesting, or planning the implementation. Inspect the existing code, make the required changes, and verify the result. If implementation cannot proceed because the requirement is genuinely unclear, ask for clarification before making changes.

## 15. Animation Requests Require Actual Motion

For animation requests, do not consider a static visual arrangement sufficient. If the requirement specifies movement, transition, rotation, sliding, or animation, the implementation must contain actual state-driven or time-driven animation logic that produces the requested motion.
