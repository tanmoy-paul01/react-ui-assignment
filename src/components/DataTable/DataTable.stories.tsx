import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DataTable } from "./DataTable";

interface Person {
  name: string;
  age: number;
}

const meta: Meta<typeof DataTable<Person>> = {
  title: "Components/DataTable",
  component: DataTable<Person>,
};
export default meta;

type Story = StoryObj<typeof DataTable<Person>>;

export const Default: Story = {
  args: {
    data: [
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
    ],
    columns: [
      { key: "name", header: "Name" },
      { key: "age", header: "Age" },
    ],
  },
};
