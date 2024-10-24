const mongoose=require("mongoose");
var bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")
// const keysecret=process.env.SECRETY_KEY;
let keysecret="jugalsharnmaimaamgoodlevelpersonstartlinkandbitchlook"
const Students=new mongoose.Schema({
   
    
   name: { type: String, lowercase: true, trim: true },

    
    email:{
        type:String,Number,
        lowercase: true,
      
    },

    password:{
        type:String,Number,
      
    },
    date: {
        type: Date,
        default: Date.now // Default value for date
      },
    

    tokens:[
        {
            token:{
                type:String
            },
        }
    ]



})

//////////////////////////LINK - 
//we are generated token /// store in DataBase
//authentication 

//GenerateAuthToken is a function use in login router
Students.methods.generateAuthtoken = async function () {
    try {
      let token = jwt.sign({ _id: this._id }, keysecret, { // jwt.sign is a generatToken 
        /// add apaylob and secret Keys ///!SECTION
        expiresIn: "10d",
      });

  
      this.tokens = this.tokens.concat({ token: token });
      await this.save(); /// importn save Token

      return token; /// 
    } catch (error) {
      return {
        status: 422,
        error: error,
      };
    }
  };


  ///Hash create in password ////////////use express

Students.pre("save", async function (next) {
    try {
      if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
      }
  
      next();
    } catch (error) {
      throw new Error(error);
    }
  });




const Register = new mongoose.model("Usersdata", Students,)
    // Error handler function
   
  
  module.exports = Register;


 