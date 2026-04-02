# Major Project 1: Your First SaaS Full-Stack App - AI Copywriting Website

The hardest part of a first full-stack project usually is not the code itself. It is **not knowing what to build**.

The topic is too broad, the features are too scattered, and halfway through you realize the project is getting out of control.

So this time, let's change the approach. Instead of giving an open-ended prompt, we will give you a concrete direction: build one product that is complete, useful, and still manageable.

::: tip Goal
Build an **AI marketing copy workspace**. After logging in, users fill in product information, generate marketing copy with one click, and automatically save the history. Need more generations? Upgrade the plan. Admins can view users, generation records, and payment status from the backend dashboard.
:::

<div style="margin: 32px 0;">
  <ClientOnly>
    <StepBar :active="0" :items="[
      { title: 'Define', description: 'Lock down the pages and product scope first' },
      { title: 'Frontend', description: 'Build the homepage, auth pages, and dashboard' },
      { title: 'Backend', description: 'Connect the database, generation flow, and billing' },
      { title: 'Admin & Delivery', description: 'Finish the admin panel, deployment, and demo assets' }
    ]" />
  </ClientOnly>
</div>

## Why This Project?

Because it hits the sweet spot: **it contains all the essential parts of a modern web product without becoming too complex to finish**.

- **The public-facing app has a real use case**: users come here to solve an actual problem
- **The user system includes login and permissions**: guests and registered users are different
- **The core feature is generation**: the app calls AI to produce dynamic output rather than showing static pages
- **The data is persistent**: generated results are saved and can be reviewed later
- **It includes billing**: it feels like a real SaaS product instead of a toy project
- **It includes an admin panel**: you get to experience the product from an operator's perspective

The difficulty is moderate. It is not so simple that it becomes just a single form, and not so complex that you spend a week without a working result.

## 1. Define the Project First

Project name: **LaunchKit**

Positioning: an AI marketing copy workspace

Target users: indie developers, small business owners, content operators, and anyone who wants to quickly create landing-page-ready copy.

They are not here to casually chat. They are here because they want **usable marketing copy fast**.

### Core Feature

Keep the core simple. There is really just one central job:

**User input**: product name, one-sentence description, target audience, three selling points, and publishing channel

**System output**: headline, subheadline, CTA copy, three short-copy variants, and one long-copy version

The generated result is automatically saved to the user's account so it can be reviewed after the next login.

### Page Plan

Build these 6 pages:

| Page | Route | Description |
|------|------|------|
| Home | `/` | Clearly communicate the product value and include sign-up / login entry points |
| Login | `/login` | A simple login form |
| Register | `/register` | A simple sign-up form |
| Dashboard | `/dashboard` | Fill in product info, generate copy, and review results |
| Billing | `/billing` | Show Free and Pro plans and link to Stripe checkout |
| Admin | `/admin` | Let admins view users, generation records, and payment status |

### Data Model

Three core tables are enough:

```sql
profiles (
  id uuid primary key,
  email text,
  role text,         -- user / admin
  plan text,         -- free / pro
  created_at timestamptz
)

generations (
  id uuid primary key,
  user_id uuid,
  product_name text,
  target_channel text,
  input_payload jsonb,
  result_payload jsonb,
  created_at timestamptz
)

subscriptions (
  id uuid primary key,
  user_id uuid,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text,
  status text,
  created_at timestamptz
)
```

At this point, the structure of the whole product is already clear.

<div style="margin: 32px 0;">
  <ClientOnly>
    <StepBar :active="1" :items="[
      { title: 'Define', description: 'Lock down the pages and product scope first' },
      { title: 'Frontend', description: 'Build the homepage, auth pages, and dashboard' },
      { title: 'Backend', description: 'Connect the database, generation flow, and billing' },
      { title: 'Admin & Delivery', description: 'Finish the admin panel, deployment, and demo assets' }
    ]" />
  </ClientOnly>
</div>

## 2. Build the Frontend First

At this stage, do not touch the database yet and do not rush into payments. **Build the frontend skeleton first.**

### Suggested Tech Stack

- **Next.js App Router** for a modern React foundation
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for polished UI components
- **Supabase** for backend services
- **Stripe** for payment handling

This combination works especially well with AI coding tools and fits the look and feel of a modern SaaS product.

### Step 1: Scaffold the Project

Paste this prompt into Trae, Cursor, or Claude Code:

```text
Help me create a modern SaaS website called LaunchKit.

Tech stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui

Pages:
1. Home page /
2. Login page /login
3. Register page /register
4. User dashboard /dashboard
5. Billing page /billing
6. Admin panel /admin

For now, only build the frontend structure. Do not connect the database yet.

Requirements:
- The homepage should feel like a modern AI SaaS landing page
- Login and register pages should stay simple
- The dashboard should have a form on the left and results on the right
- The billing page should show free and pro plans
- The admin page should first include a basic admin layout: sidebar, top bar, and table area
- Use shadcn/ui components
- The pages should feel like a real product, not a classroom demo
```

### Step 2: Refine the Dashboard

After the first version is ready, keep going:

```text
Please continue improving the /dashboard page.

This is an AI marketing copy workspace.

Left-side form fields:
- product name
- one-sentence description
- target audience
- 3 selling points
- publishing channel (website, WeChat Moments, Xiaohongshu, Douyin, email)

Reserve the right-side result area for:
- headline
- subheadline
- CTA
- 3 short-copy versions
- 1 long-copy version

Use mock data first to make the interaction work.

Requirements:
- show a loading state after clicking "Generate Copy"
- design an empty state for the result area
- use a responsive layout that works on both wide and narrow screens
```

### Need Help?

Review these chapters:

- [Build Your First Modern App - UI Design](../../frontend/ui-design/)
- [UI Guidelines and Multi-Product Design](../../frontend/multi-product-ui/)
- [Make Interfaces Beautiful with LLMs and Skills](../../frontend/llm-skills-beautiful/)
- [From Design Prototype to Project Code](../../frontend/design-to-code/)
- [Upgrade Your UI with Modern Component Libraries](../../frontend/modern-component-library/)

<div style="margin: 32px 0;">
  <ClientOnly>
    <StepBar :active="2" :items="[
      { title: 'Define', description: 'Lock down the pages and product scope first' },
      { title: 'Frontend', description: 'Build the homepage, auth pages, and dashboard' },
      { title: 'Backend', description: 'Connect the database, generation flow, and billing' },
      { title: 'Admin & Delivery', description: 'Finish the admin panel, deployment, and demo assets' }
    ]" />
  </ClientOnly>
</div>

## 3. Connect the Backend

This is where the project truly becomes "full-stack."

### Step 3: Add Supabase Authentication

```text
Please treat me like a complete beginner and walk me through Supabase authentication step by step.

I need help with:
1. connecting Supabase to the project
2. implementing sign up, sign in, and sign out
3. redirecting to /dashboard after a successful login
4. automatically redirecting unauthenticated users from /dashboard, /billing, and /admin to /login
5. creating the profiles table
6. automatically creating a profiles record after user registration
7. including email, role, and plan fields in the profiles table

Implementation requirements:
- explain which files are being changed at each step
- do not hardcode secrets
- clearly mark anything that must be configured manually in the Supabase dashboard
- explain how to verify registration and login after implementation
```

### Step 4: Add Generation API and Database Writes

```text
Please treat me like a complete beginner and help me build the core feature of the website: generating and saving marketing copy.

Target result:
1. the user fills in the form on /dashboard and clicks "Generate Copy"
2. the backend receives product name, description, target audience, selling points, and publishing channel
3. the backend calls a model to generate results
4. the page displays the generated result
5. both input and output are saved to the database
6. the user can view generation history the next time they visit

Please help me:
- create the /api/generate endpoint
- create the generations table
- design the input and output fields
- load the current user's history on the dashboard page

User experience:
- loading state on the button
- error message if generation fails
- empty state when there is no history

After completion, please explain:
- where the frontend page files are
- where the backend API files are
- where the database write logic lives
- how to test the full generation flow
```

### Step 5: Add Stripe Billing

```text
Please treat me like a complete beginner and help me add the simplest usable Stripe billing flow to LaunchKit.

I do not need a complicated system yet. I just want the main payment flow working first.

Please help me:
1. show free and pro plans on /billing
2. redirect users to Stripe Checkout after clicking upgrade
3. return to the website after successful payment
4. save the payment result into the subscriptions table
5. sync the profile.plan field
6. limit free users to 3 generations per day while pro users have no limit

Implementation principles:
- get the main flow working first, without worrying about every edge case yet
- clearly explain anything that must be configured in the Stripe dashboard
- explain how to test the full payment flow after implementation
```

### Step 6: Build the Admin Dashboard

```text
Please treat me like a complete beginner and help me build a simple but usable admin dashboard.

Only admins should be allowed to access it.

Please help me:
1. allow only users with role = admin to access /admin
2. include 3 tabs in the admin dashboard:
   - users
   - generation records
   - subscription status
3. show email, plan, and creation time in the user list
4. show user, product name, channel, and creation time in generation records
5. show user, plan, and payment status in subscription status

Requirements:
- keep the UI simple and clear
- use the existing component library's table, tabs, and badge components
- explain how to make an account admin after implementation
```

### Need Help?

Review these chapters:

- [From Database to Supabase](../../backend/database-supabase/)
- [Backend API Design and Development](../../backend/ai-interface-code/)
- [Integrate Stripe and Other Billing Systems](../../backend/stripe-payment/)

<div style="margin: 32px 0;">
  <ClientOnly>
    <StepBar :active="3" :items="[
      { title: 'Define', description: 'Lock down the pages and product scope first' },
      { title: 'Frontend', description: 'Build the homepage, auth pages, and dashboard' },
      { title: 'Backend', description: 'Connect the database, generation flow, and billing' },
      { title: 'Admin & Delivery', description: 'Finish the admin panel, deployment, and demo assets' }
    ]" />
  </ClientOnly>
</div>

## 4. Admin, Delivery, and Launch

The product is mostly shaped now. The final stage is about three things:

### 4.1 Deploy It

Push the code to GitHub and deploy it publicly.

References:

- [Git and GitHub Workflow](../../backend/git-workflow/)
- [Ship Your Product Prototype](../../backend/zeabur-deployment/)

### Step 7: Pre-Deployment Check

```text
Please treat me like a complete beginner and help me check whether this project is ready to deploy.

Focus on:
- whether environment variables are complete
- whether authentication callback URLs are correct
- whether Stripe callback URLs are correct
- whether any pages are missing loading states, empty states, or error messages
- whether the README includes setup and deployment instructions

Please:
1. list the items that still need fixing, ordered by priority
2. mark which ones must be fixed first
3. explain the deployment steps after the fixes
```

### 4.2 README

At minimum, include:

- project overview
- explanation of core pages
- tech stack
- local startup steps
- environment variable list

### 4.3 Demo Materials

Prepare at least:

- a homepage screenshot
- a dashboard generation screenshot
- a billing page screenshot
- an admin dashboard screenshot
- a demo video of around 60 seconds

## 5. Final Outcome

If you follow this guide, what you get is not just a "practice page." It is a **small but complete SaaS product**:

- a frontend built with a modern component library
- Supabase database and authentication
- real AI generation
- Stripe billing
- an admin dashboard
- public deployment

That is absolutely strong enough to count as your **first real full-stack portfolio project**.

## 6. Final Check Before Submission

<el-card shadow="hover" style="margin: 20px 0; border-radius: 12px;">
  <template #header>
    <div style="font-weight: bold; font-size: 16px;">One Last Check Before You Submit</div>
  </template>

  <ul style="list-style-type: none; padding-left: 0;">
    <li><label><input type="checkbox" disabled /> Home, Login, Dashboard, Billing, and Admin pages are all finished</label></li>
    <li><label><input type="checkbox" disabled /> Users can register, log in, and log out</label></li>
    <li><label><input type="checkbox" disabled /> Generation results are actually written into the database</label></li>
    <li><label><input type="checkbox" disabled /> The main payment flow works end to end</label></li>
    <li><label><input type="checkbox" disabled /> Admins can view users, generation records, and payment status</label></li>
    <li><label><input type="checkbox" disabled /> The project has been deployed publicly</label></li>
  </ul>
</el-card>

::: tip Next
After finishing this project, continue with [Major Project 2: Online Exam and Management System](../modern-frontend-trae/) for the next full-stack challenge.
:::
