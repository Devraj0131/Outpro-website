const express = require("express");
const path = require("path");
require("./db");
const Contact = require("./models/Contact");


const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/services", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "services.html"));
});

app.get("/portfolio", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "portfolio.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        console.log("Saved:", name);

        res.send("Message sent successfully!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving data");
    }
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.get("/api/contacts", async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

app.post("/delete/:id", async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.send("Deleted");
    } catch (err) {
        res.status(500).send("Error deleting message");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});