module.exports = app => {
    const beers = require("../controllers/beer.controller.js");
    var router = require("express").Router();
    //create beer
    router.post("/", beers.create);
    //get all beers
    router.get("/", beers.findAll);
    //update beer
    router.put("/:id", beers.update);
    //delete beer
    router.delete("/:id", beers.delete);
    //delete all beers
    // router.delete("/", beers.deleteAll);
    //set entry point 
    app.use('/api/beers', router);
};