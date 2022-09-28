const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , (req , res)=>{

  res.sendFile(__dirname + "/index.html");

});

app.post("/", (req,res)=>{

  let query = req.body.cityName;
  let units = req.body.unitType;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=7c9f793334e3f266caa6b5d787378022&units=" + units;
  https.get(url , (response)=>{
    console.log(response.statusCode);

    response.on("data", (data)=>{
      const weatherData = JSON.parse(data);

      let temp = weatherData.main.temp;
      let weatherDescription = weatherData.weather[0].description;
      let weatherIcon = weatherData.weather[0].icon;
      let weatherUrl = "http://openweathermap.org/img/wn/"+ weatherIcon + "@2x.png"
      if(units == "Metric" ){
          res.write("<h1>The temperature in "+ query + " is: " + temp + " Degrees celcius.</h1>")
      }else{
          res.write("<h1>The temperature in "+ query + " is: " + temp + " Fahrenheit.</h1>")
      }

      res.write("<p> Weather Description: " + weatherDescription + "</p>")
      res.write("<img src=" + weatherUrl + ">");
      // let obj ={
      //   name: "kunal",
      //   age: 18
      // }
      // console.log(JSON.stringify(obj))
    })
  })
})



app.listen(3000, ()=>{
  console.log("Server has started at port 3000")
})
