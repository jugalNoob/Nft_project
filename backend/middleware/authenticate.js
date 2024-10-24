const jwt=require("jsonwebtoken")
const Register=require("../models/student")
let keysecret="jugalsharnmaimaamgoodlevelpersonstartlinkandbitchlook";

const authenticate = async(req,res,next)=>{

    try {
        //Only use cookies
        const token = req.cookies.usercookie;
        const verifytoken = jwt.verify(token,keysecret); // compare tokens
        // mache your tokens tpkens
        const rootUser = await Register.findOne({_id:verifytoken._id , "tokens.token":token});
        if(!rootUser) {throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        res.status(401).send("No Token Provider")
        console.log(error)
    }
}


module.exports = authenticate


//thapa@gmail.com
//thapa123