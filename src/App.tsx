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
      {/* InputField Example */}
      <InputField
        label="Username"
        placeholder="Enter username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Enter your username"
      />

      {/* DataTable Example */}
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
