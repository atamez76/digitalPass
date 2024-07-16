
import "../../globals.css";
import Invite from "@/app/components/invitations/invitation";
import { getTemplates } from "@/app/lib/data";

export default async function Invitation() {
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
      <div className="collection_grid">
      {templates.map((template, index) => (
          <Invite data={template} key={index} />
        ))}
      </div>
    </main>
  );
}
