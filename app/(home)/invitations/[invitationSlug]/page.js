import "../../globals.css";
import { getOneTemplate } from "@/app/lib/data";


export default async function InviteDetail({ params }) {
  const template = await getOneTemplate(params.invitationSlug);

  return (
    <main className="main">
      <h2>slug</h2>
    </main>
  );
}
