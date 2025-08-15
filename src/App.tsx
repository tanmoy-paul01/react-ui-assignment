import React, { useState } from "react";
import { InputField } from "./components/InputField/InputField";
import { DataTable } from "./components/DataTable/DataTable";

interface Person {
  name: string;
  age: number;
}

function App() {
  const [inputValue, setInputValue] = useState("");

  const data: Person[] = [
    { name: "John Doe", age: 25 },
    { name: "Jane Smith", age: 30 },
    { name: "Sam Wilson", age: 22 },
  ];

  const columns = [
    { key: "name", header: "Name" },
    { key: "age", header: "Age" },
  ] as { key: keyof Person; header: string }[];

  return (
    <div className="p-6 space-y-8">
      {/* InputField Example */}
      <div className="max-w-sm">
        <InputField
          label="Username"
          placeholder="Enter your username"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          helperText="This is a helper text."
        />
      </div>

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
