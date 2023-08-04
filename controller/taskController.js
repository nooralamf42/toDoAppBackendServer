import {users} from "../model/model.js";
import "dotenv/config.js"
import jwt from "jsonwebtoken";


export const createTask = async(req, res)=>{
    try{
        const currentUserEmail = jwt.verify(req.get("Authorization").split(" ")[1], process.env.JWTSecret)
        if(currentUserEmail){
            await users.findOneAndUpdate({email: currentUserEmail}, {$push: { task: req.body }}, {new: true});
            res.json({taskAdded: true})
        }
        else{
            res.json({token: "expired"})
        }
    }catch(error){
        res.json({error})
    }
}

export const checkUserTask = async(req, res)=>{
    try{
        const currentUserEmail = jwt.verify(req.get("Authorization").split(" ")[1], process.env.JWTSecret)
        if(currentUserEmail){
            const currentUser = await users.findOne({email: currentUserEmail});
            res.json(currentUser.task)
        }
        else{
            res.json({token: "expired"})
        }
    }catch(error){
        res.json({error})
    }
}

export const updateTask = async(req, res)=>{
    console.log(JSON.stringify(req.body), "updateTask called")
    try{
        const currentUserEmail = jwt.verify(req.get("Authorization").split(" ")[1], process.env.JWTSecret)
        if(currentUserEmail){
            await users.findOneAndUpdate({email: currentUserEmail}, {task: req.body}, {new: true});
            res.json({taskUpdated: true})
        }
        else{
            res.json({token: "expired"})
        }
    }catch(error){
        res.json({error})
    }
}

export const deleteUserTask = async(req, res)=>{
    try{
        const currentUserEmail = jwt.verify(req.get("Authorization").split(" ")[1], process.env.JWTSecret)
        if(currentUserEmail){
            const currentUser = await users.findOne({email: currentUserEmail});
            currentUser.task = undefined;
            currentUser.save();
            res.json({taskRemove: true});
        }
        else{
            res.json({token: "expired"})
        }
    }catch(error){
        res.json({error})
    }
}



