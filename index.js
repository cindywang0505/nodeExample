const express = require("express");
const app = express();
const Datastore = require("nedb");
app.listen(3000, () => console.log("listening on 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();
// database.insert('');

// '/api' can be named anything. it's the endpoint, or the address we're sending data to
//followed by a callback function with two arguments
//request variable contains all info about the request
//response variable has the thing sending back to the client
app.post("/api", (request, response) => {
  console.log("I got a request");
  console.log(request.body);

  const data = request.body;
  const timestamp = Date.now();
  data.timestam = timestamp;

  database.insert(data);

  response.json({
    status: "success",
    timestamp: timestamp,
    latitute: data.lat,
    longtitute: data.lon,
  });
  response.end();
});

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    } else {
      response.json(data);
    }
  });
  // response.json({ test: 123 });
});
