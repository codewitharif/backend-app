var con = require("./connection");
var express = require("express");

// con.connect(function (err) {
//   if (err) throw err;
//   con.query("select * from students", function (err, results) {
//     if (err) throw err;
//     console.log(results);
//   });
// });

var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("template engine", "ejs");

app.get("/", (req, resp) => {
  resp.sendFile(`${__dirname}/index.html`);
});

app.post("/", async (req, resp) => {
  //   console.log(req.body);
  var name = await req.body.name;
  var email = await req.body.email;
  var mno = await req.body.mno;

  con.connect((err) => {
    // if (err) throw err;
    var myquery = "INSERT INTO students(name, email, mno) VALUES(?,?,?)";
    con.query(myquery, [name, email, mno], (err, result) => {
      //   if (err) throw err;
      //   resp.send("studnent register successfull");
      resp.redirect("/students");
    });
  });
});

app.get("/students", async (req, resp) => {
  con.connect((err) => {
    if (err) console.log(err);
    var myquery = "select * from students";
    con.query(myquery, (err, result) => {
      if (err) console.log(err);
      resp.render(`${__dirname}/student.ejs`, { students: result });
    });
  });
});

app.get("/delete-student", (req, resp) => {
  con.connect((err) => {
    if (err) console.log(err);
    var myquery = "delete from students where id=?";
    var id = req.query.id;
    con.query(myquery, [id], (err, result) => {
      if (err) console.log(err);
      resp.redirect("/students");
    });
  });
});
app.get("/update-student", (req, resp) => {
  con.connect((err) => {
    if (err) console.log(err);
    var myquery = "select * from students where id=?";
    var id = req.query.id;
    con.query(myquery, [id], (err, result) => {
      if (err) console.log(err);
      resp.render(`${__dirname}/update-student.ejs`, { student: result });
    });
  });
});

app.post("/update-student", async (req, resp) => {
  var id = await req.body.id;
  var name = await req.body.name;
  var email = await req.body.email;
  var mno = await req.body.mno;

  con.connect((err) => {
    if (err) console.log(err);
    var myquery = "update students set name=?, email=?, mno=? where id=?";
    con.query(myquery, [name, email, mno, id], (err, result) => {
      if (err) console.log(err);
      resp.redirect("/students");
    });
  });
});
app.listen(5000, () => {
  console.log("server is running smoothly");
});
