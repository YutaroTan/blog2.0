import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static")); // Serve static files from the "static" directory
app.use(express.json());

let contentHolder = []
let titleHolder = []
var SearchTitle;
var TitleFind = "";
var ContentFind = "";
var countToEdit = 0;
var messageContent = "";

app.post("/endpoint",(req,res)=>{
    messageContent = "";
    console.log("reset");
    res.redirect("/post");
})

app.post("/view",(req,res)=>{
    const title = req.body["title"];
    const content = req.body["content"];
    var titleMatch = false;
    
    // Only push non-empty values
    if (title) {
        
        for(let i=0;i<titleHolder.length;i++){
            if(title==titleHolder[i]){
                titleMatch = true;
            };
        };
        if(!titleMatch){
            titleHolder.push(title);
            messageContent = "";
            if(content){
                contentHolder.push(content);
            }else{
                contentHolder.push("Content waiting to be added");
            };
            res.redirect("/view");
        }else{
            console.log("title has been taken");
            messageContent = "title has been taken";
            res.redirect("/post");
            //alert
        };
    }else{
        //alert
        messageContent = "title can't be blanked";
        res.redirect("/post");
    };
    console.log(messageContent);
    console.log(titleHolder);
    console.log(contentHolder);
});
app.post("/edit",(req,res)=>{
    const EditTitle = req.body["SearchTitle"];
    var find = false;

    for(var j=0;j<titleHolder.length;j++){
        if(EditTitle == titleHolder[j]){
            find = true;
            TitleFind = titleHolder[j];
            ContentFind = contentHolder[j];
            countToEdit = j;
        }
    }
    if(find){
        res.redirect("/edit");
    }else{
        res.redirect("view");
        console.log("the title you enter hasn't be identifiied, please check your spelling and try again");
    }
});

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/post",(req,res)=>{
    res.render("post.ejs",{messageContent:messageContent});
});

app.get("/view",(req,res)=>{
    res.render("view.ejs", {
        contentHolder: contentHolder,
        titleHolder: titleHolder,
      });
});

app.get("/edit",(req,res)=>{
    res.render("edit.ejs",{TitleFind:TitleFind,ContentFind:ContentFind});
});

app.post("/update",(req,res)=>{
    titleHolder[countToEdit] = req.body["titleForEdit"];
    contentHolder[countToEdit] = req.body["contentForEdit"];
    res.redirect("/view");
});

app.post("/delete",(req,res)=>{
    titleHolder.splice(countToEdit,1);
    contentHolder.splice(countToEdit,1);
    res.redirect("/view");
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});