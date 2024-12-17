/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

//Tạo các đối tượng 
const express = require("express");
const { db } = require("./configs/Configs");
const app = express();


//API /helloWorld
exports.app = onRequest(app);

//Viết API get list category
app.get('/categories', async (req, res) => {
    const categories = [];
    const cate = await db.collection("category").get(); //lấy hết bảng collection  -> category đúng tên với collection trên fbase
    cate.forEach(c => categories.push(c.data()));

    //thành công gửi đữ liệu cate
    return res.status(200).send(categories);
});

//Get details cate_by_id
app.get("/categories/:cateId" , async(req , res)=>{
    const {cateId} = req.params; //lấy trên endpoints req.params = { cateId: "123" }; req.params = { cateId: "123" }; const cateId = req.params.cateId;
    try {
        const cate = await db.collection('category').doc(cateId).get();
        return res.status(200).send(cate.data());

    }catch(error)
    {
        return res.status(500).send(error.message);
    }
})
app.post("/categories", async (req , res) => {
    const {name , description} = req.body ;   //Post thì nằm trong body -> data gửi trong body
    try{
        const cate = db.collection('category').doc()   //.doc() tham chiếu đến cột doc trong 1 collection
        const c = {
            "name":name ,
            "description": description,
        };
        cate.set(c)  //set(date , options)
        return res.status(201).send({
            "message": "successful",
            "data": c ,
        })


    }catch(error){
        return res.status(500).send(error.message)
    }
})