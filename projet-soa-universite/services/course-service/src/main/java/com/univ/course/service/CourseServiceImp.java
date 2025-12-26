package com.univ.course.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jws.WebService;

import com.univ.course.model.Course;

@WebService(
        serviceName = "CourseService",
        portName = "CourseServicePort",
        endpointInterface = "com.univ.course.service.CourseService"
)
public class CourseServiceImp implements CourseService {

    private static final Map<String, Course> courses = new HashMap<>();

    static {
        courses.put("GL101",
                new Course("GL101", "Intro Génie Logiciel", 4, "Dr. Feki", "Lun 10:00-12:00"));
        courses.put("SI201",
                new Course("SI201", "Systèmes d'Information", 3, "Pr. X", "Mar 14:00-16:00"));
    }

    @Override
    public Course getCourseByCode(String code) {
        return courses.get(code);
    }

    @Override
    public List<Course> getAllCourses() {
        return new ArrayList<>(courses.values());
    }

    @Override
    public boolean addCourse(Course course) {
        if (course == null || course.getCode() == null) return false;
        if (courses.containsKey(course.getCode())) return false;
        courses.put(course.getCode(), course);
        return true;
    }

    @Override
    public boolean updateCourse(Course course) {
        if (course == null || course.getCode() == null) return false;
        if (!courses.containsKey(course.getCode())) return false;
        courses.put(course.getCode(), course);
        return true;
    }

    @Override
    public boolean deleteCourse(String code) {
        return courses.remove(code) != null;
    }
}
