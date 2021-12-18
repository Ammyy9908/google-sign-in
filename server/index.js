const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors())
const authRoutes = require('./routes/auth_routes')
const port = process.env.PORT || 5000;
app.use(express.json());
// Connect to MongoDB
mongoose.connect('mongodb+srv://<Username>:<Password>@cluster0.0wij2.mongodb.net/googleSignin',
 { useNewUrlParser: true });
app.get('/',(req,res)=>{
    res.status(200).send({message:"API is working"});
})
app.use('/auth',authRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
