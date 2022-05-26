const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")
const { append } = require("express/lib/response")
const req = require("express/lib/request")
const res = require("express/lib/response")


var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

var studentModel=Mongoose.model("students",

new Mongoose.Schema({
    admno:String,
    rollNo:String,
    name:String,
    class:String,
    parentName:String,
    mobile:String,
    address:String
})

)

var faculatyModel=Mongoose.model("faculties",

new Mongoose.Schema({
    facultyName:String,
    education:String,
    mobileNo:String,
    facultyaddress:String,
    pinCode:String,
    district:String

})

)
Mongoose.connect("mongodb+srv://sruthybabu:sruthy4599@cluster0.bip6a.mongodb.net/collegeDb")



app.post("/api/studentadd",(req,res)=>{
    var getAdmno=req.body.admno 
    var getRollno=req.body.rollNo 
    var getName=req.body.name
    var getClass=req.body.class 
    var getParentname=req.body.parentName
    var getMobile=req.body.mobile 
    var getAddress=req.body.address 
    data={"admno":getAdmno,"rollNo":getRollno,"name":getName,"class":getClass,"parentName":getParentname,"mobile":getMobile,"address":getAddress}

    let mystudent= new studentModel(data)
    mystudent.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
            res.send({"status":"success","data":data})
        }
    })
   
})



app.post("/api/facultiesadd",(req,res)=>{
    var getFname=req.body.facultyName 
    var getEducation=req.body.education 
    var getMobileno=req.body.mobileNo 
    var getFaddress=req.body.facultyaddress 
    var getPincode=req.body.pinCode 
    var getDistrict=req.body.district 

    data={"facultyName":getFname,"education":getEducation,"mobileNo":getMobileno,"facultyaddress":getFaddress,"pinCode":getPincode,"district":getDistrict}

    let myfaculty=new faculatyModel(data)
    myfaculty.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
            res.send({"status":"success","data":data})
        }
    })
  
})


app.get("/api/studentview",(req,res)=>{
    studentModel.find(
        (error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else
            {
                res.send(data)

            }
        }
    )
})


app.get("/api/facultiesview",(req,res)=>{
    faculatyModel.find(
        (error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else
            {
                res.send(data)

            }
        }
    )
})

app.listen(5006,()=>{
    console.log("Server Running")
})