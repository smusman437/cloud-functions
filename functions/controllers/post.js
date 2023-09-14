/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = {
  CreatePost: async (req, res) => {
    try {
      await db.collection("postDetails").doc(`/${Date.now()}/`).create({
        id: Date.now(),
        title: req.body.title,
        body: req.body.body,
      });
      return res.status(200).send({ status: "Success", message: "Data saved" });
    } catch (error) {
      console.error("Error while saving data:", error);
      return res.status(500).send({ status: "Failed", message: error });
    }
  },
  GetAllPosts: async (req, res) => {
    try {
      const query = db.collection("postDetails");
      const response = [];
      await query.get().then((data) => {
        const docs = data.docs;
        docs.forEach((doc) => {
          const selectedItem = {
            title: doc.data().title,
            address: doc.data().address,
            body: doc.data().body,
          };
          response.push(selectedItem);
        });
      });

      return res.status(200).send({ status: "Success", message: response });
    } catch (error) {
      console.error("Error while getting all post:", error);
      return res.status(500).send({ status: "Failed", message: error });
    }
  },
  GetSinglePost: async (req, res) => {
    try {
      const reqDoc = db.collection("postDetails").doc(req.params.id);
      const userDetails = await reqDoc.get();
      const response = userDetails.data();

      return res.status(200).send({ status: "Success", message: response });
    } catch (error) {
      console.error("Error while getting specific post:", error);
      return res.status(500).send({ status: "Failed", message: error });
    }
  },
  UpdatePost: async (req, res) => {
    try {
      const reqDoc = db.collection("postDetails").doc(req.params.id);
      await reqDoc.update({
        title: req.body.title,
        body: req.body.body,
      });

      return res
        .status(200)
        .send({ status: "Success", message: "Data updated" });
    } catch (error) {
      console.error("Error while updating post:", error);
      return res.status(500).send({ status: "Failed", message: error });
    }
  },
  DeletePost: async (req, res) => {
    try {
      const reqDoc = db.collection("postDetails").doc(req.params.id);
      await reqDoc.delete();

      return res
        .status(200)
        .send({ status: "Success", message: "Data deleted" });
    } catch (error) {
      console.error("Error while deleting post:", error);
      return res.status(500).send({ status: "Failed", message: error });
    }
  },
};
