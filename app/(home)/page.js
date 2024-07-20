import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  return (
    <main className="main">
      <p>main</p>
    </main>
  );
}
