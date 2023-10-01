const dotenv = require("dotenv");
dotenv.config();
const Express = require("express");
const app = new Express();
const Joi = require("joi");
const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://127.0.0.1/portfolio";
const mongoose = require("mongoose");
const cors = require("cors");

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("Connect db successfully"))
  .catch((err) => console.log("Error: ", err));

const reviewSchema = mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const reviews = mongoose.model("userreview", reviewSchema);

function validatereview(review) {
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    message: Joi.string().min(3).required(),
  };
  return Joi.validate(review, schema);
}

async function createCourse(req) {
  const review = new reviews({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  try {
    const result = await review.save();
    console.log(result);
    return result;
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}

app.get("/review", async (req, res) => {
  const result = await reviews.find();
  res.send(result);
});

app.post("/review", async (req, res) => {
  const { error } = validatereview(req.body);
  if (error) {
    return res.status(422).json(error.details[0].message);
  } else {
    const result = await createCourse(req);
    res.send(result);
  }
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening port ${port}....`));
