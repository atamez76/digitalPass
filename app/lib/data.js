import { MongoClient } from "mongodb";
import { vars } from "./vars";

const uri = process.env.URI;

export async function getTemplates() {
  const client = await MongoClient.connect(uri);
  const collection = client.db("invitations").collection("templates");
  const templates = await collection.find().toArray();
  await client.close();
  return templates;
}

export async function getOneTemplate(name) {
  const client = await MongoClient.connect(uri);
  const collection = client.db("invitations").collection("templates");
  const template = await collection.findOne({ template: name });
  await client.close();
  return template;
}

export async function getTypeOfEvents() {
  const client = await MongoClient.connect(uri);
  const collection = client.db("invitations").collection("Type of Events");
  const typeOfEvents = await collection.find().toArray();
  await client.close();
  return typeOfEvents;
}

export async function saveEvent(event) {
  const client = await MongoClient.connect(uri);
  const collection = client.db(vars.mongoCluster).collection("Events");
  await collection.insertOne(event);

  await client.close();
}

export async function updateContactList(slug, contactList) {
  const client = await MongoClient.connect(uri);
  const collection = client.db(vars.mongoCluster).collection("Events");
  const filter = { slug: slug };
  const updateDocument = {
    $push: {
      contacts: {
        $each: contactList,
      },
    },
  };
  const options = { upsert: true };

  try {
    const result = await collection.updateOne(filter, updateDocument, options);
    await client.close();
    return result;
  } catch (err) {
    await client.close();
    return err;
  }
}

export async function RemoveContact(slug, contact) {
  const client = await MongoClient.connect(uri);
  const collection = client.db(vars.mongoCluster).collection("Events");
  const filter = { slug: slug };
  const updateDocument = {
    $pull: {
      contacts: { Key: contact.Key },
    },
  };

  try {
    const result = await collection.updateOne(filter, updateDocument);
    await client.close();
    return result;
  } catch (err) {
    await client.close();
    return err;
  }
}

export async function UpdateEmailSent(slug, contact) {
  const client = await MongoClient.connect(uri);
  const collection = client.db(vars.mongoCluster).collection("Events");
  const filter = { slug: slug };
  const updateDocument = {
    $set: {
      "contacts.$[elem].sent": 1,
    },
  };

  const options = {
    arrayFilters: [{ "elem.Key": contact.Key }],
  };

  try {
    const result = await collection.updateOne(filter, updateDocument, options);
    console.log(result);
    await client.close();
    return result;
  } catch (err) {
    await client.close();
    console.log(err);
    return err;
  }
}

export async function UpdateInvitationViewed(slug, key) {
  const client = await MongoClient.connect(uri);
  const collection = client.db(vars.mongoCluster).collection("Events");
  const filter = { slug: slug };
  const updateDocument = {
    $set: {
      "contacts.$[elem].viewed": 1,
    },
  };

  const options = {
    arrayFilters: [{ "elem.Key": key }],
  };

  try {
    const result = await collection.updateOne(filter, updateDocument, options);
    await client.close();
    return result;
  } catch (err) {
    await client.close();
    console.log(err);
    return err;
  }
}

export async function setConfirmation(slug, key) {
  const client = await MongoClient.connect(uri);
  const collection = client.db(vars.mongoCluster).collection("Events");
  const filter = { slug: slug };
  const updateDocument = {
    $set: {
      "contacts.$[elem].confirmed": 1,
    },
  };

  const options = {
    arrayFilters: [{ "elem.Key": key }],
  };

  try {
    const result = await collection.updateOne(filter, updateDocument, options);
    await client.close();
    return result;
  } catch (err) {
    await client.close();
    console.log(err);
    return err;
  }
}

export async function getEvents() {
  const client = await MongoClient.connect(uri);
  const collection = client.db(vars.mongoCluster).collection("Events");
  const Events = await collection.find().toArray();
  await client.close();
  return Events;
}

export async function getNoOfEvents() {
  const client = await MongoClient.connect(uri);
  const collection = client.db(vars.mongoCluster).collection("Events");
  const NoOfEvents = await collection.countDocuments();
  await client.close();
  return NoOfEvents;
}

export async function getSingleEvent(slug) {
  const client = await MongoClient.connect(uri);
  const collection = client.db(vars.mongoCluster).collection("Events");
  const Event = await collection.findOne({ slug: slug });
  await client.close();
  return Event;
}

export async function createNewAccount(user) {
  const client = await MongoClient.connect(uri);
  const collection = client.db("accounts").collection("accounts");
  const result = await collection.insertOne(user);
  await client.close();

  return(result)

 
}

export async function getOneUser(mail) {
  const client = await MongoClient.connect(uri);
  const collection = client.db("accounts").collection("accounts");
  const user = await collection.findOne({ email: mail });
  await client.close();
  return user;
}
