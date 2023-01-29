require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dns = require("dns");
const app = express();

const database = require("./database");
// Connection to database
database();

// import model
const Urlsdata = require("./models/shortUrl");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/shorturl/:numUrl", async (req, res, next) => {
  if (!isNaN(req.params.numUrl)) {
    let data = await Urlsdata.findOne({ short_url: req.params.numUrl });
    if (data) {
      res.redirect(data.original_url);
    } else {
      res.json({ error: "No short URL found for the given input" });
    }
  } else {
    res.json({ error: "Wrong format" });
  }

  next();
});

// POST endpoint
app.post("/api/shorturl", urlencodedParser, async (req, res, next) => {
  // Create promise for lookup
  const lookup = async (url) => {
    return new Promise((resolve, reject) => {
      dns.lookup(new URL(url).host, (err, address) => {
        if (err) {
          reject(err);
        } else {
          resolve(address);
        }
      });
    });
  };

  // Management the lookup promise
  const lookupPromise = async () => {
    let isValid;
    try {
      await lookup(req.body.url);
      isValid = "";
    } catch (e) {
      isValid = e.code;
    }
    return isValid;
  };

  // Conditional for check if have error in request

  let protocolValid = /^https?:\/\/.+/gi;

  if ((await lookupPromise()) === "" && protocolValid.test(req.body.url)) {
    let data = await Urlsdata.findOne({ original_url: req.body.url });

    // Find the max value of the short url
    let maxValShortUrl =
      (await Urlsdata.find({})
        .sort({ short_url: -1 })
        .limit(1)
        .then((data) => data[0].short_url)) + 1;

    if (!data) {
      let newUrl = new Urlsdata({
        original_url: req.body.url,
        short_url: maxValShortUrl,
      });
      newUrl.save((err, _) => {
        if (err) {
          console.log(err);
        }
      });

      res.json({
        original_url: newUrl.original_url,
        short_url: newUrl.short_url,
      });
    } else {
      res.json({ original_url: data.original_url, short_url: data.short_url });
    }
  } else if (
    (await lookupPromise()) === "ERR_INVALID_URL" ||
    !protocolValid.test(req.body.url)
  ) {
    res.json({ error: "Invalid URL" });
  } else if ((await lookupPromise()) === "ENOTFOUND") {
    res.json({ error: "Invalid Hostname" });
  }
  next();
});

//Run server
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
