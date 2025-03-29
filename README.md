# 🚀 Task Management Frontend (Angular)

This is an Angular frontend application for managing tasks, integrated with the Task Management API. It provides an intuitive user interface for users to authenticate, manage their tasks, and interact with the backend API.

# 📋 Features

-   User Authentication (login & register) with JWT
-   Task CRUD (Create, Read, Update, Delete) with soft delete support
-   Token-based session management
-   Responsive design with Angular Material UI
-   Fully typed with TypeScript

## 🛠️ Tech Stack

-   Angular v19
-   Angular Material UI
-   ngx-zustand for state management (lightweight and modern)
-   TypeScript
-   Vercel

## 📁 Folder Breakdown

| **Folder**             | **Purpose**                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `components/`          | Components organized by feature and layout                         |
| `components/features/` | Feature-specific components (e.g., `auth`, `tasks`)                |
| `components/layout/`   | Layout components like `header`, `footer`, and shared `common` UI  |
| `guards/`              | Guards to manage protected routes                                  |
| `services/`            | API service modules for interacting with backend (`auth`, `tasks`) |
| `state/`               | NGX-Zustand state stores for session and tasks                     |
| `types/`               | TypeScript interfaces and types (e.g., `task.ts`, `user.ts`)       |
| `utils/`               | Helper utility functions used across the project                   |

## ⚙️ Environment Variables

Create a .env.local file in the root of your project:

```bash
API_URL=http://localhost:8000/api
```

# 🚀 Getting Started

1️⃣ Install dependencies:

```bash
 npm install
# or
yarn install
# or
pnpm install
```

2️⃣ Run the development server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

Visit:
http://localhost:4200

## 🔐 Auth Strategy

-   Uses HttpClient fetch in order to get the data, then store it using NGX-Zustand to store user session and JWT token.
-   Adds JWT token to all API requests via HttpClient.

## 💡 Notes

-   Fully integrated with the Task Management API backend.
-   Designed with Angular Material UI for a clean and responsive user experience.
-   Uses TypeScript across the app for safer code.

## 📦 Build for Production

```bash
npm run build
npm run start
```
