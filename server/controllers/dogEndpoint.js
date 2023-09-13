let mongoose = require ('mongoose') ;
let express = require ('express');
let Dog = require('./models/dog');

let router = express.Router();

/*Dog
Create a dog -> POST
Change details -> PATCH
Delete -> DELETE
Get -> GET by OwnerID*/

// Create a new dog > POST
router.post('ownerEndpoint/:id/createDog', async (req, res) => {
    newDogParams = req.body
    let createdDog = await Dog.create(req.body, (err, newDog) => {
        // newDog.ownerId = req.params.id
        newDog = newDogParams
        newDog.save();
    })
})

// Get a dog by owner ID > GET
router.get('ownerEndpoint/:id/findDog', async (req, res) => {

    if (req.body.name == null){
        return res.status(400).json({"message" : "Invalid name passed"})
    }
    // this gets us a list of dogs with the owner's id
    let listDog = await Dog.find(
        req.params.id, (err, dog) => {
            if (err) { return next(err); }
            if (dog == null) {
                return res.status(404).json({"message": "No dogs found for given ID"})
            }
        })
    foundDog = listDog.find((dog) => {return dog.name == req.body.name}) //search list for name of dog
    res.send(foundDog)
})

// Return a list of all dogs by owner ID > GET
router.get('ownerEndpoint/:id/findDogList', async (req, res) => {
    // this gets us a list of dogs with the owner"s id
    let listDog = await Dog.find(
        req.params.id, (err, dog) => {
            if (err) { return next(err); }
            if (dog == null) {
                return res.status(404).json({"message": "No dogs found for given ID"})
            }
        })
    res.send(listDog)
})

// Update the dog with the given owner ID > PUT
router.put('/ownerEndpoint/:id/updateDog', async function(req, res, next) {
    if (req.body.name == null){
        return res.status(400).json({"message" : "Invalid name passed"})
    }
    // this gets us a list of dogs with the owner's id
    let updatedDog = await Dog.find(
            {"ownerId" : req.params.id, "name": req.body.name}, (err, dog) => {
                if (err) { return next(err); }
                if (dog == null) {
                    return res.status(404).json({"message": "No dogs found for given ID"})
                }
                //dog = listDog.find((dogToFind) => {return dogToFind.name == req.body.name}) //search list for name of dog
                dog.name = req.body.name
                dog.age = req.body.age
                dog.breed = req.body.breed
                dog.diet = req.body.diet
                dog.save();
            })
        res.json(updatedDog);
});

// Update the dog's age with the given owner ID > PATCH
router.patch('/ownerEndpoint/:id/updateAge', async function(req, res, next) {
    if (req.body.name == null){
        return res.status(400).json({"message" : "Invalid name passed"})
    }
    // this gets us a list of dogs with the owner's id
    let updatedDog = await Dog.find(
        {"ownerId" : req.params.id, "name": req.body.name}, (err, dog) => {
            if (err) { return next(err); }
            if (dog == null) {
                return res.status(404).json({"message": "No dogs found for given ID"})
            }
            //dog = listDog.find((dogToFind) => {return dogToFind.name == req.body.name}) //search list for name of dog
            dog.age = req.body.age
            dog.save();
        })
    res.json(updatedDog);
});

// Update the dog's diet with the given owner ID > PATCH << fix others (test this pls)
router.patch('/ownerEndpoint/:id/updateDogsDiet', async function(req, res, next) {
    if (req.body.name == null){
        return res.status(400).json({"message" : "Invalid name passed"})
    }
    // this gets us a list of dogs with the owner's id
    let updatedDog = await Dog.find(
        {"ownerId" : req.params.id, "name": req.body.name}, (err, dog) => {
            if (err) { return next(err); }
            if (dog == null) {
                return res.status(404).json({"message": "No dogs found for given ID"})
            }
            //dog = listDog.find((dogToFind) => {return dogToFind.name == req.body.name}) //search list for name of dog
            dog.diet = req.body.diet
            dog.save();
        })
    res.json(updatedDog);

});


// Delete the camel with the given ID > DELETE
router.delete('ownerEndpoint/:id/deleteDog', async (req, res) => {

    if (req.body.name == null){
        return res.status(400).json({"message" : "Invalid name passed"})
    }
    // this gets us a list of dogs with the owner's id
    let listDog = await Dog.find(
        req.params.id, (err, dog) => {
            if (err) { return next(err); }
            if (dog == null) {
                return res.status(404).json({"message": "No dogs found for given ID"})
            }

            dog.delete((dogToDelete) => {return dogToDelete.name == req.body.name}) //search list for name of dog
            dog.save();

        })
    
    res.send(foundDog)
})

// Error handler (must be registered last)
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        "message": err.message,
        "error": {}
    };
    if (app.get('env') === 'development') {
        err_res["error"] = err;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});

module.exports = router;