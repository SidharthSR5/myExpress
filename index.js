const express= require('express')
const app=express()
const PORT=3500;

app.use(express.json());

const books=[
    {   id:1,
        title:'sunrise',
        author:'collins',
        year:2014},
    {   id:2,
        title:'the dark',
        author:'rachel',
        year:2005},
    {   id:3,
        title:'sparrow',
        author:'griffin',
        year:2016},
]
 
app.get('/retrieve',(req,res)=>{
    res.send(books);
})

app.get('/retrieve/:id',(req,res)=>{
    const searchid=req.params.id;
    const data=books.find((x)=>x.id==searchid);
    if(!data){
        return res.status(404).send('no data found for the given id');
    }
    res.send(data);
})

app.post('/add',(req,res)=>{
    const {title,author,year}=req.body;
    if(!title || !author || !year){
        return res.status(404).send('missing some data');
    }
    const newbook={
        id:Date.now(),
        title:title,
        author:author,
        year:year
    };
    books.push(newbook);
    res.status(201).send('book added successfully!');
})

app.patch('/update/:id',(req,res)=>{
    const  updateid = req.params.id; 
    const upbook=books.find((x)=>x.id==updateid);
    if(!upbook){
        return res.status(404).send('no book found for given id');
    }
    if(req.body.title){
        upbook.title=req.body.title;
    }
    if(req.body.author){
        upbook.author=req.body.author;
    }
    if(req.body.year){
        upbook.year=req.body.year;
    }
    res.status(200).send('updated successfully');
})

app.delete('/delete/:id',(req,res)=>{
    const deleteid=req.params.id;
    const index=books.findIndex((x)=>x.id==deleteid);
    if(index==-1){
        return res.status(404).send('no id found in book');
    }
    books.splice(index,1);
    res.status(200).send('deleted');
})

app.listen(PORT,()=>console.log('server running on port: '+ PORT));