const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const Product = mongoose.model("Product", {
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  isActive: { type: Boolean },
  details: {
    type: {
      description: { type: String, required: true, minLength: 10 },
      price: {
        type: Number,
        required: true,
        validate(value) {
          if (value < 0) {
            throw new Error("price number has to be a positive value");
          }
        },
      },
      discount: { type: Number, required: false, default: 0, minLength: 10 },
      images: {
        type: [
          {
            type: String,
          },
        ],
        validate(value) {
          if (value.length < 2) {
            throw new Error("array of images must include at least two images");
          }
        },
      },
      phone: {
        type: String,
        minLength: 10,
        required: true,
        validate(value) {
          if (!value.startsWith("05")) {
            throw new Error("Not A valid israeli Number");
          }
        },
      },
      date: {
        type: Date,
        required: false,
        unique: false,
        default: Date.now(),
      },
    },
  },
});
const product = new Product({
  name: "Flex-Computers",
  category: "Computers_Tablets",
  isActive: true,
  details: {
    description: "Lenevo Flex Computer - Black",
    price: 3800,
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/81AbJXWCxXL._AC_SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71FAP1zfTTL._AC_SL1500_.jpg",
    ],
    phone: "052-7908901",

  },
});

product.save().then(() => {
    console.log(product);
  }).catch((error) => {
    console.log("Error!", error);
  });
