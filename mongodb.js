const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/portfolio")
  .then(() => console.log("Connect db successfully"))
  .catch((err) => console.log("Erroe : ", err));

const reviewSchema = mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const reviews = mongoose.model("userreview", reviewSchema);

async function createCourse() {
  const review = new reviews({
    name: "vraj",
    email: "atveekdunagarani2021@gmail.com",
    message: "i'm atveek",
  });
  try {
    const result = await review.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}
console.log("atveek");

async function getreview(id) {
  const result = await reviews.find({ _id: id });
  console.log(result);
}
createCourse();
getreview("650428131e385f36e09a8c56");
