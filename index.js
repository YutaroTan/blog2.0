import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static")); // Serve static files from the "static" directory

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/post",(req,res)=>{
    res.render("post.ejs");
});

app.get("/view",(req,res)=>{
    res.render("view.ejs");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});