import "../../globals.css";
import Link from "next/link";
import { getEvents } from "@/app/lib/data";
import Image from "next/image";

export default async function MyEvents() {
  const events = await getEvents();
  return (
    <div className="main">
      <div className="page_header">
        <div className="titles">
          <h1>Events</h1>
          <h2>Manage your Events here </h2>
        </div>
        <div>
          <Link href={"/templates"} className="btn">
            + Create Event
          </Link>
        </div>
      </div>
      <div className="page_body">
        <div className="search_bar"></div>
        <div className="table_container">
          <table className="table">
            <thead className="table_header">
              <tr>
                <th></th>
                <th>Event Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>Venue</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>
                      <Image
                        src={`${event.styles.background_image}`}
                        height={60}
                        width={60}
                        alt="picture"
                      />
                  </td>
                  <td>{event.title}</td>
                  <td>{event.type}</td>
                  <td>{event.date}</td>
                  <td>{event.venue}</td>
                  <td>
                    <Link href={`/events/${event.slug}?template=${event.template}`}>
                      <span className="material-symbols-outlined">
                        arrow_forward_ios
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
