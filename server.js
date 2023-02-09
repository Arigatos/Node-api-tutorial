// passwaord: adminNodeApi
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

app.get("/products", async (req, res) => {
  try {
    const product = await Product.find({});

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update a product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req, body);

    // no product found in DB
    if (!product) {
      return res
        .status(400)
        .json({ message: `cannot fund any profuct with ID ${id}` });
    }

    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// delete a product

app.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://vasilis123:admin123@nodeapi.zeglunh.mongodb.net/node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to MongoDB");

    app.listen(3001, () => {
      console.log(`Node API app is running on port 3001`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
