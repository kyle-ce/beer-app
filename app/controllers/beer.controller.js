const Beer = require("../models/beer.model.js");
// Create and Save a new beer
exports.create = (req, res) => {
 // Validate request
 if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a beer
  const beer = new Beer({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    ranking: req.body.ranking 
  });
  // Save beer in the database
  Beer.create(beer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the beer entry."
      });
    else res.send(data);
  });
};
// Retrieve all beers the database 
exports.findAll = (req, res) => {
    const id = req.query.id;
    Beer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving all beers."
      });
    else res.send(data);
    });
};
//UDPATE a beer
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.body);
    Beer.updateById(
      req.params.id,
      new Beer(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found beer with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating beer with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
};
//DELETE a beer 
exports.delete = (req, res) => {
    Beer.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found beer with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete beer with id " + req.params.id
          });
        }
      } else res.send({ message: `beer with id ${req.params.id} was deleted successfully!` });
    });
};
// //DELETE ALL
// exports.deleteAll = (req, res) => {
//     Beer.removeAll((err, data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all beers."
//         });
//       else res.send({ message: `All beers were deleted successfully!` });
//     });
//   };
