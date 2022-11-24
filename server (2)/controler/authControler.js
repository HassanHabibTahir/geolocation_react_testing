const User = require("../modle/user");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports.register = async (req, res) => {
  console.log("Auth Data", req.body);
  try {
    // Get user input
    const { first_name, location, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && location)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      location,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign({ user_id: user._id, email }, "mynameismudasar", {
      expiresIn: "2h",
    });
    // save user token
    user.token = token;
    await user.save();

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

// login  start
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("=====$$$$$$$> ", email, password);

    // if (!(email && password)) {
    //   res.status(400).send("All input is required");
    // }

    const user = await User.findOne({ email });
    console.log("myuser",user);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id }, "mynameismudasar", {
        expiresIn: "2h",
      });

      user.token = token;

      res.status(200).send(user);
    }
  } catch (err) {
    console.log(err);
  }
};
// app.post("/login", async (req, res) => {



  module.exports.getUsers = async(req , res) => {
    try{
        const users = await User.find();
        console.log("User get Data From Database",users)
        res.status(200).json(users)
        

    } catch (err){
        console.log("get requt field from mongodb",err.message);


    }
} 