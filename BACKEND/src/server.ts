import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port:number =5000;
const connection_url:string = "mongodb+srv://mugaboandre:NirereNadine1983@cluster0.1518h6w.mongodb.net/MyBrand-Andre?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());

mongoose.connect(connection_url)
    .then(()=>{
        console.log('Connected on MongoDB');
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error:any)=>{
        console.log("Error connecting to MongoDB:",error);
    })