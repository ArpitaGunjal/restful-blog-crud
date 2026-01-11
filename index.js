const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const{ randomUUID }=require("crypto");
const methodOverride=require("method-override");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));



let blogs=[
    {
        id:randomUUID(),
        Writer_name:"Tanvi Jige",
        content:"Learning full-stack development has helped me understand how frontend and backend work together. Express and EJS made routing and rendering very simple.",
    },
    {
        id:randomUUID(),
        Writer_name:"Arpita Gunjal",
        content:"While working on CRUD operations, I realized how important proper routing and middleware are in Express. Small mistakes can cause big bugs.",
    },
    {
        id:randomUUID(),
        Writer_name:"Sujal Kherde",
        content:"Debugging is not scary anymore. Console logs, understanding req.body, and fixing form issues taught me how real backend debugging works.",
    },
    {
        id:randomUUID(),
        Writer_name:"Aditya Chopra",
        content:"Building projects step by step is the best way to learn backend development. Seeing features like create, edit, and view blogs working feels very rewarding.",
    },
];
app.get("/blogs",(req,res)=>{
    res.render("index.ejs",{blogs});
});
app.get("/blogs/new",(req,res)=>{
    res.render("new.ejs");
});
app.get("/blogs/:id",(req,res)=>{
    let{id}=req.params;
    let blog=blogs.find((b)=>id==b.id);
    res.render("show.ejs",{blog});
});

app.post("/blogs",(req,res)=>{
    let {Writer_name,content}=req.body;
    let id=randomUUID();
    blogs.push({id,Writer_name,content});
    res.redirect("/blogs");
});


app.patch("/blogs/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
    let blog=blogs.find((b)=>id===b.id);
    blog.content=newContent;
    console.log(blog);
    res.redirect("/blogs");
});
app.get("/blogs/:id/edit",(req,res)=>{
    let{id}=req.params;
    let blog=blogs.find((b)=>id===b.id);
    res.render("edit.ejs",{blog});
});
app.delete("/blogs/:id",(req,res)=>{
    let {id}=req.params;
    blogs=blogs.filter((b)=>id!==b.id);
    res.redirect("/blogs");
});
app.listen(port,()=>{
    console.log("Litening to port 8080");
});