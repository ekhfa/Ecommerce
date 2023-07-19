require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8080"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(cookieParser());

// MongoDB connection setup
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((error) => {
    console.log(error);
  });

// Nodemailer configuration using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// Generate JWT token
const generateToken = (user) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  console.log("Generated Token:", token);
  return token;
};

const sendVerificationEmail = (email, token) => {
  const verificationLink = `http://localhost:3000/verify-email/${token}`;

  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error While Saving!" });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("Id: ", productId);

    const products = [
      {
        id: 1,
        name: "Product1",
        price: 19.99,
        rating: 4.5,
        reviews: 10,
        photo: "/p1.jpg",
        description: "This is an example product description.",
      },
      {
        id: 2,
        name: "Product2",
        price: 19,
        rating: 4,
        reviews: 10,
        photo: "/p2.jpg",
        description: "This is an example product1 description.",
      },
      {
        id: 3,
        name: " Product3",
        price: 17,
        rating: 4.5,
        reviews: 10,
        photo: "/p3.jpg",
        description: "This is an example product2 description.",
      },
    ];

    const findProductById = (productId) => {
      return products.find((product) => product.id == productId);
    };

    const product = products.find((product) => product.id == productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while retrieving product" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    console.log(newUser);

    const token = generateToken(newUser);
    sendVerificationEmail(email, token);

    console.log(newUser);

    res.status(201).json({
      message: "Registration successful. Verification email sent.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = generateToken(user);
          res.cookie("token", token);
          console.log("Login Success");
          return res.status(200).json({ status: "Success", role: user.role });
        } else {
          return res.status(401).json({ error: "Incorrect password" });
        }
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Verify email endpoint
app.get("/verify-email/:token", async (req, res) => {
  const { token } = req.params;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get the user ID from the token payload
    const userId = decoded.userId;
    console.log(userId);

    // Update the user's account status to mark it as verified
    const updatedUser = User.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }
    console.log(updatedUser);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
