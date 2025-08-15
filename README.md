# React UI Assignment – InputField & DataTable

## 🚀 Live Demo
🔗 **Deployed on Vercel** → [https://react-ui-assignment-phi.vercel.app/](https://react-ui-assignment-phi.vercel.app/)

---

## 📌 Overview
This project contains two reusable and customizable UI components — **InputField** and **DataTable** — built using **React**, **TypeScript**, and **TailwindCSS**, documented using **Storybook**.

The goal was to create scalable, accessible, and theme-friendly components that can be reused in modern web applications.

---

## 🛠 Components

### 1️⃣ InputField
A flexible text input with multiple states, variants, and optional features.

**Features:**
- Label, placeholder, helper text, and error message
- States: `disabled`, `invalid`, `loading`
- Variants: `filled`, `outlined`, `ghost`
- Sizes: `sm`, `md`, `lg`
- Optional: clear button, password visibility toggle
- Light/Dark mode support (via Tailwind `dark:` classes)

**Props:**
```ts
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: string;
}
```

### 2️⃣ DataTable
A customizable table with sorting, selection, and empty/loading states.

Features:
1.Display tabular data
2.Column sorting
3.Row selection (single/multiple)
4.Loading state
5.Empty state message

**Props:**
```ts
interface Column<T> {
  key: keyof T;
  header: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}
```

### 📖 Storybook Documentation

1.For each component, Storybook includes:
2.Component name & description
3.Props & API definitions
4.Example use cases
5.States & variants
6.Interaction behavior
7.Accessibility notes
8.Theming & responsiveness
9.Best practices

Storybook Local Command:
```
npm run storybook
```

### 📂 Folder Structure
```
src/
  components/
    InputField/
      InputField.tsx
      InputField.stories.tsx
      index.ts
    DataTable/
      DataTable.tsx
      DataTable.stories.tsx
      index.ts
  styles/
  App.tsx
```

### 🛠 Setup & Run Locally
1. Clone the repository
```
git clone https://github.com/tanmoy-paul01/react-ui-assignment.git
cd react-ui-assignment
```
2. Install dependencies
```
npm install
```
3. Run the development server
```
npm start
```
4. Run Storybook
```
npm run storybook
```

### 💡 Usage Example
```
import React, { useState } from "react";
import { InputField } from "./components/InputField/InputField";
import { DataTable } from "./components/DataTable/DataTable";
import type { Column } from "./components/DataTable/DataTable";

interface Person {
  name: string;
  age: number;
}

function App() {
  const [value, setValue] = useState("");

  const data: Person[] = [
    { name: "Alice", age: 28 },
    { name: "Bob", age: 35 },
  ];

  const columns: Column<Person>[] = [
    { key: "name", header: "Name" },
    { key: "age", header: "Age" },
  ];

  return (
    <div className="p-6 space-y-10">
      <InputField
        label="Username"
        placeholder="Enter username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Enter your username"
      />

      <DataTable<Person>
        data={data}
        columns={columns}
        selectable
        onRowSelect={(rows) => console.log("Selected rows:", rows)}
      />
    </div>
  );
}

export default App;
```

### 🧠 My Approach
1. Scalability – Components are isolated in their own folders with stories and types.
2. Reusability – Props are designed for flexible usage.
3. Accessibility – Proper labels, ARIA roles, and keyboard navigation where applicable.
4. Theming – Tailwind dark: classes support light/dark mode.
5. Documentation – Storybook includes multiple examples for all states, variants, and sizes.
