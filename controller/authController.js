import { users } from "../model/model.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;

export const createAccount = async(req, res)=>{
    try{
        console.log(req.body)
        const hashedPass = bycrypt.hashSync(req.body.password, saltRounds)
        const token = jwt.sign(req.body.email, process.env.JWTSecret)
        await users.create({
            ...req.body, "password": hashedPass, "token" : token
        })
        res.json({userCreated: true, token})
    }catch(error){
        console.log(error)
        res.json({error: error})
    }
}

export const checkLogin = async(req, res)=>{
    try{
        let userDetails = await users.findOne({$or: [{name: req.body.nameEmail}, {email: req.body.nameEmail}]});
        if(bycrypt.compareSync(req.body.password, userDetails.password)){
            res.json({"authUser": true, "authToken": userDetails.token})
        }else{
            res.json({"authUser": false})
        }
    }catch{
        res.json({error: "email not found"})
    }
}


