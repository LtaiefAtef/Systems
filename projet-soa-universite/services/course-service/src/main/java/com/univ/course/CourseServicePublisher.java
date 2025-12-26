package com.univ.course;

import com.univ.course.service.CourseServiceImp;

import javax.xml.ws.Endpoint;

public class CourseServicePublisher {
    public static void main(String[] args) {
        String url = "http://0.0.0.0:8083/CourseService";
        Endpoint.publish(url, new CourseServiceImp());
        System.out.println("CourseService running at " + url + "?wsdl");
    }
}
