package com.univ.auth.model;
public class LoginRequest{
    private String username;
    private String password;
    private String[] roles;
    public LoginRequest(){}
    public LoginRequest(String u , String p, String[] r){
        this.username=u;
        this.password=p;
        this.roles=r;
    }
    public String getUsername(){
      return this.username;
    }
    public void setUsername(String u ){
        this.username=u;
    }
    public String getPassword(){
        return this.password;
    }
    public void setPassword(String p ){
        this.password=p;
    }
    public String[] getRoles(){
        return this.roles;
    }
    public void setRoles(String[] r ){
        this.roles=r;
    }
}