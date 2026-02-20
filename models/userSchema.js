const {Schema, model }=require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const UserSchema = new Schema({

    name:{
        type:String,
        required:[true, "user name is required"],
        trim : true, 
        lowercase:true,
        minlength:[3, "user's name should be atleast 3 charater long."]
    },

    email:{
        type: String,
        required:[true,"Email is reruired"],
        unique:true,
        validate: [validator.isEmail, "please provide a valid email."],
        trim:true,
        lowercase:true
    },
    role:{
        type: String,
        enum:["user","admin"],
        default:"user"
    },
    password:{
        type:String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false,
        trim:true
    },
    confirmPassword:{
        type: String,
        required: [true, 'Please confirm your password'],
        validate:{
            validator: function (value){
                return value === this.password;
            },
            message:"passwords do not match"
        }
    }

})

UserSchema.pre("save",async function (){


  if(!this.isModified("password")) return ;

  this.password= await bcrypt.hash(this.password,12);
  this.confirmPassword=undefined;

})

UserSchema.methods.checkPassword = async function(userPassword,dbPassword){
   return await bcrypt.compare(userPassword,dbPassword)
}

const User = model( "Users", UserSchema)

module.exports = User;