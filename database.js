const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connect = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    .then((db) => console.log("Database Connect..."))
    .catch((e) => console.log(e));
};

module.exports = connect;
