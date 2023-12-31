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
const { resolve } = require("path-browserify");

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
    expiresIn: "2d",
  });

  console.log("Generated Token:", token);
  return token;
};

const sendVerificationEmail = (email, token) => {
  const verificationLink = `http://localhost:8080/verify-email/${token}`;

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
    let body = req.body;

    //Converting photo path to base64 string
    body.photo = Buffer.from(body.photo).toString("base64");

    const product = await Product.create(body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error While Saving!" });
  }
});

//Route for fetch a product info from db by its id
app.get("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.find({ ["id"]: [productId] });

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    //returning the first element of the array
    let productInfo = product[0];

    // //decoding photo path from base64
    // let encodedPath = productInfo?.photo;
    // productInfo.photo = Buffer.from(encodedPath, "base64").toString("utf-8");

    res.status(200).json(productInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while retrieving product" });
  }
});

// app.get("/static-product/:id", async (req, res) => {
//   try {
//     const productId = req.params.id;
//     console.log("Id: ", productId);

//     const products = [
//       {
//         id: 1,
//         name: "Product1",
//         price: 19.99,
//         rating: 4.5,
//         reviews: 10,
//         photo: "/p1.jpg",
//         description: "This is an example product description.",
//         countInStock: 10,
//       },
//       {
//         id: 2,
//         name: "Product2",
//         price: 19,
//         rating: 4,
//         reviews: 10,
//         photo: "/p2.jpg",
//         description: "This is an example product1 description.",
//         countInStock: 10,
//       },
//       {
//         id: 3,
//         name: " Product3",
//         price: 17,
//         rating: 4.5,
//         reviews: 10,
//         photo: "/p3.jpg",
//         description: "This is an example product2 description.",
//         countInStock: 10,
//       },
//     ];

//     const findProductById = (productId) => {
//       return products.find((product) => product.id == productId);
//     };

//     const product = products.find((product) => product.id == productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json(product);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error while retrieving product" });
//   }
// });

// Add this route to fetch all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while retrieving products" });
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
        console.log("Response:", response);
        if (response) {
          const token = generateToken(user);
          res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
          console.log("Login Success");
          return res.status(200).json({ status: "Success", name: user.name });
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
  //console.log("I am here");

  try {
    // Verify the token
    //console.log("I am here 1");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get the user ID from the token payload
    const userId = decoded.userId;
    //console.log(userId);

    // Update the user's account status to mark it as verified
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }
    //console.log(updatedUser);
    res.redirect("http://localhost:3000/login");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ... (existing code)

// Route to handle "Buy Now" process
// app.post("/buy-now", async (req, res) => {
//   try {
//     const { userId, productId } = req.body;

//     // Check if the user is logged in (validate the token)
//     const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

//     if (decodedToken.userId !== userId) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     // Fetch the product by productId
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Here, you would initiate the actual payment process using a payment gateway
//     // For this example, we'll just simulate a successful payment
//     const paymentInfo = {
//       status: "success",
//       paymentId: "1234567890",
//     };

//     res.status(200).json({ message: "Payment successful", paymentInfo });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/check-auth", (req, res) => {
  try {
    console.log("Check Authentication Token:", req.cookies.token);
    //Check if the user is authenticated
    if (req.cookies.token) {
      // User is authenticated
      const decodedToken = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      );
      res.status(200).json({ isAuthenticated: true });
    } else {
      // User is not authenticated
      console.log("No token found in cookies12");
      res.status(200).json({ isAuthenticated: false });
      //console.log("Not Authenticated");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user-profile", (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("I am here");
    const decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    console.log("Received Token:", req.cookies.token);
    //Fetch user data using the user ID

    User.findById(userId)
      .select("-password  -_id -isVerified -__v") // Exclude the password field from the response
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/logout", (req, res) => {
  // Clear any authentication-related data
  res.clearCookie("token"); // Clear the token cookie
  res.status(200).json({ message: "Logged out successfully" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
