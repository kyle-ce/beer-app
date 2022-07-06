const sql = require("./db.js");
//constructor 
const Beer = function(beer){
    this.id = beer.id;
    this.name = beer.name;
    this.description = beer.description;
    this.ranking = beer.ranking;
};
//Create
Beer.create = (newBeer, result) => {
    sql.query("INSERT INTO beers SET ?", newBeer, (err,res) => {
        if (err){
           console.log("CREATE error: ",err); 
        result(err, null);
        return;
        }
        console.log("created beer: ", {id: res.insertId});
        result(null, {id: res.insertId});
    });
};
//GET ALL
Beer.getAll = ( result) => {
    let query = "SELECT * FROM beers";
    // if (name) {
    //   query += ` WHERE name LIKE '%${name}%'`;
    // }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("beer: ", res);
      result(null, res);
    });
};
//UPDATE by ID
Beer.updateById = (id, beer, result) => {
    sql.query(
      "UPDATE beers SET name = ?, description = ?, ranking = ? WHERE id = ?",
      [beer.name, beer.description, beer.ranking, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found beer with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated beer: ", { id: id});
        result(null, { id: id});
      }
    );
  };
//DELETE
Beer.remove = (id, result) => {
    sql.query("DELETE FROM beers WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found beer with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted beer with id: ", id);
        result(null, res);
    });
};
//DELETE ALL
// Beer.removeAll = result => {
//     sql.query("DELETE FROM beers", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }
//         console.log(`deleted ${res.affectedRows} beers`);
//         result(null, res);
//     });
// };

module.exports = Beer;

