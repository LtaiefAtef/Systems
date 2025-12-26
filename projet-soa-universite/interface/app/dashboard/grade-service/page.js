"use client"
import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
export default function GradeService() {
    const [status,setStatus] = useState("");
    const [method,setMethod] = useState("POST");
    const [response,setResponse] = useState(undefined)
    async function sendRequest() {
    try {
        const url = document.getElementById("url").value;

        let payload = null;
        if (method === "POST" || method === "PUT") {
        const raw = document.getElementById("json-format").value.trim();
        payload = raw ? JSON.parse(raw) : {};
        }

        const res = await fetch("http://localhost:3000/api/grade-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, url, payload }),
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
        if(result.detail=="Method Not Allowed"){
            setStatus(400)
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
            <MenuItem
                value="GET"
                sx={{
                color: "rgba(79, 255, 91, 1)",
                }}
            >
                <em style={{color:"rgba(79, 255, 91, 1)",fontWeight:"bold"}}>GET</em>
            </MenuItem>
            <MenuItem
                value="PUT"
                sx={{
                color: "rgba(184, 122, 251, 1)",
                }}
            >
                <em style={{color:"rgba(184, 122, 251, 1)",fontWeight:"bold"}}>PUT</em>
            </MenuItem>
            <MenuItem
                value="DELETE"
                sx={{
                color: "rgba(251, 122, 122, 1)",
                }}
            >
                <em style={{color:"rgba(251, 122, 122, 1)",fontWeight:"bold"}}>DELETE</em>
            </MenuItem>
            </Select>
            <TextField
            defaultValue="http://localhost:8080/grades"
            size="small"
            fullWidth
            id="url"
            sx={{
                width: 800,

                // input text
                "& .MuiInputBase-input": {
                color: "white",
                WebkitTextFillColor: "white",
                },

                // border
                "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
                },
            }}
            />


                <button className="send-request" onClick={sendRequest}>Send Request</button>
            </div>
            {(method==="POST" || method=="PUT") && <div className="json-body-container">
                <h1>Body</h1>
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
