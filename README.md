# Task Manager

![image](https://github.com/user-attachments/assets/ef730760-bd29-4d78-86ee-931adbc3be8d)


This is a single page application where a user can create & track tasks on a board.

The following features have been implemented:
- Theme Switch
- CRUD Operations on Tasks
- LocalStorage Preferences

## Setup

- If you use `nvm` you can run `nvm use` or ensure you are using node version `v18.20.4`.
- Run `yarn`
- To run the app `yarn run dev`

## Libraries and Tools Used
For project velocity and to opt for built-in accessible components, I have chosen to build this project from Shadcn components.

### Core Dependencies
- **React (18.3.1)**: Core UI library for building component-based UIs.
- **React-DOM (18.3.1)**: DOM bindings for React.
- **React-Hook-Form (7.54.2)**: For managing form state and validation.
- **Zod (3.24.2)**: Schema validation for form inputs and data structures.

### UI and Styling
- **TailwindCSS (3.4.17)**: Utility-first CSS framework.
- **Tailwind Merge (3.0.2)**: Safely merge Tailwind CSS class names.
- **Lucide React (0.476.0)**: Customizable SVG-based icon library.
- **Radix UI**: Accessible React primitives for dialogs, labels, toggles, and tooltips.
- **Vaul (1.1.2)**: Animation and UI transitions. Part of shadcn components.

### Developer Tools
- **Vite (6.0.5)**: Fast build and development tool.
- **TypeScript (~5.6.2)**: Static typing and improved developer tooling.
- **ESLint (9.17.0)**: Linter for identifying and fixing code issues.
- **Husky (9.1.7)**: Pre-commit hooks for enforcing code quality.
- **Commitlint (19.6.1)**: Enforce conventional commit messages.

## Design Decisions and UX Considerations

1. **Component-based Architecture:**
   - Each UI section is modularized for reusability and maintainability.

2. **Form Management:**
   - A mix of `react-hook-form` & `zod` has been used for efficient form handling and improved performance.

3. **Type Safety:**
   - TypeScript ensures strong typing and better developer experience.

4. **Performance Optimization:**
   - Vite for fast build times and optimized output.

5. **Consistency:**
   - ESLint and Commitlint enforce consistent code style and commit messages.
