const express = require("express");
const router = new express.Router();

const fs=require("fs")
const jwt=require("jsonwebtoken")
const authenticate = require("../middleware/authenticate");
const Register=require("../models/student")

const bcrypt = require('bcryptjs');
router.post("/Signup" , async(req,res)=>{
    const{name , email , password}=req.body

if(!name || !email || !password){
    return res.status(422).json({error: "plz check your missing filled"})
}
 

 const userExist=await Register.findOne({email:email})
 if(userExist){
    return   res.status(422).json({error :'user email already exist'})
 }


    try{
        const addData=new Register({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
           
        })
        const upload=await addData.save();
        console.log(upload)

        ///Fs  appendFile ////////////FIXME - 
        fs.appendFile("hash.txt", JSON.stringify({...upload}) + "\n", (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Data appended successfully to hash.json");
          });
          console.log(upload)
        res.status(200).json({error:"successfully upload data"})
    }catch(err){
        console.log(err)
        res.status(400).json({error:" not successfully upload data"})
            }
})



//aignin Loging Form

router.post("/signin" , async(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try{
        const userValid = await Register.findOne({email:email});
        if(userValid){
            const isMatch = await bcrypt.compare(password,userValid.password);
            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
                console.log(error)
            }else{
                // token generate
                const token = await userValid.generateAuthtoken();
                console.log(token)
                // cookiegenerate
                res.cookie("usercookie",token,{ 

                    expires:new Date(Date.now()+9000000),
                    httpOnly:true,
                    
                });
                const result = {
                    userValid,
                    token
                }
               res.status(201).json({status:201,result})
               console.log("coockies")
               console.log(userValid)
            }
        }
    }catch(err){

        console.log(err)
        res.status(400).json({error:"succsessfull not full"})
    }

})

///Updateing start  email password your information ///.

router.patch("/Signup/:email", async (req, res) => { /// email 
    try {
      const email = req.params.email; 
      console.log(email);
      let password=req.body.password;
      console.log(password)
  
     let hashpassword=await bcrypt.hash(password ,12) /// passsword hash start row class
  

      const updatedUser = await Register.findOneAndUpdate(
        { email:email }, // Use "email" to find the user
        { password:hashpassword }, // Object with the updated email field
        { new: true }
      );
      res.send(updatedUser);
    //   console.log(updatedUser);
    //   console.log(email, "this is email");
    } catch (error) {

        
      console.log(error);
      res.status(401).json({ error: "not_good_io" });
    }
  });
  






//authentication

//check user login

router.get("/Cont",authenticate,(req,res)=>{
    console.log("hello")
    res.send(req.rootUser)
});



///Out Line Row class
router.get("/logout", (req, res) => {
    try {
        console.log("hello hellow eolred");
        res.clearCookie("usercookie");
        res.status(200).send("UserLogout");
        // Update the user's session to indicate that they are logged out
        req.session.user = null;

        // Redirect the user to a different page after logout
        res.redirect("/login");
    } catch (error) {
        console.error("Error occurred during logout:", error);
        res.status(500).send("Error occurred during logout");
    }
});

 

module.exports = router;



/// "$2a$12$gRDPITOmTbLkR8E8wBu.hOejICInZySBeZ2QYWsqv20p/6K9CvBTu"