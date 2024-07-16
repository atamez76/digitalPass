import "../../../globals.css";
import { getSingleEvent, getTypeOfEvents } from "@/app/lib/data";
import ContactList from "@/app/components/contacts/contacts-list";
import NewEventData from "@/app/components/event-data/new-event";
import Link from "next/link";
import Contacts from "@/app/components/contacts/contacts";

export default async function EventPage({ params }) {
  const slug = params.slug;
  const template = await getSingleEvent(slug);
  delete template._id;
  const typeOfEvents = await getTypeOfEvents();
  const eventList = typeOfEvents[0].data;

  return (
    <div className="main">
      <div className="page_header">
        <div className="titles">
          <h1>Event Details</h1>
        </div>
        <Link className="back" href="/events">
          <span className="material-symbols-outlined">arrow_back_ios</span>
          <span>Back</span>
        </Link>
      </div>
      <div className="event_detail_container">
        <NewEventData eventList={eventList} template={template} />
        <div className="table_container">
          <Contacts event={template.template} slug={slug} />
          <ContactList template = {template} slug={slug} />
        </div>
      </div>
    </div>
  );
}
