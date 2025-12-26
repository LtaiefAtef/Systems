package com.univ.course.model;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "course")
public class Course implements Serializable {

    private String code;
    private String title;
    private int credits;
    private String teacher;
    private String schedule;

    public Course() {
    }

    public Course(String code, String title, int credits, String teacher, String schedule) {
        this.code = code;
        this.title = title;
        this.credits = credits;
        this.teacher = teacher;
        this.schedule = schedule;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }
}