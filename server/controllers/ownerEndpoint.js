let mongoose = require ('mongoose') ;
let express = require ('express');

let router = express.Router();

// Mongoose schema
var ownerSchema = new mongoose.Schema({
    color: { type: String },
    position: { type: Number }
});
// Mongoose model
var Owner = mongoose.model('owners', ownerSchema);

// Create a new owner
router.post('/', async (req, res) => {
    let newOwner = new Owner(req.body)
    let result = await newOwner.save()
    res.send(result)
})

// Return a list of all owners
router.get('/', [],async (req, res) => { //pass all middleware as an array
    let owners = await Owner.find()
    res.status(200).send(owners)
});



// Return the owner with the given ID
router.get('/owners/:id', function(req, res, next) {
    var id = req.params.id;
    Owner.findById(req.params.id, function(err, owner) {
        if (err) { return next(err); }
        if (owner == null) {
            return res.status(404).json({"message": "Owner not found"});
        }
        res.json(owner);
    });
});

module.exports = router;