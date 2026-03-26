# Assignment 2: Modern Frontend Component Library + Trae Practice

::: tip Goal
Use Trae or another AI IDE together with a modern component library to build a frontend that feels like a real product rather than a classroom demo.
:::

The previous assignment focused on full-stack completeness. This one focuses on frontend quality: structure, consistency, interaction, responsiveness, and iteration.

Many first frontend projects can “work” but still feel unfinished:

- the layout is usable, but visually inconsistent
- buttons, forms, drawers, and tables do not feel like one system
- the desktop version is acceptable, but narrow screens fall apart
- AI can generate a first version quickly, but the result still looks generic

This assignment is about pushing past that first draft.

Suggested review chapters:

- [From Design Prototype to Project Code](../../frontend/2.6-design-to-code/)
- [Upgrade Your Interface with Modern Component Libraries](../../frontend/2.7-modern-component-library/)
- [Make Interfaces Beautiful with LLMs and Skills](../../frontend/2.4-llm-skills-beautiful/)
- [Reference UI Design Specifications and Multi-Product UI Design](../../frontend/2.3-multi-product-ui/)

## 1. Assignment Goal

Build a frontend project with:

- a clear use case
- a structured layout
- a consistent design language
- real interaction patterns
- code organized in reusable components

Possible project types:

- a landing page
- a logged-in product workspace
- a dashboard or admin interface
- an AI tool interface
- a multi-module content management page

## 2. Required Tools

You should use:

- **Trae** or another AI coding IDE
- **at least one modern component library**

Examples:

- React: `shadcn/ui`, `Ant Design`, `HeroUI`, `Material UI`
- Vue: `Element Plus`, `Naive UI`, `Ant Design Vue`

The important part is not just naming a library. The library should meaningfully improve the project's structure and polish.

## 3. Minimum Requirements

| Area | Minimum Requirement | Notes |
| --- | --- | --- |
| Page scope | At least 2 pages, or 1 complex main page plus 1 supporting page | Example: dashboard + detail page |
| Component library | Use at least 1 real component library | It should appear in the actual implementation |
| Component breakdown | At least 5 reusable components or clearly separated modules | Navigation, filters, table area, modal, summary cards, etc. |
| Interaction | At least 3 interaction types | Form validation, modal/drawer, tabs, menus, filters, pagination, chart switching, etc. |
| States | Include at least 3 of the following: loading, empty, error, success feedback | Important for product realism |
| Responsiveness | Desktop-ready, with reasonable narrow-screen handling | Full mobile support is a bonus |
| Data | Real APIs or structured mock data | Even mock data should be organized well |
| Delivery | Repo link + public deployment | GitHub + Vercel/Zeabur is recommended |

## 4. Suggested Project Directions

### 4.1 Product landing page

Good for practicing visual hierarchy and presentation.

Suggested sections:

- hero
- feature cards
- workflow
- testimonials
- pricing
- FAQ
- footer

Good library options: `HeroUI`, `Material UI`

### 4.2 AI tool workspace

Good for layout, state design, and interaction.

Suggested sections:

- sidebar
- top toolbar
- input area
- result area
- history panel
- settings modal

Good library options: `shadcn/ui`, `Element Plus`

### 4.3 Dashboard / admin interface

Good for dense information layout and component composition.

Suggested sections:

- summary cards
- charts
- filters
- data table
- details drawer or modal
- pagination and status tags

Good library options: `Ant Design`, `Element Plus`

## 5. Suggested Workflow

### 5.1 Decide three things first

Before opening Trae, write down:

1. what kind of product you are building
2. why you chose this component library
3. which 3 modules matter most on the page

That clarity will make AI-generated output far better.

### 5.2 Generate the first structural version

In the first round, focus on layout, component structure, data shape, and core interactions rather than visual perfection.

Example prompt:

```text
Help me build a frontend project for [product type] using [component library].

For the first version, focus on:
1. page structure
2. component breakdown
3. mock data structure
4. core interactions
5. responsive layout foundations

Please split the code into reasonable page and component files.
```

### 5.3 Use later rounds for polish

Once the first version works, iterate on:

- spacing and layout rhythm
- visual hierarchy
- button priority
- hover/focus/disabled states
- status colors, icons, and tags
- narrow-screen adaptation

This is often where the project begins to feel like a real product.

### 5.4 Add the missing product details

Do not skip:

- loading buttons during submission
- empty-state messaging
- fallback UI for failed requests
- confirmation and feedback for save/delete/export flows
- scroll and overflow behavior in dense layouts

These details often create the biggest quality jump.

## 6. Starter Prompt Template

```text
Help me build a frontend interface for [project name] using [component library].
The style should feel [modern / professional / lightweight / consumer / enterprise].

Target users:
- [who uses this]

Page goal:
- [the most important task on this page]

Layout:
- left side: ...
- top area: ...
- main content: ...
- right side / bottom: ...

Interaction requirements:
- include several of: modal, drawer, filters, form validation, charts, pagination
- include loading, empty, and error states
- desktop-first, with narrow-screen handling

Implementation requirements:
- clear component breakdown
- mock data in separate files or modules
- do not generate one giant page file
- build structure first, then improve visuals iteratively
```

## 7. Deliverables

Please submit:

1. **A GitHub repository link**
2. **A public online link**
3. **A `README.md`**
   - what the page or product is
   - which component library you used and why
   - the main modules included
   - how to run it locally
4. **Screenshots or a short demo**
   - at minimum, show the main desktop view
   - if you handled responsiveness, include a narrow-screen view too

Useful optional additions:

- before/after comparison between first draft and final result
- the prompts that helped you most
- one UI detail you are especially proud of

## 8. Evaluation Checklist

Your project is strong if:

- the first screen clearly communicates what the product is
- the layout feels organized even when the page contains a lot of information
- controls feel consistent across the page
- the code is broken into understandable parts
- interactions feel intentional rather than decorative
- the result feels like a product, not a collage of screenshots

## 9. Bonus Ideas

You can go further with:

- real API integration
- theme tokens or dark/light theme switching
- reusable layout primitives
- charts, skeleton loaders, or richer data states
- accessibility improvements such as focus states and semantic structure
- a short design rationale

## 10. Common Mistakes

### 10.1 Focusing only on “looking better”

Modern frontend quality is not just visuals. It also includes clarity, usability, state handling, and structure.

### 10.2 Copying default component library examples too closely

A component library is a foundation, not the final identity of the product.

### 10.3 Generating everything at once

Complex interfaces are usually better when built in stages:

1. structure
2. modules
3. polish
4. details

## 11. Final Advice

Do not treat AI as a one-shot page generator. Treat it as a collaborative frontend partner.

The most useful pattern is usually:

- you define the direction
- AI creates the first version
- you critique the result
- AI refines it
- you keep making product decisions

That is how you move from “a page that exists” to “a frontend worth shipping.”

::: tip Next
If this assignment goes well, revisit [the full-stack assignment](../2.1-fullstack-app/) and upgrade that product with the frontend quality you built here.
:::
