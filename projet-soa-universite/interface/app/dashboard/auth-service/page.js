"use client"
import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

export default function AuthServicePage(params) {
    const [send,setSend] = useState("Send Request")
    const [response,setResponse] = useState("");
    const [status,setStatus] = useState("");
    async function login(){
        let text = JSON.stringify(JSON.parse(document.getElementById("json-format").value))
        const res = await fetch("http://localhost:3000/api/auth/login",
            {
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body:text
            }
        ).catch((e)=>{console.log(e)})
        setStatus(res.status);
        const result = await res.text()
        setResponse(result);
    }

    return <>
        <fieldset className="auth-request">
            <legend>Manage Requests</legend>
            <div className="request-container">
                 <Select
            defaultValue="POST"
            size="small"
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
                color: "rgba(193, 255, 79, 1)",
                }}
            >
                <em style={{color:"rgba(193, 255, 79, 1)",fontWeight:"bold"}}>POST</em>
            </MenuItem>
            </Select>
<TextField
  value="http://localhost:8080/auth/login"
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

                <button className="send-request" onClick={login}>{send}</button>
            </div>
            <div className="json-body-container">
                <h1>Body</h1>
                <textarea id="json-format">
                    
                </textarea>
            </div>
            <div className="json-response-container">
                <h1>Response <span className={status == 200? "OK":status==403?"Forbidden":""}>{status == 200? "OK":status==403?"Forbidden":""}</span></h1>
                <textarea className="json-response" value={response} disabled></textarea>
            </div>
        </fieldset>
    </>
};
