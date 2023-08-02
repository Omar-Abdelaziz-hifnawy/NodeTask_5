const express = require("express");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 3000;
const path = require("path");

app.set("view engine", "hbs");

const viewsDirectory = path.join(__dirname, "../temp1/views");
app.set("views", viewsDirectory);

const partialsPath = path.join(__dirname, "../temp1/partials");
hbs.registerPartials(partialsPath);

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "HOME",
    desc: "this is home page",
  });
});
app.get("/header", (req, res) => {
  res.render("header", {
    title: "Header",
  });
});


const geocode  = require('./weather tools/geocode')  
const forecast  = require('./weather tools/forecast')

app.get('/weather' , (req,res) => {
  if(!req.query.address) {  
    return res.send({
      error : 'you must enter address'
    })
  }
  geocode(req.query.address , (error, data) => {
    if (error) {
      return res.send({error})
    } else {
      forecast(data.latitude , data.longtitude , (error , forecastData) => {
        if (error) {
          return res.send({error})
        } else {
          res.send({
            location : req.query.address,
            forecast : forecastData , 
            latitude : data.latitude ,
            longtitude : data.longtitude ,
          })
        }
      }) 
    }
  })
})

app.get("*", (req, res) => {  
  res.send("404 Not Fund");   
});

// Start the server
app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
