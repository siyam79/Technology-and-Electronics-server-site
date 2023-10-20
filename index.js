require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();


const port = process.env.PORT || 5000;

//   middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6784glr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const productCollection = client.db("productDB").collection("products");
        const addcardcollection = client.db("productDB").collection("addcard");


        app.post('/addcard', async (req, res) => {
            const cards = req.body;
            const result = await addcardcollection.insertOne(cards)
            res.send(result)
        })

        app.get('/addcard', async (req, res) => {
            const cursor = addcardcollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        //  deletd  products 

        app.delete('/addcard/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            };
            const result = await addcardcollection.deleteOne(query)
            res.send(result)
        })



        
        app.post('/products', async (req, res) => {
            const product = req.body;
            console.log(product)
            const result = await productCollection.insertOne(product);
            res.send(result)

        })

        app.get("/products", async (req, res) => {
            const cursor = productCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })

        //  single  data  get 

        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id),
            };
            const result = await productCollection.findOne(query)
            res.send(result)
        })


        //   data  update 

        app.get("/product/:id", async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            };
            const result = await productCollection.findOne(query)
            res.send(result)
        })


        app.put("/product/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const option = { upsert: true };
            const updateProducts = req.body;
            const update = {
                $set: {
                    name: updateProducts.name,
                    image: updateProducts.image,
                    brand_name: updateProducts.brand_name,
                    price: updateProducts.price,
                    type: updateProducts.type,
                    description: updateProducts.description,
                    rating: updateProducts.rating
                }
            }
            const result = await productCollection.updateOne(filter, update, option)
            res.send(result)
        })


        //  add data load 

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("server site on and process  ")
})
app.listen(port, () => {
    console.log(`server site is runing ${port}`);
})