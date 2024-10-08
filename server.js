import express from "express";

const app = express();
app.use(express.json());

const port = 1819;

let bolgInfoData = [];

// post blog
app.post("/blogInfo", (req, res) => {
    const username = req.body.username
    const title = req.body.title;
    const imgurl = req.body.imagurl;
    const desc = req.body.desc;

    const prams = { id: bolgInfoData.length + 1, username, title, imgurl, desc };
    bolgInfoData.push(prams);
    res.json(prams)
})

// get
app.get("/blogInfo", (req, res) => {
    res.json(bolgInfoData);
})

// patch
app.patch('/blogInfo/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    const { username, title, imgurl, desc } = req.body;
    const blog = bolgInfoData.find(b => b.id === blogId);

    if (blog) {
        blog.username = username || blog.username
        blog.title = title || blog.title;
        blog.imgurl = imgurl || blog.imgurl;
        blog.desc = desc || blog.desc;
        res.json(blog);
    } else {
        res.status(404).json({ message: 'blog not found' });
    }
});

// delete 
app.delete("/blogInfo/:id", (req, res) => {
    const blogId = parseInt(req.params.id);
    const blogIndex = bolgInfoData.findIndex(b => b.id === blogId);
    const blog = bolgInfoData[blogIndex];

    bolgInfoData.splice(blogIndex, 1);
    res.send(blog);

});


let signupData = [];

// post Signup
app.post("/signup", (req, res) => {
    const fullname = req.body.name;
    const username = req.body.username
    const password = req.body.password;
    const exitUser = signupData.find((ele)=> ele.username === username)
    if(!exitUser){
        const prams = { id: signupData.length + 1, fullname, username, password };
        signupData.push(prams);
        res.json(prams)
    }else{
        res.send("the username not available")
    }


})

// get Signup
app.get("/signup", (req, res) => {
    res.json(signupData);
})


// post Login
app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password;
    const user= signupData.some((ele) => ele.username === username && ele.password === password)
    if(user){
        res.send("logged in successfully")
    }else{
        res.send("wrong username or password")
    }

})



app.listen(port, () => {

})

// data
// [
//     {
//       "id": 1,
//       "username": "Ali",
//       "title": "SunFlower",
//       "desc": "You might think each sunflower is just a single bloom but each flowerhead is actually made up of up to two thousand florets. These tiny flowers are packed full of nectar making them a great treat for bees as well"
//     },
//     {
//       "id": 2,
//       "username": "user manal",
//       "title": "rose",
//       "desc": "A rose is either a woody perennial flowering plant of the genus Rosa, in the family Rosaceae, or the flower it bears. There are over three hundred species and tens of thousands of cultivars"
//     }
//   ]





