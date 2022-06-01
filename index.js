const express = require('express'); 
require('dotenv').config()
const cors = require('cors');  
const { MongoClient, ServerApiVersion } = require('mongodb');
const { log } = require('console');


const app=express()
const port=process.env.PORT||5000

app.use(cors())
app.use(express.json()) 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1osud.mongodb.net/?retryWrites=true&w=majority`; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); 

async function run(){
  try{
     await client.connect() 
     console.log("connected databae ");
     const donorsCollection=client.db('donorsDb').collection('donor') 
        
    //  product/:id
    
     app.get('/donors/:id',async(req,res)=>{
        const id=req.params.id
         const group= String(id)
         const query={blood:group} 
         const cursor=donorsCollection.find(query)
         const donors=await cursor.toArray()
         res.send(donors)
     })
  }finally{

  }
}
app.get('/',(req,res)=>{
    res.send("surver is running ")
})
app.listen(port,()=>{
    console.log("app is running on " ,port);
}) 

run().catch(console.dir)