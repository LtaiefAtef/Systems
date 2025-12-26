package com.univ.course.service;

import com.univ.course.model.Course;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import java.util.List;

@WebService(name = "CourseService")
public interface CourseService {

    @WebMethod
    Course getCourseByCode(@WebParam(name = "code") String code);

    @WebMethod
    List<Course> getAllCourses();

    @WebMethod
    boolean addCourse(@WebParam(name = "course") Course course);

    @WebMethod
    boolean updateCourse(@WebParam(name = "course") Course course);

    @WebMethod
    boolean deleteCourse(@WebParam(name = "code") String code);
}
