"use server";

import slugify from "slugify";
import {
  saveEvent,
  getSingleEvent,
  updateContactList,
  RemoveContact,
  UpdateEmailSent,
  UpdateInvitationViewed,
  setConfirmation,
  createNewAccount,
  getOneUser,
} from "./data";
import { getNoOfEvents } from "./data";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { S3 } from "@aws-sdk/client-s3";
import SendEmail from "./send-email";
import handlebars from "handlebars";
import { invitationTemplate } from "./emails/invitation-template";
import Twilio from "twilio/lib/rest/Twilio";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";

const s3 = new S3({
  region: "us-east-1",
});

function isInvalidInput(event) {
  switch (true) {
    case !event.template || event.template.trim() === "":
      return { message: "Invalid Input --Template--" };
    case event.type === "default":
      return { message: "Invalid Input --Type of Event--" };
    case !event.title || event.title.trim() === "":
      return { message: "Invalid Input --Event Title--" };
    case (event.form === "F01" && !event.description) ||
      (event.form === "F01" && event.description.trim() === ""):
      return { message: "Invalid Input --Description--" };
    case (event.form === "F02" && !event.sub_title) ||
      (event.form === "F02" && event.sub_title.trim() === ""):
      return { message: "Invalid Input --Sub Title--" };
    case !event.host || event.host.trim() === "":
      return { message: "Invalid Input --Host--" };
    case !event.date ||
      event.date.trim() === "" ||
      Date.parse(event.date) < Date.now():
      return {
        message: "Invalid Input --Date cannot be before current date--",
      };
    case !event.time || event.time.trim() === "":
      return { message: "Invalid Input --Time--" };
    case !event.venue || event.venue.trim() === "":
      return { message: "Invalid Input --Venue--" };
    case !event.address || event.address.trim() === "":
      return { message: "Invalid Input --Address--" };
  }

  return { message: "ok" };
}

export async function saveNewEvent(prevState, formData) {
  const NoOfEvents = await getNoOfEvents();
  const eventName = `${formData.get("title")}-${NoOfEvents + 1}`;
  const eventSlug = slugify(eventName, { lower: true });

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  const event = {
    template: formData.get("template"),
    type: formData.get("typeEvent"),
    dateCreated: today,
    form: formData.get("form"),
    guess_name: "Dear [Guest Name]",
    title: formData.get("title"),
    sub_title: formData.get("subTtitle") ? formData.get("subTtitle") : "",
    host: formData.get("host"),
    description: formData.get("eventDescription")
      ? formData.get("eventDescription")
      : "",
    date: formData.get("date"),
    time: formData.get("time"),
    venue: formData.get("venue"),
    address: formData.get("address"),
    geo: formData.get("geo"),
    slug: eventSlug,
    styles: {
      background_color: formData.get("template_color"),
      font_color: formData.get("font_color"),
      opacity: formData.get("opacity"),
      grayscale: formData.get("gray_scale"),
      font_family: formData.get("selected_font"),
      font_size: formData.get("font_size"),
      background_image: formData.get("default-image"),
    },
    contacts: [],
  };

  const data_validation = isInvalidInput(event);

  if (data_validation.message === "ok") {
    await saveEvent(event);
    revalidatePath("/events");
    redirect("/events");
  } else {
    return data_validation;
  }
}

function validateContatData(contacts) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  for (let i = 0; i < contacts.length; i++) {
    switch (true) {
      case contacts[i].key === "":
        return { message: "Review First Name, Last Name or Phone Number" };
      case contacts[i].First_Name === "":
        return { message: "Review First Name" };
      case contacts[i].Last_Name === "":
        return { message: "Review Last Name" };
      case !emailRegex.test(contacts[i].Email):
        return { message: "Review Email" };
      case contacts[i].Phone.length != 10:
        return { message: "Pnone number must contain 10 characters" };
    }
  }
  return { message: "ok" };
}

export async function saveContacts(event, slug, contacts) {
  if (validateContatData(contacts).message != "ok") {
    revalidatePath(`/events/${slug}?template=${event}`);
    return validateContatData(contacts);
  }

  const contactList = contacts.map((contact) => ({
    Key: contact.key,
    First_Name: contact.First_Name,
    Last_Name: contact.Last_Name,
    Email: contact.Email,
    Phone: contact.Phone,
    sent: "",
    viewed: "",
    confirmed: "",
  }));
  const result = await updateContactList(slug, contactList);

  revalidatePath(`/events/${slug}?template=${event}`);
  return result;
}

export async function saveSingleContact(params, prevState, formData) {
  const normalizedFirst_Name = formData
    .get("firstName")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const First_Name = normalizedFirst_Name
    .replace(/[!@#$%^&*(),?" ":{}|<>´]/g, "-")
    .toLowerCase();

  const normalizedLast_Name = formData
    .get("lastName")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const Last_Name = normalizedLast_Name
    .replace(/[!@#$%^&*(),?" ":{}|<>´]/g, "-")
    .toLowerCase();

  const randomDigit = Math.random().toString().substring(2, 10);

  const contactList = [
    {
      Key: `${First_Name}-${Last_Name}-${randomDigit}`,
      First_Name: formData.get("firstName"),
      Last_Name: formData.get("lastName"),
      Email: formData.get("email"),
      Phone: formData.get("phone"),
      sent: "",
      viewed: "",
      confirmed: "",
    },
  ];

  if (validateContatData(contactList).message != "ok") {
    return validateContatData(contactList);
  }

  const result = await updateContactList(params.slug, contactList);
  revalidatePath(`/events/${params.slug}?template=${params.event}`);
  return { message: "Data Updated" };
}

export async function DeleteContact(contact, slug, template) {
  const result = await RemoveContact(slug, contact);
  revalidatePath(`/events/${slug}?template=${template}`);

  if (result.modifiedCount > 0) {
    return { message: "Contant Deleted" };
  } else {
    return { message: "A problem happened, no data was removed" };
  }
}

export async function sendEmail(
  contact,
  slug,
  template,
  eventTitle,
  eventHost
) {
  const emailBody = EventInvitationTemplate(
    eventTitle,
    `http://localhost:3000/${slug}?key=${contact.Key}&source=email`,
    eventHost,
    contact.First_Name
  );

  const response = await SendEmail(contact.Email, emailBody);
  if (response.messageId) {
    const updateContact = await UpdateEmailSent(slug, contact);
    if (updateContact) {
      revalidatePath(`/events/${slug}?template=${template}`);
      return { message: "Email Sent" };
    } else {
      return {
        message:
          "The Email has been sent however we were not able to update the contact's sent column",
      };
    }
  } else {
    return { message: "A problem happened, the email has not been sent" };
  }

  function EventInvitationTemplate(title, url, user, recipient) {
    const template = handlebars.compile(invitationTemplate);
    const htmlBody = template({
      recipient_name: recipient,
      url: url,
      user: user,
      event_title: title,
    });

    return htmlBody;
  }
}

export async function SetInvitationViewed(slug, key) {
  const updateContact = await UpdateInvitationViewed(slug, key);
  if (updateContact) {
    return { message: "contact Updated" };
  } else {
    return {
      message: "There was a problem, contact not updated",
    };
  }
}

export async function SetInvitationConfirmed(slug, key) {
  const UpdateConfirmation = await setConfirmation(slug, key);
  if (UpdateConfirmation) {
    return { message: "ok" };
  } else {
    return {
      message: "There was a problem, contact not updated",
    };
  }
}

export async function ListRepositoryObjects(prefix) {
  var params = {
    Bucket: "digital-pass-agtl",
    Delimiter: "/",
    Prefix: prefix,
  };

  const listObjects = s3.listObjectsV2(params);

  return listObjects;
}

export async function AddRepositoryObject(prevState, formData) {
  const objectType = formData.get("object_type");

  if (objectType === "file") {
    const image = formData.get("file_input");
    const fileType = image.type;
    const selectedFileName = formData.get("object_name");

    /*  const extension = selectedFileName.split(".").pop(); */
    const prefix = formData.get("prefix");

    const bufferedImage = await image.arrayBuffer();

    s3.putObject({
      Bucket: "digital-pass-agtl",
      Key: `${prefix}${selectedFileName}`,
      Body: Buffer.from(bufferedImage),
      ContentType: fileType,
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    revalidatePath("/content-store");

    return { message: "file Uploaded" };
  } else if (objectType === "folder") {
    const objectName = formData.get("folderName");

    if (objectName.match(/[!@#$%^&*(),?"":{}|<>á-ü]/g)) {
      return { message: "Folder name do not support special characters" };
    }

    const fileType = "";
    // replacing spaces and special characters
    const folderName = objectName.replace(/[!@#$%^&*(),.?" ":{}|<>´]/g, "_");
    const selectedFileName = folderName;
    const prefix = formData.get("prefix");

    s3.putObject({
      Bucket: "digital-pass-agtl",
      Key: `${prefix}${selectedFileName}/`,
      ContentLength: 0,
      ContentType: fileType,
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    revalidatePath("/content-store");

    return { message: "file Uploaded" };
  }
}

export async function deleteRepositoryObjects(selectedItems) {
  if (selectedItems.length > 0) {
    try {
      s3.deleteObjects({
        Bucket: "digital-pass-agtl",
        Delete: {
          Objects: selectedItems,
        },
        Quiet: false,
      });

      await new Promise((resolve) => setTimeout(resolve, 5000));
      revalidatePath("/content-store");

      return { message: "Items Deleted" };
    } catch (err) {
      return { message: err };
    }
  } else {
    return { message: "No Items to Delete" };
  }
}

export async function sendSMS(data, event_title, host, slug, template) {
  const inv_link = `${process.env.WEB_HOST}${slug}?key=${data.Key}&source=sms`;

  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;

  const client = new Twilio(accountSid, authToken);

  const response = await client.messages.create({
    body: `Hello ${data.First_Name}, You have an Invitation! ${host} have invited you to the event ${event_title} through the Smart Invitation Service. Select the following link to go to your invitation ${inv_link}`,
    messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
    //solo funciona para México, habría que meter loógica para el area code de otros países
    to: `+52${data.Phone}`,
  });

  if (response.sid) {
    const updateContact = await UpdateEmailSent(slug, data);
    if (updateContact) {
      revalidatePath(`/events/${slug}?template=${template}`);
      return { message: "sms sent" };
    } else {
      return { message: "sms sent however contact was not updated" };
    }
  } else {
    return { message: "message was not send, please try again" };
  }
}

// this function requires to setup a twilio whatsapp number and an approved template it was tested usind twilio sandbox however it is still pending to setup
// a twilio whatsapp number and to get an approved messae template to start convesations.
export async function sendWhatsapp(data, event_title, host, slug) {
  const inv_link = `${process.env.WEB_HOST}${slug}?key=${data.Key}&source=sms`;
  console.log(inv_link);

  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;

  const client = new Twilio(accountSid, authToken);

  const response = await client.messages.create({
    body: `Hello, You have an Invitation! ${host} have invited you to the event ${event_title} through the Smart Invitation Service. Select the following link to go to your invitation ${inv_link}`,
    /*   body: `Your appointment is coming up on July 21 at 3PM`, */
    from: "whatsapp:+14155238886",
    //solo funciona para México, habría que meter loógica para el area code de otros países
    to: `whatsapp:+521${data.Phone}`,
  });

  if (response.sid) {
    return { message: "whatsapp sent" };
  } else {
    return { message: "message was not send, please try again" };
  }
}

// Se debe modificar esta función para que se pueda ejecutar en back sin que el usuario tenga que esperar a que se envien todas las notificaciones.
export async function BulkSendNotifications(prevState, formData) {
  const slug = formData.get("slug");
  const channel = formData.get("channel");

  // get contacts with unsend invitations

  const event = await getSingleEvent(slug);
  const pendingContacts = event.contacts.filter((inv) => inv.sent != 1);

  // send invitation through selected channel

  if (pendingContacts.length > 0) {
    for (let contact of pendingContacts) {
      if (channel === "email") {
        sendEmail(contact, event.slug, event.template, event.title, event.host);
      } else if (channel === "sms") {
        sendSMS(contact, event.title, event.host, event.slug, event.template);
      } else if (channel === "whatsapp") {
        sendWhatsapp(contact, event.title, event.host, event.slug);
      }
    }
    revalidatePath(`/events/${event.slug}?template=${event.template}`);
    return { message: "Notifications are on the way" };
  } else {
    return { message: "No pending notifications detected" };
  }
}

export async function CreateAccount(prevState, formData) {
  const pws = formData.get("pws");
  const pws_2 = formData.get("pws_2");
  /*  const salt = bcrypt.genSaltSync(10); */
  const hash = await bcrypt.hash(pws, 5);
  const first_name = formData.get("FName");
  const last_name = formData.get("LName");
  const email = formData.get("email");

  if (pws != pws_2) {
    return { message: "Password don´t match" };
  }

  const user = {
    name: first_name,
    email: email,
    password: hash,
  };

  const result = await createNewAccount(user);
  if (result) {
    redirect("/login");
  } else {
    return { message: "An error happened" };
  }
}

export async function doCredentialsLogin(formData) {
  const response = await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/",
  });
 
  return response;
}

export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirect:true, redirectTo:"/"});
}

export async function doLogOut() {
  await signOut({ redirectTo: "/login" });
}
