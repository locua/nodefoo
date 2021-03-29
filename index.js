var express=require('express');
var app=express();
app.set('view engine','jade');


//app.get('/',function(req,res)
//{
//  res.send('Hello World!');
//});

app.route('/view1').get(function(req,res)
{
    res.send("Tutorial on Node");
});

app.route('/Another view').get(function(req,res)
{
    res.send("Tutorial on Angular");
});

app.get('/',function(req,res){
    //res.send('/ base view');
    res.render('index',
      {title:'MyTitle',message:'Wilkommen'})
});

var server=app.listen(3000,function() {});

console.log("Serving on port 3000");
