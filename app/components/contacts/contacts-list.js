"use client";
import "../../globals.css";
import classes from "./contacts.module.css";
import { useState, useEffect } from "react";
import { useConfirmation, UseMessage } from "@/app/lib/store";
import {
  DeleteContact,
  sendEmail,
  sendSMS,
  sendWhatsapp,
} from "@/app/lib/actions";
import Link from "next/link";
import Loader from "../ui-elements/loader";
import { SimpleCard } from "../cards/SimpleCard";

export default function ContactList(props) {
  const [contactData, setContactData] = useState({});

  const newConfirmation = useConfirmation((state) => state.setConfirmation);

  const updatedConfirmation = useConfirmation((state) => state.confirmation);

  let summary = {};

  summary.totalContacts = props.template.contacts.length;
  summary.pendingInvitationSend = props.template.contacts.filter(
    (inv) => inv.sent != 1
  ).length;
  summary.invitationViewed = props.template.contacts.filter(
    (inv) => inv.viewed === 1
  ).length;
  summary.invitationConfirmed = props.template.contacts.filter(
    (inv) => inv.confirmed === 1
  ).length;

  const handleDelete = (state) => {
    setContactData(state);
  };

  const handleEmailSent = (state) => {
    setContactData(state);
  };

  useEffect(() => {
    newConfirmation(contactData);
  }, [contactData]);

  return (
    <>
      <div className={classes.cards_holder}>
        <SimpleCard
          metric={"Total Contacts"}
          metricValue={summary.totalContacts}
        />
        <SimpleCard
          metric={"Invitations Pending to Send"}
          metricValue={summary.pendingInvitationSend}
        />
        <SimpleCard
          metric={"Viewed Invitations"}
          metricValue={summary.invitationViewed}
        />
        <SimpleCard
          metric={"Confirmed Invitations"}
          metricValue={summary.invitationConfirmed}
        />
      </div>
      {Object.keys(updatedConfirmation).length > 0 ? (
        <Confirmation
          data={contactData}
          slug={props.slug}
          template={props.template.template}
          eventTitle={props.template.title}
          host={props.template.host}
        />
      ) : (
        <ContactTable
          template={props.template}
          onDeleteContact={handleDelete}
          onSendEmail={handleEmailSent}
          slug={props.slug}
        />
      )}
    </>
  );
}

function ContactTable(props) {
  const [cont, setCont] = useState({});
  const [isSortingBy, setIsSortingBy] = useState("First_Name");
  const [isSortingAsc, setIsSortingAsc] = useState(true);
  const [sortedContacts, setSortedContacts] = useState(props.template.contacts);
  const [counter, setCounter] = useState(0);

  let data, Key;

  const handleClick = (event) => {
    if (event.target.localName === "svg") {
      data =
        event.target.parentNode.parentNode.parentNode.parentNode.parentNode
          .childNodes;
      Key =
        event.target.parentNode.parentNode.parentNode.parentNode.parentNode
          .firstChild.innerHTML;
    } else {
      data =
        event.target.parentNode.parentNode.parentNode.parentNode.childNodes;
      Key =
        event.target.parentNode.parentNode.parentNode.parentNode.firstChild
          .innerHTML;
    }

    let contact = {};

    contact.Key = Key;

    for (let item of data) {
      (contact.First_Name = data[1].innerHTML),
        (contact.Last_Name = data[2].innerHTML),
        (contact.Email = data[3].innerHTML),
        (contact.Phone = data[4].innerHTML);
      event.target.localName === "svg"
        ? (contact.action = "whatsapp")
        : (contact.action = event.target.innerHTML);
    }
    setCont(contact);
  };

  useEffect(() => {
    const contacts = props.template.contacts;

    counter === 0 ? setIsSortingAsc(true) : setIsSortingAsc(!isSortingAsc);

    if (
      isSortingBy === "First_Name" ||
      isSortingBy === "Last_Name" ||
      isSortingBy === "Email"
    ) {
      if (isSortingAsc) {
        const sortedContacts = contacts.sort((a, b) =>
          b[isSortingBy].localeCompare(a[isSortingBy])
        );
        setSortedContacts(sortedContacts);
      } else {
        const sortedContacts = contacts.sort((a, b) =>
          a[isSortingBy].localeCompare(b[isSortingBy])
        );
        setSortedContacts(sortedContacts);
      }
    } else {
      if (isSortingAsc) {
        const sortedContacts = contacts.sort(
          (a, b) => b[isSortingBy] - a[isSortingBy]
        );
        setSortedContacts(sortedContacts);
      } else {
        const sortedContacts = contacts.sort(
          (a, b) => a[isSortingBy] - b[isSortingBy]
        );
        setSortedContacts(sortedContacts);
      }
    }

    props.onDeleteContact(cont);
    props.onSendEmail(cont);
  }, [cont, isSortingBy, counter, props.template.contacts]);

  const handleSortbyFirstName = (e) => {
    setIsSortingBy("First_Name");
    if (isSortingBy === "First_Name") {
      setCounter((prevState) => prevState + 1);
    } else {
      setCounter(0);
    }
  };

  const handleSortbyLastName = (e) => {
    setIsSortingBy("Last_Name");
    if (isSortingBy === "Last_Name") {
      setCounter((prevState) => prevState + 1);
    } else {
      setCounter(0);
    }
  };

  const handleSortbyEmail = (e) => {
    setIsSortingBy("Email");
    if (isSortingBy === "Email") {
      setCounter((prevState) => prevState + 1);
    } else {
      setCounter(0);
    }
  };

  const handleSortbyPhone = (e) => {
    setIsSortingBy("Phone");
    if (isSortingBy === "Phone") {
      setCounter((prevState) => prevState + 1);
    } else {
      setCounter(0);
    }
  };

  const handleSortbySent = (e) => {
    setIsSortingBy("sent");
    if (isSortingBy === "sent") {
      setCounter((prevState) => prevState + 1);
    } else {
      setCounter(0);
    }
  };

  const handleSortbyViewed = (e) => {
    setIsSortingBy("viewed");
    if (isSortingBy === "viewed") {
      setCounter((prevState) => prevState + 1);
    } else {
      setCounter(0);
    }
  };

  const handleSortbyConfirmed = (e) => {
    setIsSortingBy("confirmed");
    if (isSortingBy === "confirmed") {
      setCounter((prevState) => prevState + 1);
    } else {
      setCounter(0);
    }
  };

  const getSort = () => {
    if (counter === 0 && isSortingAsc) {
      return <span className="material-symbols-outlined">unfold_more</span>;
    } else {
      if (isSortingAsc) {
        return (
          <span className="material-symbols-outlined">keyboard_arrow_up</span>
        );
      } else {
        return (
          <span className="material-symbols-outlined">keyboard_arrow_down</span>
        );
      }
    }
  };

  return (
    <>
      <table className="table">
        <thead className="table_header">
          <tr>
            <th hidden>Key</th>
            <th onClick={handleSortbyFirstName}>
              <div className="column_header">
                First Name {isSortingBy === "First_Name" ? getSort() : ""}
              </div>
            </th>
            <th onClick={handleSortbyLastName}>
              <div className="column_header">
                Last Name {isSortingBy === "Last_Name" ? getSort() : ""}
              </div>
            </th>
            <th onClick={handleSortbyEmail}>
              <div className="column_header">
                Email {isSortingBy === "Email" ? getSort() : ""}
              </div>
            </th>
            <th onClick={handleSortbyPhone}>
              <div className="column_header">
                Phone {isSortingBy === "Phone" ? getSort() : ""}
              </div>
            </th>
            <th onClick={handleSortbySent}>
              <div className="column_header">
                Sent {isSortingBy === "sent" ? getSort() : ""}
              </div>
            </th>
            <th onClick={handleSortbyViewed}>
              <div className="column_header">
                Viewed {isSortingBy === "viewed" ? getSort() : ""}
              </div>
            </th>
            <th onClick={handleSortbyConfirmed}>
              <div className="column_header">
                Confirmed {isSortingBy === "confirmed" ? getSort() : ""}
              </div>
            </th>
            <th className="action">...</th>
          </tr>
        </thead>
        <tbody>
          {sortedContacts.map((contact) => (
            <tr key={contact.Key}>
              <td hidden>{contact.Key}</td>
              <td>{contact.First_Name}</td>
              <td>{contact.Last_Name}</td>
              <td>{contact.Email}</td>
              <td>{contact.Phone}</td>
              <td>
                {contact.sent === 1 ? (
                  <span className="material-symbols-outlined">
                    done_outline
                  </span>
                ) : (
                  <span className="material-symbols-outlined">close</span>
                )}
              </td>
              <td>
                {" "}
                {contact.viewed === 1 ? (
                  <span className="material-symbols-outlined">
                    done_outline
                  </span>
                ) : (
                  <span className="material-symbols-outlined">close</span>
                )}
              </td>
              <td>
                {contact.confirmed === 1 ? (
                  <span className="material-symbols-outlined">
                    done_outline
                  </span>
                ) : (
                  <span className="material-symbols-outlined">close</span>
                )}
              </td>
              <td>
                <div className="action_icons">
                  <div className="tooltip">
                    <span
                      className="material-symbols-outlined"
                      onClick={handleClick}
                    >
                      mail
                    </span>
                    <span className="tooltiptext">send by Email</span>
                  </div>
                  <div className="tooltip">
                    <span
                      className="material-symbols-outlined"
                      onClick={handleClick}
                    >
                      sms
                    </span>
                    <span className="tooltiptext">send by SMS</span>
                  </div>

                  <div className="tooltip">
                    <button className="btn_transparent" onClick={handleClick}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5rem"
                        height="1.5rem"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01"
                        />
                      </svg>
                    </button>
                    <span className="tooltiptext">send by whatsapp</span>
                  </div>

                  <div className="tooltip">
                    <span
                      className="material-symbols-outlined"
                      onClick={handleClick}
                    >
                      delete
                    </span>
                    <span className="tooltiptext">Delete</span>
                  </div>
                  <div className="tooltip">
                    <Link
                      target="_blank"
                      href={`/${props.slug}?key=${contact.Key}&source=app`}
                    >
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </Link>
                    <span className="tooltiptext">preview</span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function Confirmation(props) {
  const clearConfirmation = useConfirmation((state) => state.clearConfirmation);
  const [isLoading, setIsLoading] = useState(false);

  const newMessage = UseMessage((state) => state.setMessage);

  const handleCancel = () => {
    clearConfirmation();
  };

  const handleClick = async () => {
    setIsLoading(true);

    if (props.data.action === "delete") {
      const res = await DeleteContact(
        props.data,
        props.slug,
        props.data.template
      );
      clearConfirmation();
      newMessage(res.message);
      setIsLoading(false);
    } else if (props.data.action === "mail") {
      const response = await sendEmail(
        props.data,
        props.slug,
        props.template,
        props.eventTitle,
        props.host
      );
      clearConfirmation();
      newMessage(response.message);
      setIsLoading(false);
    } else if (props.data.action === "sms") {
      const response = await sendSMS(
        props.data,
        props.eventTitle,
        props.host,
        props.slug,
        props.template
      );
      clearConfirmation();
      newMessage(response.message);
      setIsLoading(false);
    } else if (props.data.action === "whatsapp") {
      /*  const response = await sendWhatsapp(
        props.data,
        props.eventTitle,
        props.host,
        props.slug
      ); */
      console.log(
        "pending to set twilio whatsapp number and approved template"
      );
      clearConfirmation();
      /* newMessage(response.message); */
      setIsLoading(false);
    }
  };

  const dialogMessage = () => {
    if (props.data.action === "delete") {
      return (
        <h2>
          {`Delete contact ${props.data.First_Name} ${props.data.Last_Name} / ${props.data.email} ?`}
        </h2>
      );
    } else if (props.data.action === "mail") {
      return <h2>{`Send Invitation to: ${props.data.Email} ?`}</h2>;
    } else if (props.data.action === "sms") {
      return <h2>{`Send Invitation to: ${props.data.Phone} via sms ?`}</h2>;
    } else if (props.data.action === "whatsapp") {
      return (
        <h2>{`Send Invitation to: ${props.data.Phone} via whatsapp ?`}</h2>
      );
    }
  };

  return (
    <div className={classes.confirmation}>
      <div className="titles">{dialogMessage()}</div>
      <div className={classes.btns}>
        <button
          className={classes.btn_1}
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "OK"}
        </button>
        <button className={classes.btn_1} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
