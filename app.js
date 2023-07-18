require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

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

mongoose
  .connect(
    "mongodb+srv://hossainekhfa:messi4455@productapi.l9kar5d.mongodb.net/product-info?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((error) => {
    console.log(error);
  });

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
        name: "Example Product",
        price: 19.99,
        rating: 4.5,
        reviews: 10,
        photo: "/p1.jpg",
        description: "This is an example product description.",
      },
      {
        id: 2,
        name: "Product1",
        price: 19,
        rating: 4,
        reviews: 10,
        photo: "/p2.jpg",
        description: "This is an example product1 description.",
      },
      {
        id: 3,
        name: " Product2",
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

    //res.status(200).json(product);

    // // Logic to fetch the product based on the provided ID
    // const product = await products.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while retrieving product" });
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // bcrypt.hash(password, 10, function (err, hash) {
  //   console.log(hash);
  //   try {
  //     User.create({ name, email, password: hash });
  //   } catch (err) {
  //     res.send(err);
  //   }
  // });

  //res.json([name, email, password]);
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash })
        .then((user) => res.status(201).json("Success"))
        .catch((err) => {
          console.log("I am here 1");
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      console.log("I am here 2");
      res.status(500).json(err);
    });
});

app.post("/Login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            "jwt-security-key",
            {
              expiresIn: "1d",
            }
          );
          res.cookie("token", token);
          console.log("Login Success");
          return res.status(200).json({ Status: "Success", role: user.role });
        } else {
          return res.status(500).json("Incorrect Password");
        }
      });
    } else {
      return res.status(404).json("No record Exist");
    }
  });
});

const varifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token is missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Error with token");
      } else {
        if (decoded.role === "admin") {
          next();
        } else {
          return res.json("not admin");
        }
      }
    });
  }
};

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
