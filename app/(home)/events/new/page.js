
import "../../../globals.css";
import { getOneTemplate, getTypeOfEvents } from "@/app/lib/data";
import NewEventData from "@/app/components/event-data/new-event";

export default async function NewEvent(context) {
 
  const typeOfEvents = await getTypeOfEvents();
  const eventList = typeOfEvents[0].data;

  const template = await getOneTemplate(context.searchParams.template)
  delete template._id;


  return (
     <main className="main">
    <NewEventData eventList={eventList} template={template} />
    </main>
   
  );
}

/* import "../../globals.css";
import { getTemplates } from "@/app/lib/data";
import DnDProvider from "@/app/components/drag-drop/dnd-provider";

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
} */
