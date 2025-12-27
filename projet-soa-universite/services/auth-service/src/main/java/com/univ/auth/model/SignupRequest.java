package com.univ.auth.model;
public class SignupRequest{
    private String name;
    private String prename;
    private String username;
    private String section;
    private String phone;
    private String email;
    private String password;
    private String sector;
    private String role;
    public SignupRequest(){}
    public SignupRequest(String name,String prename,
    String username,String section,String phone,String email,String password,
    String role,String sector){
                this.name=name;
                this.prename=prename;
                this.username=username;
                this.section=section;
                this.phone=phone;
                this.email=email;
                this.password=password;
                this.role=role;
                this.sector=sector;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrename() {
        return prename;
    }

    public void setPrename(String prename) {
        this.prename = prename;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
