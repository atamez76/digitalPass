import "../../globals.css";
import { Structure } from "@/app/lib/data-structure";
import DataStructure from "@/app/components/data-structures/data-structure";

export default async function Templates() {
  const data = Structure;

  console.log(DataStructure);

  return (
    <main className="main">
      <DataStructure data={data} />
    </main>
  );
}
