var mysql = require('mysql');

const getConnection = function() {
  var mysqlConnection = mysql.createConnection({
    host: "0.0.0.0", // FIXME: Avoid to hard-code this. Use the env.
    user: "root",
    database: "db",
    password: "pw"
  });

  mysqlConnection.connect(function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Connected to MySQL.");
      let sql = 'SELECT * FROM users;';
      mysqlConnection.query(sql, function (err, result) {
        if (err) {
          throw err;
        }
        console.log("Result: " + result);

        mysqlConnection.end(function(err) {
          console.log("Terminated the MySQL connection");
          // The connection is terminated now
        });
      });
    }
  });
  return mysqlConnection;
};

exports.getConnection = getConnection;

