# Using LLMs to Write API Code and API Documentation

In the previous chapters, we learned how to use tools like Figma to create UI drafts, how to use AI to quickly generate static frontend pages, and how to use Supabase to build databases and basic authentication. That naturally leads to a new question: when someone clicks those lively buttons on the frontend, how does the data actually get stored in Supabase? And when we need more complex business logic such as concurrent payments, scheduled pushes, or sensitive data processing, is it still safe to let the frontend talk directly to the database?

That question introduces one of the most important parts of modern web architecture: the **backend API**.

In the past, backend developers often wrote hundreds or thousands of lines of routing, controller, and validation logic by hand. Today, we can hand much of that repetitive scaffolding to large language models. In this chapter, we will move beyond vague "AI-generated code" and look at a real workflow for using strong prompts to guide an LLM into writing solid Node.js backend interfaces, plus the corresponding documentation and test cases.

> 💡 **Prerequisites**
>
> Before starting this chapter, it helps to understand:
> - [From Database to Supabase](../database-supabase/) for basic database and data-model concepts
> - [Git and GitHub Workflow](../git-workflow/) for project collaboration and version control
> - [What Is the Terminal / Command Line](/en/appendix/2-development-tools/command-line-shell) for project initialization and startup commands

# What you will learn

1. **What an API is**: Understand the bridge between frontend and backend, plus basic RESTful design.
2. **How LLMs help service construction**: Use structured prompts to generate a clean Node.js + Express starter project.
3. **Interface logic development**: Guide the model to generate CRUD APIs with proper business validation and Supabase integration.
4. **Automatic API documentation**: Ask the model to reverse-generate OpenAPI/Swagger docs from your code.
5. **Testing and integration loops**: Use the model to create Postman collections and Jest unit tests to protect code quality.

---

# 1. Why do we need APIs?

Traditionally, the frontend is "the visible part" and the database is "the storage room." But something is missing between them: a coordinator.

If you imagine the application as a restaurant:

- The **frontend (client)** is the menu and ordering table, where customers browse and make requests.
- The **database (Supabase, etc.)** is the kitchen storeroom, where ingredients and records are kept.
- The **backend API** is the waiter. Customers should not run straight into the kitchen to grab ingredients. Instead, they tell the waiter what they want through an HTTP request. The waiter checks the request, verifies permissions, talks to the kitchen, and brings the result back through an HTTP response, usually in JSON.

Through APIs, we achieve a clean **frontend-backend separation**: the frontend focuses on rendering, while the backend focuses on business logic, data processing, and security.

---

# 2. Project architecture and initialization

A clear project skeleton is a prerequisite for getting high-quality code from an LLM. Before you ask AI to write code, you should already have a mental model of the structure you want.

## 2.1 A common API project structure

Even if an LLM is generating the code, you should not dump everything into one `server.js` file. A maintainable Node.js backend usually looks something like this:

```text
my-api-project/
├── .env                  # Sensitive environment variables such as API keys and DB URLs
├── server.js             # Project entry point: boot server, register global middleware
├── package.json          # Dependency management
├── src/
│   ├── routes/           # Route layer: define URLs and HTTP methods
│   ├── controllers/      # Controller layer: process request params, call services, return responses
│   ├── services/         # Service layer: database access and core business logic
│   └── middlewares/      # Middleware: auth, global error handling
└── docs/                 # API documentation
```

## 2.2 Use AI to initialize the project

Instead of manually running `npm init` and installing packages one by one, you can give the model the structure above in prompt form:

> 🗣️ **Prompt example**
> "Help me scaffold a Node.js backend project that can connect to Supabase. Keep the structure clean and easy to maintain later."

If the prompt is good, the code you get back can already give you a backend app with a solid foundation running on `localhost:3000`.

---

# 3. Core practice: using LLMs to develop APIs

This is the heart of the chapter. When LLM-generated code feels superficial or unsafe, the root cause is usually missing context. **LLMs are not afraid of complex requirements. They are afraid of vague ones.**

Take the `menu_items` insert API from the [database chapter](../database-supabase/) as an example.

## 3.1 Give the model full context

Before asking the model to write an API, provide both the **database schema** and the **business constraints**.

> 🗣️ **High-quality prompt template**
> "Help me write an API for creating a menu item. Each item includes a product name, price, category (burger, snack, drink), and whether it is listed. Product name and price are required. Price cannot be negative. Return helpful validation errors when the user input is invalid."

## 3.2 Review the generated code

A good model will often separate responsibilities clearly, for example:

```javascript
// services/menuService.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.createMenuItem = async (menuData) => {
    // Push data into the table via the Supabase SDK
    const { data, error } = await supabase
        .from('menu_items')
        .insert([menuData])
        .select();

    if (error) throw new Error(`Database insert failed: ${error.message}`);
    return data[0];
};
```

You can see that, with enough context, the model generates something structurally cleaner: Supabase initialization is separated, errors are handled, and the code is easier to reason about. That is very different from the spaghetti code you usually get from a vague request like "write a create endpoint."

---

# 4. Free your hands: generate API documentation automatically

For a development team, an undocumented API is a blind box. Frontend engineers cannot guess what parameters are required or what the response shape will be. The most common API description standard in the industry is **OpenAPI** (formerly often called Swagger).

Writing Swagger YAML or JSON by hand used to be painful and error-prone. Now it is one of the areas where LLMs help the most.

You can select your `routes` and `controllers` code and ask:

> 🗣️ **Documentation prompt**
> "Generate API documentation from the code above. Clearly explain what every parameter means and what data the endpoint returns, so the frontend team can integrate it easily."

You can even ask the model to fill in descriptions and mock example values such as `price_cents: 1200` for a $12.00 item. That reduces a lot of back-and-forth communication.

---

# 5. Safeguards: generate tests and Postman collections

After the code and docs are ready, there is still one more step: verifying that everything actually works.

## 5.1 Generate Postman or Apifox test configurations

When developing APIs, we often use tools like Postman to simulate HTTP requests. Without AI, you usually have to fill in URLs, headers, and JSON request bodies manually.

You can simply tell the model:

> "Convert this API documentation into a Postman-importable format and include both successful and failing request examples."

Once you save the returned JSON as something like `menu_api.json` and import it into Postman, you instantly get a ready-to-use testing panel.

## 5.2 Write automated unit tests

If you want stricter engineering quality, you can also ask the model to write tests with `Jest` or a similar framework. That is especially useful for boundary conditions, such as ensuring a negative price is rejected before data reaches the database.

---

# 6. Backend API best practices you still need to know

Even with AI support, you are still the gatekeeper of the system. You need to review the generated code against a few important principles:

1. **RESTful path naming**
   - Good: `GET /api/users` for listing users, `POST /api/users` for creating users
   - Bad: `POST /api/getUser` or `POST /api/createUser`
   The URL should represent the resource. The action belongs to the HTTP method.

2. **Correct HTTP status codes**
   - `200/201`: request succeeded / resource created successfully
   - `400`: bad request, invalid parameters or missing required fields
   - `401/403`: unauthorized / forbidden
   - `404`: resource not found
   - `500`: server error, such as backend exceptions or database failures
   Do not expose full backend stack traces to the frontend.

3. **Never trust user input**
   Frontend input can be forged. All important validation must run again on the backend.

# 7. Summary

After this chapter, your role should start to feel different. You are no longer just a typist trapped in syntax and punctuation. You are becoming a **system designer and architecture coordinator**.

You have now learned:

1. The core systems thinking behind **APIs and frontend-backend separation**
2. How to dramatically improve LLM-generated backend code by providing **good context and layered structure**
3. How to turn tedious **documentation writing** and **test creation** into automation tasks that AI handles well
4. How to combine this with what you already learned about **Supabase** to complete the full flow from frontend request to database update

::: tip Next Step
Once your data flow and backend service are ready, they still only run locally on your own machine. In the next chapter, we will learn how to **deploy** that service to a public server so your product can be accessed by real users.
:::
