# EZEval Capstone Project

Quick, easy, and accurate window cleaning evaluations, quotes, and more.

## About

EZEval is a web application that allows window cleaning companies to quickly and easily create quotes for their customers. It was made by the award winning exterior cleaning company founder [Ryan Roga](https://www.roga.dev) as his [VIU ITAS Web & Mobile Application Development](https://www.itas.ca) capstone project. The project was completed in collaboration with [MossAway Roof Moss Removal](https://www.mossaway.ca) & other window cleaning companies in the industry, as well as with ~~financial support form [Vancouver Island University](https://www.viu.ca)~~.

**Marking Notes:**

- I have not yet received any financial support from VIU in this capacity, so for now, I will strike that line out. I will update this line once/if I have received the financial support.
- This IS a collaboration with myself and MossAway Roof Moss Removal, as well as other window cleaning companies in the industry. My company will be field testing, as well as providing feedback and suggestions for the project. I have 2 additional window cleaning companies which I will not name directly in my documentation, but who are helping me with testing and feedback as I develop the project.
- With regards to sponsors, you previously marked me against including them, but as VIU has not yet flipped the bill, MossAway in fact has. I would appreciate if you retroactively updated the mark accordingly. In addition to MossAway, I aim to seek additional funding from Modern Maintenance in Victoria.

## Tech Stack

For specific versions, please see the [package.json](../package.json) file.

### Rendering Framework

**[SvelteKit](https://kit.svelte.dev/)** - a framework for building web applications on top of Svelte, a UI component framework that developers love for its performance and ease of use. Component frameworks like Svelte make it much easier to build user interfaces than working with the DOM directly. The creator, Rich Harris, refers to apps built with SvelteKit as "Transitional Apps". The term was coined from interior design as a bridge between traditional and modern design. SvelteKit is a bridge between traditional web apps (MPA) and modern web apps (SPA), taking the best of both worlds and stitching them together.

### Languages

**[TypeScript](https://www.typescriptlang.org/)** - a programming language that builds on JavaScript by adding optional static types, classes, and interfaces. It helps developers write more organized, scalable, and maintainable code. TypeScript can be compiled to JavaScript, making it compatible with any JavaScript environment.

**[PostgreSQL](https://www.postgresql.org/)** - a powerful, open-source relational database management system. It is used to store and retrieve data for applications, and supports advanced data management features like transactions and data modeling. It is a popular choice for web applications due to its reliability and versatility.

### CSS Framework

**[TailwindCSS](https://tailwindcss.com/)** - a utility-first CSS framework that makes it easier to style web pages. It provides a set of pre-designed classes that can be combined to create beautiful and responsive designs. It saves time for developers by not having to write custom CSS code.

### Auth & Database

**[Supabase](https://supabase.io/)** - a platform that provides real-time APIs, a SQL database, and a web-based UI for managing data. It makes it easy for developers to build scalable, secure, and fast web applications without having to manage infrastructure. Supabase combines the power of PostgreSQL and Firebase to provide a complete back-end solution.

### Validation

**[Zod](https://zod.dev/)** - a JavaScript library for object schema validation. It helps developers ensure that the data they receive from users or APIs is in the correct format, and provides clear error messages in case of validation failure. This can save time and improve the reliability of applications by reducing the occurrence of bugs caused by incorrect data.

**[Prisma](https://www.prisma.io/)** - a data access tool that simplifies database management and communication between a web application and its database. It generates type-safe, efficient, and expressive database client libraries, and provides a powerful query engine to retrieve and manipulate data. Using Prisma can make it easier and faster for developers to build database-driven applications.

### Testing

**[Vitest](https://vitest.dev/)** - a blazing fast unit test framework powered by Vite. Vite's out-of-the-box support for common web patterns, features like glob imports and SSR primitives, and its many plugins and integrations are fostering a vibrant ecosystem.

**[Playwright](https://playwright.dev/)** - an open-source library for automating browser testing. It allows developers to write tests that interact with a web page, simulate user input, and assert that the page behaves as expected. This can help catch bugs early in development and improve the quality of web applications.

### Build Tools

**[Vite](https://vitejs.dev/)** - a fast and lightweight build tool for JavaScript applications. It uses native ES modules and delivers optimized code to the browser, reducing the time it takes for pages to load. Vite also has built-in hot module reloading, making it easier and faster for developers to iterate on their projects.

### Deployment

**[Vercel](https://vercel.com/)** - a platform for hosting web applications and static sites. It provides automatic deployment and global CDN distribution, making it easy for developers to launch and scale their projects. Vercel also integrates with popular front-end frameworks and static site generators, providing a seamless development-to-production workflow.

### Code Management & CI/CD

**[Git](https://git-scm.com/)** - a version control system for software development. It allows teams of developers to work on a project at the same time, track changes, and revert to previous versions if needed. Git makes it easier for teams to collaborate on code and manage the evolution of a project over time.

**[GitHub](https://www.github.com/)** - a web-based platform for version control and collaboration on software projects. It provides a hosting service for Git repositories, allowing developers to share and collaborate on code, track bugs and feature requests, and build and maintain their projects. GitHub also offers a suite of tools for code review, project management, and communication, making it a popular choice for software development teams.

**[GitHub Actions](https://github.com/features/actions)** - a continuous integration and continuous deployment (CI/CD) platform built into GitHub. It allows developers to automate software builds, tests, and deployments, freeing up time and reducing the risk of errors in the software development process. GitHub Actions can be triggered by code changes or events, and integrate with other tools, making it a powerful and flexible tool for modern software development.

### IDE

**[VSCode](https://code.visualstudio.com/)** - a free and open-source code editor developed by Microsoft. It provides a powerful and user-friendly interface for writing and debugging code, and supports a wide range of programming languages. VSCode is a popular choice for developers due to its speed, versatility, and large community of extensions and plugins.

### Code & Content Assistants

**[GitHub Copilot](https://copilot.github.com/)** - an AI-powered code recommendation tool that helps developers write better code, faster. It integrates with GitHub and provides real-time suggestions as they code, offering suggestions for fixes, optimizations, and best practices. By leveraging the knowledge of the entire GitHub community, Copilot can help developers save time, avoid common mistakes, and write code that is easier to maintain.

**[ChatGPT](https://openai.com/chatgpt/)** - an AI language model developed by OpenAI. It can generate human-like text in response to prompts, providing answers to questions, completing sentences, and creating original content. By using advanced machine learning techniques, ChatGPT can understand the context of a conversation and respond in a natural and engaging way.

## Costs

| Service                                       | Description              |                      Cost |
| --------------------------------------------- | ------------------------ | ------------------------: |
| [Vercel](https://vercel.com/)                 | Domain                   |           $20.00 USD / yr |
| [Vercel](https://vercel.com/)                 | Hosting                  |   $0.00 - $20.00 USD / mo |
| [Supabase](https://supabase.io/)              | Database                 |   $0.00 - $20.00 USD / mo |
| [ChatGPT Pro](https://openai.com/chatgpt/)    | Code & Content Assistant |           $20.00 USD / mo |
| [GitHub Copilot](https://copilot.github.com/) | Code Assistant           |           $10.00 USD / mo |
| **Projected**                                 |                          | **$35.00 - $75 USD / mo** |
| **Grand Total**                               |                          | **$140.00 - $300.00 USD** |
