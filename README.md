# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Modules

This project uses a number of Nuxt 3 modules. To learn more about them, check out the [modules documentation](https://nuxt.com/modules).

### [Color-Mode](https://nuxt.com/modules/color-mode)

Color-Mode allows for a more personalized user experience, improved accessibility, and enhanced aesthetic by enabling users to switch between different color modes. This feature can be particularly useful for users with visual impairments or sensitivity to certain color schemes, and can even be used to create different color themes for seasonal events or holidays.

### [TailwindCSS](https://nuxt.com/modules/tailwindcss)

TailwindCSS provides pre-built CSS classes that can speed up development, make responsive design easier, and promote consistent design practices across multiple projects. This module can help save time, increase efficiency, and improve collaboration with other developers.

### [Icon](https://nuxt.com/modules/icon)

The Icon module (nuxt-icon) gives access to a collection of icons that can be easily integrated into our website or application. This module provides a wide range of icons in different styles and formats, such as SVG and Font Awesome, that can be customized to fit your specific design needs. By using icons, you can enhance the visual appeal of your website or application, make it easier for users to navigate, and improve the overall user experience. Additionally, this module can save time by eliminating the need to create custom icons from scratch.

## Packages

In addition to the modules, this project uses a number of packages.

### [tRPC](https://trpc.io/docs/)

tRPC provides a simple and efficient way to build APIs for my website or application. This module allowed me to generate TypeScript types automatically, making it easier to work with APIs and avoid errors. Additionally, tRPC allowed me to easily create APIs that are compatible with both the client and server, which made it easier to implement features such as server-side rendering. Overall, adding tRPC to my project improved the efficiency of my development process and helped me build more robust APIs.

### [tRPC-nuxt](https://trpc-nuxt.vercel.app/get-started/installation)

The `nuxt-trpc` package provides seamless integration between tRPC and Nuxt 3. This package enabled me to easily implement my tRPC APIs making full-stack type safety a breeze.

### [daisyUI](https://daisyui.com/)

`daisyUI` adds classes to Tailwind CSS for all common UI components. Classes like btn, card, etc. This allows us to focus on important things instead of making basic elements for every project. It also provides themes which make it easy to change the look of the UI in both light and dark mode, toggled using the `color-mode` module.

### [zod](https://zod.dev/)

Zod provides a simple and efficient way to validate data in our TypeScript code. With Zod, we can define and enforce strict data schemas that ensure data is validated and formatted correctly, which helps to prevent errors and improve the reliability of our application. Additionally, Zod provides a wide range of built-in validation rules and supports custom validation functions, making it easy to handle complex data validation scenarios. Overall, adding Zod to our project has improved the efficiency and reliability of our code by ensuring that data is validated correctly at all times.
