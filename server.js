//intilize server

//const express=require('express');
//const path=require('path');

//after add type module in package json
import express from 'express';
import path from 'path';
import routes from './routes/index.js';


//const __dirname=path.resolve();
const app =express(); //handle all method of express

import './config/db.js';
//************************************get static file *************************************************/
//without middleware
//open home page and manage req and res
// app.get('/',(req,res)=>{
// res.sendFile(path.join(__dirname,'public','index.html'));
// }
// 


//**************************************** */ middleware****************************************** 
//app.use(express.static(path.join(__dirname,'public')))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// routs
app.use('/api', routes);


//**************************************get api************************************************ */
//database fake
// let posts=
// [
//     {id:1 , title:'post1'},
//     {id:2 , title:'post2'},
//     {id:3 , title:'post3'},
// ]
// //get all posts
// app.get('/api/posts',(req,res)=>
// {
//     res.json(posts);
// }
// )

// //get coustum post
// app.get('/api/posts/:id',(req,res)=>
// {
//     let param=parseInt(req.params.id);
//     //res.json(posts.filter(p=>p.id===param));
//     const post=posts.find(p=>p.id===param);
//     if(post)
//     {
//         res.json(post);
//     }
//     else if(!post)
//     {
//         res.send('error 404');
//     }


// }
// )









//open server in custom port 
app.listen(3000,()=>{


console.log('server started');

}
)