const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();


const port = process.env.PORT || 5000;

//   middle ware
app.use(cors());
app.use(express.json());
//  siyamahmed3827
// 4c7AvUR0MNbpQ3Hb


const uri = "mongodb+srv://siyamahmed3827:4c7AvUR0MNbpQ3Hb@cluster0.6784glr.mongodb.net/?retryWrites=true&w=majority";

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

             app.post('/products', async(req , res ) =>{
                const product = req.body;
                console.log(product)
                const result = await productCollection.insertOne(product);
                res.send(result)
        
             })



             app.get("/products" , async(req , res ) =>{
                const cursor = productCollection.find();
                const result = await cursor.toArray()
                res.send(result)
             })






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