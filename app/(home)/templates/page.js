import "../../globals.css";
import { getTemplates } from "../../lib/data";
import DnDProvider from "../../components/drag-drop/dnd-provider";

export default async function Templates() {
  const templates = await getTemplates();

  return (
    <main className="main">
      <div className="page_header">
        <h1>Select your Invitation Template</h1>
        <p>
          Browse our catalogue the invitation templates and shoce the one that
          is rigth for your event
        </p>
      </div>
      <div className="main-page-wrapper">
        <DnDProvider templates = {JSON.stringify(templates)}/>
      </div>
    </main>
  );
}
