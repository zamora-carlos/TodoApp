# TodoApp

This project is a front-end application that consumes an API and serves as an interface to manage to-dos with features like filtering, sorting, and marking tasks as done or undone.

## Technologies

- **React**: UI framework for building components.
- **TypeScript**: Strongly typed JavaScript for improved development experience.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Redux**: State management for handling application state.

## Getting started

### Prerequisites

Make sure you have Node.js and git installed

### Setup

- **Clone the repository**:

  ```bash
  git clone https://github.com/zamora-carlos/TodoApp.git
  ```

- **Navigate to project folder**:

  ```bash
  cd TodoApp
  ```

- **Install dependencies and build the application**:
  ```bash
  npm install
  ```

### Running the project

Start the development server:

```bash
npm run dev
```

The application will start the application at http://localhost:8080.

## Features

- **Task management:** Create, edit, and delete tasks with a name, priority, and optional due date.
- **Filtering & sorting:** Search tasks by name, priority, and completion status; sort by priority and/or due date.
- **Completion tracking:** Mark tasks as done/undone, with the undo option available for mistakes.
- **Pagination:** Handle a large number of tasks by paginating the list.
- **Performance metrics:** Track the average time from task creation to completion, overall and by priority.

## Frontend structure

```
TodoApp/
│── src/
│   ├── components/      # UI components
│   ├── redux/           # Redux store and slices
│   ├── types/           # TypeScript interfaces
│   ├── services/        # API requests to backend
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
```
