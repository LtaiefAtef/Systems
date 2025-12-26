"use client"
import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
export default function CourseService() {
    const [status,setStatus] = useState("");
    const [method,setMethod] = useState("POST");
    const [response,setResponse] = useState(undefined)
    async function sendRequest() {
    try {
        const url = document.getElementById("url").value;
        const payload = JSON.stringify(JSON.parse(document.getElementById("json-format").value.trim()))
        const res = await fetch("http://localhost:3000/api/course-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        });

        setStatus(res.status);

        const text = await res.text();
        let result = null;
        try {
        result = text ? JSON.parse(text) : null;
        } catch {
        result = { raw: text };
        }
        if(result!=null){
            setResponse(JSON.stringify(result, null, 2));
        }
        console.log("RESULT", result);
    } catch (e) {
        console.error(e);
    }
    }


    return <main>
    <fieldset className="auth-request">
        <legend>Manage Requests</legend>
            <div className="request-container">
            <Select
            defaultValue="POST"
            size="small"
            onChange={(e)=>{setMethod(e.target.value);setResponse(undefined);setStatus(null)}}
            sx={{
                color: "white",

                // white border
                ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.6)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.6)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.6)",
                },

                // white arrow
                "& .MuiSvgIcon-root": {
                color: "rgba(255,255,255,0.6)",
                },
            }}
            >
            <MenuItem
                value="POST"
                sx={{
                color: "rgba(217, 255, 79, 1)",
                }}
            >
                <em style={{color:"rgba(193, 255, 79, 1)",fontWeight:"bold"}}>POST</em>
            </MenuItem>
            </Select>
            <TextField
            defaultValue="http://localhost:8080/courses/CourseService?wsdl"
            disabled
            size="small"
            fullWidth
            id="url"
            sx={{
                width: 800,

                // text stays white when disabled
                "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "rgba(255,255,255,0.6)",
                color: "white",
                },

                // border stays white when disabled
                "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
                },
                "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
                },

                // placeholder (if ever used)
                "& input::placeholder": {
                color: "rgba(255,255,255,0.6)",
                opacity: 1,
                },
            }}
            />


                <button className="send-request" onClick={sendRequest}>Send Request</button>
            </div>
            {(method==="POST" || method=="PUT") && <div className="json-body-container">
                <h1>Function & Arguments</h1>
                <textarea id="json-format">
                    
                </textarea>
            </div>}
            <div className="json-response-container">
                <h1>Response <span className={(status == 200|| status == 201 || status == 204)? "OK"
                :(status==403||status==400)?"Forbidden":status==404?"not-found":""}>{status == 200? "OK"
                :status==403?"Forbidden":status==404?"Not Found":status==201?"Created":status==400?"Bad Request":status==204?"No Content":""}</span></h1>
                <textarea className="json-response" disabled style={method==="GET" ? {height:"400px"}:undefined} defaultValue={response}></textarea>
            </div>
        </fieldset>
    </main>
};
