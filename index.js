const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port =process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors());
app.use(express.json());

// sanjidamitu456
// yqXSY9g3I7IkGS9o



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5du28se.mongodb.net/?retryWrites=true&w=majority`;

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


    const jobCollection = client.db('jobDB').collection('job');
    const categorylist = client.db('jobDB').collection('category');
    const bidslist = client.db('jobDB').collection('bid');

      
    app.post('/jobs', async(req,res)=>{
      const newjob = req.body;
      console.log(newjob) ;
      const result = await jobCollection.insertOne(newjob);
      res.send(result);
    })
    
app.post('/category', async(req,res)=>{
      const newcategory  = req.body;
      console.log(newcategory ) ;
      const result = await categorylist.insertOne(newcategory );
      res.send(result);
    })
    
    app.post('/bids', async(req,res)=>{
      const newbid  = req.body;
      console.log(newbid) ;
      const result = await bidslist.insertOne(newbid);
      res.send(result);
    })


    // update
    app.get('/jobs/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await jobCollection.findOne(query);
      res.send(result);
    })

    app.get('/bids/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await bidslist.findOne(query);
      res.send(result);
    })


    app.put('/jobs/:id', async(req,res)=>{
       
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert:true};
      const updatedjob = req.body;
      const job = {
        $set:{
          employername : updatedjob.employername,
           jobtitle  : updatedjob.jobtitle ,
           deadline : updatedjob.deadline,
           description: updatedjob.description,
           minimumprice : updatedjob. minimumprice,
           maxprice :updatedjob.maxprice,
           category: updatedjob.category,
           img : updatedjob.img,
           
        }
      }
     const result = await jobCollection.updateOne(filter,job,options);
     res.send(result);

    })

    app.put('/bids/:id', async(req,res)=>{
       
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert:true};
      const updatedjob = req.body;
      const job = {
        $set:{
          status : updatedjob.status,
         
           
        }
      }
     const result = await jobCollection.updateOne(filter,job,options);
     res.send(result);

    })



    //delete

    app.delete('/jobs/:id', async (req,res)=>{
          const id = req.params.id;
          console.log(id);
          const query = {_id: new ObjectId(id)}
          const result = await jobCollection.deleteOne(query);
          res.send(result);

    })

    

    app.get('/jobs', async(req,res)=>{


      let queryobj={}
      const employername = req.query.employername;
      if(employername){
        queryobj.employername = employername;
      }
      const cursor = jobCollection.find(queryobj);
      const result = await cursor.toArray();
      res.send(result);
    })


    app.get('/bids', async(req,res)=>{
      const cursor = bidslist.find();
      const result = await cursor.toArray();
      res.send(result);
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


app.get('/', (req,res)=>{

    res.send('find job server is runing')
})

app.listen(port,() => {
    console.log (`job find server is runing on port ${port} `)
})