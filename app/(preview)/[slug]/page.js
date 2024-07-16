import "../../globals.css";
import { Inter } from "next/font/google";
import "../../globalicons.css";
import { getSingleEvent } from "@/app/lib/data";
import Template from "@/app/components/invitations/invitation-templates/template";
import InvitationLinks from "@/app/components/invitations/invitation-links/invitation-links";


const inter = Inter({ subsets: ["latin"] });

export default async function InvitationView({ params }) {

  const slug = params.slug;
  const template = await getSingleEvent(slug);
  delete template._id;

  return (
    <div className={inter.className}>
      <div className="invitation_holder">
        <div className="invitation">
          <Template template={template} />
        </div>
        <InvitationLinks template={template} />
      </div>
    </div>
  );
}
