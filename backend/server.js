const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectDB =require("./config/db");
const User = require("./models/User")
const auth = require("./middleware/auth")
const noteRoutes = require("./routes/noteRoutes");

const app =express();

const cors = require("cors");
app.use(cors());



app.use(express.json());

connectDB()


const SECRET_KEY = "mysecretkey";



app.post("/register", async(req, res)=>{

    const{email, password} = req.body;

    const userExist = await User.findOne({ email });
    if(userExist){
        return res.status(400).send("User Already Registered")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    User.create({email,
         password: hashPassword
        })
    res.send("User Registered")
})

app.post("/login", async (req, res)=>{

    const{email, password}= req.body;

    const user = await User.findOne({email});
    if(!user){

        return res.status(400).send("Invalid email or password")
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).send("Invalid credential")
    }
     
    const token = jwt.sign(
  { id: user._id },
  SECRET_KEY,
  { expiresIn: "1h" }
);


    res.json({message: "login Successfully", token})

})




app.get("/profile", auth, async (req,res)=>{

   const user = await User.findById(req.user.id).select("-password");
   res.json(user)
});

app.get("/dashboard", auth, (req, res) => {
  res.send("Dashboard access granted");
});


app.use("/notes", noteRoutes);


app.listen(5000, ()=> console.log("Server is running at port 5000"))