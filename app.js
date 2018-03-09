const express=require("express");
const hbs=require('hbs');
const fs =require('fs');
var app=express();
//port  installation
const port=process.env.PORT || 3000;



//static folder
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
var now=new Date().toString();
var log= `${now}: ${req.method}, ${req.url}`;
console.log();
fs.appendFile('server.log',log+ "\n",(err)=>{
  if (err){
    console.log("unable to append to server log")
  }
});
  next();

});
/*app.use((req,res,next)=>{
  res.render('maintain.hbs');
  next();
});
*/

//set view engine
hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine','hbs');


hbs.registerHelper('getCurrentYear',()=>{
return  "test";
return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
//  return text.toLowerCase();
return('this is just a text')
});
//Routes

app.get('/',(req,res)=>{
//res.send(`<h2> Barev </h2>`
res.render('index',{title:"Main page"})

});

app.get('/about',(req,res)=>{
res.render('about',{
  title:"About page"
});
});
app.get('/projects',(req,res)=>{
res.render('projects',{
  title:"About page"
});
});
app.get('/bad',(req,res)=>{
  res.send({
    statuscode:"not found"
  });
});
app.listen(port,()=>{
  console.log(` app is listetening to he port ${port}`)
});
