const Admins = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'MIHcAgEBBEIBOAYfnZcYKixaw9FqDWC1gNhW4GHlpZSjMyL+Bf4eo5TgsJ78xPSXbwpSNohCjeh2R2pjsdhv5DcXwww==';

const createAdmin = async (req, res) => {
  
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const admins = new Admins({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const adminToSave = await admins.save();
    res.status(200).json(adminToSave);
  } catch (error) {
    res.status(400).json({ message: "Invalid request" });
  }
};

// Return the admin with the given ID -> GET /owners/:id (individual item)
const getAdminById = async (req, res) => {
  try {
    const adminID = req.params.id;
    const adminToFind = await Admins.findById(adminID);
    if (!adminToFind) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(adminToFind);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not find any admin with the given ID" });
  }
};

async function loginAdmin(req, res) {
    const admin = await Admins.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(400).json({ error: 'Admin doesn\'t exist.' });
    }
    try{
        const matchPassword = await bcrypt.compare(req.body.password, admin.password);
        const accessToken = jwt.sign(JSON.stringify(admin), secretKey);
        if(matchPassword){
            res.status(200).json({ accessToken: accessToken, id: admin._id})
          } else {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        } catch(err) {
          console.log({err});
          return res.status(500).json(err);
      }
};


module.exports = {
    createAdmin,
    getAdminById,
    loginAdmin
};