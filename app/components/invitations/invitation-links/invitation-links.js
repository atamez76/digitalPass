"use client";
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import Link from "next/link";
import classes from "./invitation-links.module.css";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { SetInvitationViewed, SetInvitationConfirmed } from "@/app/lib/actions";
import Loader from "../../ui-elements/loader";

export default function InvitationLinks(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const path = usePathname();
  const slug = path.substring(1);
  const params = useSearchParams();

  const key = params.get("key");
  const source = params.get("source");

  useEffect(() => {
    if (source != "app") {
      SetInvitationViewed(slug, key);
    }
  }, []);

  const url = `http://localhost:3000/${path}?${key}&${source}`;

  const event = {
    title: props.template.title,
    description: `${props.template.description} <br> <a href= ${url}>Go to Invitation </a>`,
    start: `${props.template.date} ${props.template.time}`,
    location: props.template.venue,
    duration: [5, "hour"],
  };

  const googleURL = google(event); // https://calendar.google.com/calendar/render...
  const outlookURL = outlook(event); // https://outlook.live.com/owa/...
  const office365URL = office365(event); // https://outlook.office.com/owa/...
  const yahooURL = yahoo(event); // https://calendar.yahoo.com/?v=60&title=...
  const icsURL = ics(event); // standard ICS file based on https://icalendar.org

  return (
    <div className={classes.controls_column}>
      <span className={classes.span_inline_block}>
        <button
          className={`${classes.invitation_btn} ${classes.flex_controls}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined">calendar_month</span>
          Add to Calendar
        </button>
        <ul className={isOpen ? classes.list : classes.list_hidden}>
          <li className={classes.flex_list_item}>
            <svg
              className={classes.svg_icon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"></path>
            </svg>
            <Link href={icsURL} target="_blank">
              Apple Calendar (ics)
            </Link>
          </li>
          <li className={classes.flex_list_item}>
            <svg
              className={classes.svg_icon}
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              x="0"
              y="0"
              viewBox="0 0 48 48"
            >
              <path fill="#fff" d="M13 13H35V35H13z"></path>
              <path
                fill="#1e88e5"
                d="M25.68 20.92L26.688 22.36 28.272 21.208 28.272 29.56 30 29.56 30 18.616 28.56 18.616z"
              ></path>
              <path
                fill="#1e88e5"
                d="M22.943 23.745c.625-.574 1.013-1.37 1.013-2.249 0-1.747-1.533-3.168-3.417-3.168-1.602 0-2.972 1.009-3.33 2.453l1.657.421c.165-.664.868-1.146 1.673-1.146.942 0 1.709.646 1.709 1.44 0 .794-.767 1.44-1.709 1.44h-.997v1.728h.997c1.081 0 1.993.751 1.993 1.64 0 .904-.866 1.64-1.931 1.64-.962 0-1.784-.61-1.914-1.418L17 26.802c.262 1.636 1.81 2.87 3.6 2.87 2.007 0 3.64-1.511 3.64-3.368 0-1.023-.504-1.941-1.297-2.559z"
              ></path>
              <path
                fill="#fbc02d"
                d="M34 42L14 42 13 38 14 34 34 34 35 38z"
              ></path>
              <path
                fill="#4caf50"
                d="M38 35L42 34 42 14 38 13 34 14 34 34z"
              ></path>
              <path
                fill="#1e88e5"
                d="M34 14l1-4-1-4H9a3 3 0 00-3 3v25l4 1 4-1V14h20z"
              ></path>
              <path fill="#e53935" d="M34 34L34 42 42 34z"></path>
              <path
                fill="#1565c0"
                d="M39 6h-5v8h8V9a3 3 0 00-3-3zM9 42h5v-8H6v5a3 3 0 003 3z"
              ></path>
            </svg>
            <Link href={googleURL} target="_blank">
              Google Calendar
            </Link>
          </li>
          <li className={classes.flex_list_item}>
            <svg
              className={classes.svg_icon}
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              x="0"
              y="0"
              viewBox="0 0 48 48"
            >
              <path fill="#ff5722" d="M22 22H6V6h16z"></path>
              <path fill="#4caf50" d="M42 22H26V6h16z"></path>
              <path fill="#ffc107" d="M42 42H26V26h16z"></path>
              <path fill="#03a9f4" d="M22 42H6V26h16z"></path>
            </svg>
            <Link href={office365URL} target="_blank">
              office365 Calendar
            </Link>
          </li>
          <li className={classes.flex_list_item}>
            <svg
              className={classes.svg_icon}
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              x="0"
              y="0"
              viewBox="0 0 48 48"
            >
              <path
                fill="#103262"
                d="M43.255 23.547l-6.81-3.967v11.594H44v-6.331a1.5 1.5 0 00-.745-1.296z"
              ></path>
              <path fill="#0084d7" d="M13 10h10v9H13v-9z"></path>
              <path fill="#33afec" d="M23 10h10v9H23v-9z"></path>
              <path fill="#54daff" d="M33 10h10v9H33v-9z"></path>
              <path fill="#027ad4" d="M23 19h10v9H23v-9z"></path>
              <path fill="#0553a4" d="M23 28h10v9H23v-9z"></path>
              <path fill="#25a2e5" d="M33 19h10v9H33v-9z"></path>
              <path fill="#0262b8" d="M33 28h10v9H33v-9z"></path>
              <path
                d="M13 37L43 37 43 24.238 28.99 32.238 13 24.238z"
                opacity="0.019"
              ></path>
              <path
                d="M13 37L43 37 43 24.476 28.99 32.476 13 24.476z"
                opacity="0.038"
              ></path>
              <path
                d="M13 37L43 37 43 24.714 28.99 32.714 13 24.714z"
                opacity="0.057"
              ></path>
              <path
                d="M13 37L43 37 43 24.952 28.99 32.952 13 24.952z"
                opacity="0.076"
              ></path>
              <path
                d="M13 37L43 37 43 25.19 28.99 33.19 13 25.19z"
                opacity="0.095"
              ></path>
              <path
                d="M13 37L43 37 43 25.429 28.99 33.429 13 25.429z"
                opacity="0.114"
              ></path>
              <path
                d="M13 37L43 37 43 25.667 28.99 33.667 13 25.667z"
                opacity="0.133"
              ></path>
              <path
                d="M13 37L43 37 43 25.905 28.99 33.905 13 25.905z"
                opacity="0.152"
              ></path>
              <path
                d="M13 37L43 37 43 26.143 28.99 34.143 13 26.143z"
                opacity="0.171"
              ></path>
              <path
                d="M13 37L43 37 43 26.381 28.99 34.381 13 26.381z"
                opacity="0.191"
              ></path>
              <path
                d="M13 37L43 37 43 26.619 28.99 34.619 13 26.619z"
                opacity="0.209"
              ></path>
              <path
                d="M13 37L43 37 43 26.857 28.99 34.857 13 26.857z"
                opacity="0.229"
              ></path>
              <path
                d="M13 37L43 37 43 27.095 28.99 35.095 13 27.095z"
                opacity="0.248"
              ></path>
              <path
                d="M13 37L43 37 43 27.333 28.99 35.333 13 27.333z"
                opacity="0.267"
              ></path>
              <path
                d="M13 37L43 37 43 27.571 28.99 35.571 13 27.571z"
                opacity="0.286"
              ></path>
              <path
                d="M13 37L43 37 43 27.81 28.99 35.81 13 27.81z"
                opacity="0.305"
              ></path>
              <path
                d="M13 37L43 37 43 28.048 28.99 36.048 13 28.048z"
                opacity="0.324"
              ></path>
              <path
                d="M13 37L43 37 43 28.286 28.99 36.286 13 28.286z"
                opacity="0.343"
              ></path>
              <path
                d="M13 37L43 37 43 28.524 28.99 36.524 13 28.524z"
                opacity="0.362"
              ></path>
              <path
                d="M13 37L43 37 43 28.762 28.99 36.762 13 28.762z"
                opacity="0.381"
              ></path>
              <path d="M13 37L43 37 43 29 28.99 37 13 29z" opacity="0.4"></path>
              <linearGradient
                id="Qf7015RosYe_HpjKeG0QTa_ut6gQeo5pNqf_gr1"
                x1="38.925"
                x2="32.286"
                y1="24.557"
                y2="36.024"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#31abec"></stop>
                <stop offset="1" stopColor="#1582d5"></stop>
              </linearGradient>
              <path
                fill="url(#Qf7015RosYe_HpjKeG0QTa_ut6gQeo5pNqf_gr1)"
                d="M15.441 42h26.563a1.996 1.996 0 002-1.994C44.007 35.485 44 24.843 44 24.843s-.007.222-1.751 1.212-27.505 15.511-27.505 15.511.234.434.697.434z"
              ></path>
              <linearGradient
                id="Qf7015RosYe_HpjKeG0QTb_ut6gQeo5pNqf_gr2"
                x1="13.665"
                x2="41.285"
                y1="6.992"
                y2="9.074"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.042" stopColor="#076db4"></stop>
                <stop offset="0.85" stopColor="#0461af"></stop>
              </linearGradient>
              <path
                fill="url(#Qf7015RosYe_HpjKeG0QTb_ut6gQeo5pNqf_gr2)"
                d="M43 10H13V8a2 2 0 012-2h26a2 2 0 012 2v2z"
              ></path>
              <linearGradient
                id="Qf7015RosYe_HpjKeG0QTc_ut6gQeo5pNqf_gr3"
                x1="28.153"
                x2="23.638"
                y1="33.218"
                y2="41.1"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#33acee"></stop>
                <stop offset="1" stopColor="#1b8edf"></stop>
              </linearGradient>
              <path
                fill="url(#Qf7015RosYe_HpjKeG0QTc_ut6gQeo5pNqf_gr3)"
                d="M13 25v15a2 2 0 002 2H42.004a1.98 1.98 0 001.221-.425L13 25z"
              ></path>
              <path
                d="M21.319 13H13v24h8.319A3.68 3.68 0 0025 33.319V16.681A3.68 3.68 0 0021.319 13z"
                opacity="0.05"
              ></path>
              <path
                d="M21.213 36H13V13.333h8.213a3.12 3.12 0 013.121 3.121v16.425A3.122 3.122 0 0121.213 36z"
                opacity="0.07"
              ></path>
              <path
                d="M21.106 35H13V13.667h8.106a2.56 2.56 0 012.56 2.56V32.44a2.56 2.56 0 01-2.56 2.56z"
                opacity="0.09"
              ></path>
              <linearGradient
                id="Qf7015RosYe_HpjKeG0QTd_ut6gQeo5pNqf_gr4"
                x1="3.53"
                x2="22.41"
                y1="14.53"
                y2="33.41"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#1784d8"></stop>
                <stop offset="1" stopColor="#0864c5"></stop>
              </linearGradient>
              <path
                fill="url(#Qf7015RosYe_HpjKeG0QTd_ut6gQeo5pNqf_gr4)"
                d="M21 34H5a2 2 0 01-2-2V16a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2z"
              ></path>
              <path
                fill="#fff"
                d="M13 18.691c-3.111 0-4.985 2.377-4.985 5.309S9.882 29.309 13 29.309c3.119 0 4.985-2.377 4.985-5.308 0-2.933-1.874-5.31-4.985-5.31zm0 8.826c-1.765 0-2.82-1.574-2.82-3.516s1.06-3.516 2.82-3.516 2.821 1.575 2.821 3.516-1.057 3.516-2.821 3.516z"
              ></path>
            </svg>
            <Link href={outlookURL} target="_blank">
              Outlook Calendar
            </Link>
          </li>
          <li className={classes.flex_list_item}>
            <span className="material-symbols-outlined">calendar_month</span>
            <Link href={yahooURL} target="_blank">
              yahoo Calendar
            </Link>
          </li>
        </ul>
      </span>
      {isConfirming ? (
        <ConfirmAssistance
          onCancel={() => setIsConfirming(false)}
          slug={slug}
          key_value={key}
        />
      ) : (
        <button
          className={`${classes.invitation_btn} ${classes.flex_controls}`}
          onClick={() => setIsConfirming(true)}
        >
          <span className="material-symbols-outlined">check</span>Confirm
          Assistance
        </button>
      )}
    </div>
  );
}

function ConfirmAssistance(props) {
 
  const [successConfirmation, setSuccessConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleCancel = () => {
    props.onCancel();
    setIsLoading(false);
    setSuccessConfirmation(false);
  };

  const handleConfirmation = async () => {
    setIsLoading(true)
    const response = await SetInvitationConfirmed(props.slug, props.key_value);
    if (response.message === "ok") {
      setIsLoading(false);
      setSuccessConfirmation(true);
    }
  };

  if (successConfirmation) {
    return (
      <div className={classes.confirmation_message}>
        <div className={classes.message}>
          <h3>We have receive your confirmation..Thanks!</h3>
        </div>
        <div className={classes.confirmation_controls}>
          <button className={classes.invitation_btn} onClick={handleCancel}>
            <span className="material-symbols-outlined">check</span>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.confirmation_message}>
        <div className={classes.message}>
          <h3>Do you want to confirm your assistance?</h3>
        </div>
        <div className={classes.confirmation_controls}>
          <button
            className={classes.invitation_btn}
            onClick={handleConfirmation}
          >
            <span className="material-symbols-outlined">{isLoading ? <Loader />: 'check' }</span>
          </button>
          <button className={classes.invitation_btn} onClick={handleCancel}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
    );
  }
}
