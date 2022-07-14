const express = require("express");
const cors = require("cors");
const webpush = require("web-push");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pushSubscription = "{{AQUÍ VIENE EL OBJETO DE TU SUSCRIPCIÓN}}";

const clientVapidKeys = {
  publicKey: "{{AQUÍ TU CLAVE PÚBLICA}}",
  privateKey: "{{AQUÍ TU CLAVE PRIVADA}}",
};

// webpush.setVapidDetails(
//   "mailto:TU@EMAIL.COM",
//   clientVapidKeys.publicKey,
//   clientVapidKeys.privateKey
// );

// Routes
app.get("/", async (req, res) => {
  const { title, message } = req.query;
  const payload = JSON.stringify({
    title,
    message,
  });
  try {
    await webpush.sendNotification(pushSubscription, payload, {
      vapidDetails: {
        subject: "mailto:TU@EMAIL.COM",
        publicKey: clientVapidKeys.publicKey,
        privateKey: clientVapidKeys.privateKey,
      },
    });
    res.send("Enviado");
  } catch (e) {
    console.log(e);
  }
});

app.post("/subscription", (req, res) => {
  console.log(req.body);
  res.sendStatus(200).json();
});

app.listen(8000, () => console.log("Server listening on port 8000"));
