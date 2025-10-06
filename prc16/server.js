const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Home Page
app.get("/", (req, res) => {
  res.render("index");
});

// Contact Page
app.get("/contact", (req, res) => {
  res.render("contact", { message: null, error: null });
});

// Handle Form Submission
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.render("contact", { message: null, error: "All fields are required!" });
  }

  try {
    // Transporter
    let transporter = nodemailer.createTransport({
      service: "gmail", // Or another like "outlook", "yahoo"
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email details
    let mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.TO_EMAIL,
      subject: "📩 New Contact Form Submission",
      text: message,
      html: `<p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Message:</b><br>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.render("contact", { message: "Your message has been sent successfully!", error: null });
  } catch (err) {
    console.error(err);
    res.render("contact", { message: null, error: "Failed to send message. Try again later." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


/// npx nodemon server.js