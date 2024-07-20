import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static")); // Serve static files from the "static" directory

var title;
var content;
let contentHolder = []
let titleHolder = []



app.post("/view",(req,res)=>{
    const title = req.body["title"];
    const content = req.body["content"];

    // Only push non-empty values
    if (title) titleHolder.push(title);
    if (content) contentHolder.push(content);
    res.render("view.ejs", {
        contentHolder: contentHolder,
        titleHolder: titleHolder
      });
      console.log(req.body);
      console.log(contentHolder);
      console.log(titleHolder);
});

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/post",(req,res)=>{
    res.render("post.ejs");
});

app.get("/view",(req,res)=>{
    res.render("view.ejs", {
        contentHolder: contentHolder,
        titleHolder: titleHolder
      });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});