const express = require("express")
const app=express()
const redis= require("async-redis")
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

//let colorArray=["red","blue","green","yellow"]

/*for(let i=0;i<colorArray.length;i++)
{
  client.set(colorArray[i], "0", redis.print);
  }*/


app.use(express.static('public'))

function counter(color)
{
  return async(req,res)=>{
    try{
      let value = await client.get(color);
      value=Number(value)+1;
      await client.set(color,`${value}`)
      console.log(color," ",value);
      res.send({value});
    }
    catch(e){
      console.log(e);
      res.send({error:e});
    }
}
}

app.get("/green",counter("green"));
app.get("/blue",counter("blue"));
app.get("/red",counter("red"));
app.get("/yellow",counter("yellow"));
app.listen(3002,()=>{console.log("server is running")});