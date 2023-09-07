/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions");

const runtimeOpts = {
  maxInstances: 10,
};
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  return res.status(200).send("hi there, how are you doing");
});

app.post("/api/create", (req, res) => {
  (async () => {
    try {
      await db.collection("userDetails").doc(`/${Date.now()}/`).create({
        id: Date.now(),
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,
      });
      return res.status(200).send({ status: "Success", message: "Data saved" });
    } catch (error) {
      console.error("Error while saving data:", error);
      return res.status(500).send({ status: "Failed", message: error });
    }
  })();
});

app.get("/api/get/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("userDetails").doc(req.params.id);
      const userDetails = await reqDoc.get();
      const response = userDetails.data();

      return res.status(200).send({ status: "Success", message: response });
    } catch (error) {
      console.error("Error while getting specific data:", error);
      return res.status(500).send({ status: "Failed", message: error });
    }
  })();
});

app.get("/api/getAll", (req, res) => {
  (async () => {
    try {
      const query = db.collection("userDetails");
      const response = [];
      await query.get().then((data) => {
        const docs = data.docs;
        docs.forEach((doc) => {
          const selectedItem = {
            name: doc.data().name,
            address: doc.data().address,
            mobile: doc.data().mobile,
          };
          response.push(selectedItem);
        });
      });

      return res.status(200).send({ status: "Success", message: response });
    } catch (error) {
      console.error("Error while getting all data:", error);
      return res.status(500).send({ status: "Failed", message: error });
    }
  })();
});

app.put("/api/update/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("userDetails").doc(req.params.id);
      await reqDoc.update({
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,
      });

      return res
        .status(200)
        .send({ status: "Success", message: "Data updated" });
    } catch (error) {
      console.error("Error while updating data:", error);
      return res.status(500).send({ status: "Failed", message: error });
    }
  })();
});

app.delete("/api/delete/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("userDetails").doc(req.params.id);
      await reqDoc.delete();

      return res
        .status(200)
        .send({ status: "Success", message: "Data deleted" });
    } catch (error) {
      console.error("Error while deleting data:", error);
      return res.status(500).send({ status: "Failed", message: error });
    }
  })();
});

exports.app = onRequest(runtimeOpts, app);

exports.scheduledFunction = onSchedule(
  {
    schedule: "* * 1 1 *",
    maxInstances: 10,
  },
  async (event) => {
    console.log("calling Schedule", event);
    logger.log("logger calling Schedule", event);
  }
);
