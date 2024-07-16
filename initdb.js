const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://atamez76:gcxrV2LP5UBVmLMC@cluster0.psmf4pm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const templates = [
  {
    Name: "t_01",
    type: "invitation",
    dateCreated: "2024-03-27",
    form: "F01",
    guess_name: "Dear [Guest Name]",
    title: "[Event Title]",
    sub_title: "[Sub Title]",
    description:
      "[Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s]",
    date: "[10-28-2006]",
    time: "[12:00 am]",
    venue: "[Venue]",
    address: "[Address]",
    geo: "",
    slug: "",
    styles: {
      background_color: "#ffffff",
      font_color: "#000000",
      opacity: "1",
      grayscale: "0",
      font_family: "DansScripts",
      font_size: "inherit",
      background_image: "https://digipass-main.s3.amazonaws.com/wedding_01.jpg",
    },
  },
  {
    Name: "t_02",
    type: "invitation",
    dateCreated: "2024-03-25",
    form: "F02",
    guess_name: "Dear [Guest Name]",
    title: "[Event Title]",
    sub_title: "[Sub Title]",
    description:
      "[Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s]",
    date: "[10-28-2006]",
    time: "[12:00 am]",
    venue: "[Venue]",
    address: "[Address]",
    geo: "",
    slug: "",
    styles: {
      background_color: "#ffffff",
      font_color: "#000000",
      opacity: "1",
      grayscale: "0",
      font_family: "caveat",
      font_size: "inherit",
      background_image: "https://digipass-main.s3.amazonaws.com/15_anos.jpg",
    },
  },
];

const typeOfEvents = [
  {
    data: [
      {
        default: "--Select an Event Type --",
      },
      {
        wedding: "wedding",
      },
      {
        birthday: "birthday",
      },
      {
        annyversar: "annyversary",
      },
      {
        fiftheenYear: "15 year Celebration",
      },
      {
        symposium: "symposium",
      },
      {
        Webinar: "Webinar",
      },
    ],
  },
];

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function insertTemplates() {
  const collection = client.db("invitations").collection("templates");

  const result = await collection.insertMany(templates);

  console.log(`${result.insertedCount} where inserted`);

  await client.close();
}

async function insertEventTypes() {
  const collection = client.db("invitations").collection("Type of Events");

  const result = await collection.insertMany(typeOfEvents);

  console.log(`${result.insertedCount} where inserted`);

  await client.close();
}

insertTemplates();
/* insertEventTypes(); */
