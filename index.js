const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
require("dotenv").config();
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bbqqyyb.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    client.connect();
    const projectsCollection = client.db("portfolio").collection("projects");

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.get('/projects', async(req, res)=>{
      const query = {};
      const result = await projectsCollection.find(query).toArray()
      res.send(result)
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
