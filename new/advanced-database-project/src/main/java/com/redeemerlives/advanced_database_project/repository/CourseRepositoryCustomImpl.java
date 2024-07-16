package com.redeemerlives.advanced_database_project.repository;

import com.redeemerlives.advanced_database_project.entity.Course;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Time;

@Repository
@RequiredArgsConstructor
public class CourseRepositoryCustomImpl implements CourseRepositoryCustom {

    private final EntityManager entityManager;

    @Override
    public Course getCourseByIdUsingCursor(Long courseNo) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GET_COURSE_BY_ID_CURSOR")
                .registerStoredProcedureParameter(1, Long.class, ParameterMode.IN)
                .registerStoredProcedureParameter(2, void.class, ParameterMode.REF_CURSOR)
                .setParameter(1, courseNo);

        query.execute();

        Object[] result = (Object[]) query.getSingleResult();

        if (result == null) {
            return null;
        }

        Course course = new Course();
        course.setCourseName((String) result[0]);
        course.setCourseDescription((String) result[1]);
        course.setStartDate(((Date) result[2]).toLocalDate());
        course.setEndDate(((Date) result[3]).toLocalDate());
        course.setStartTime(((Time) result[4]).toLocalTime());
        course.setEndTime(((Time) result[5]).toLocalTime());
        course.setMaxDelegates((Integer) result[6]);
        course.setConfirmed((Boolean) result[7]);

        return course;
    }

    @Override
    public void updateCourse(Course course) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("UPDATE_COURSE")
                .registerStoredProcedureParameter(1, Long.class, ParameterMode.IN)
                .registerStoredProcedureParameter(2, String.class, ParameterMode.IN)
                .registerStoredProcedureParameter(3, String.class, ParameterMode.IN)
                .registerStoredProcedureParameter(4, Date.class, ParameterMode.IN)
                .registerStoredProcedureParameter(5, Date.class, ParameterMode.IN)
                .registerStoredProcedureParameter(6, Time.class, ParameterMode.IN)
                .registerStoredProcedureParameter(7, Time.class, ParameterMode.IN)
                .registerStoredProcedureParameter(8, Integer.class, ParameterMode.IN)
                .registerStoredProcedureParameter(9, Boolean.class, ParameterMode.IN)
                .setParameter(1, course.getCourseNo())
                .setParameter(2, course.getCourseName())
                .setParameter(3, course.getCourseDescription())
                .setParameter(4, course.getStartDate())
                .setParameter(5, course.getEndDate())
                .setParameter(6, course.getStartTime())
                .setParameter(7, course.getEndTime())
                .setParameter(8, course.getMaxDelegates())
                .setParameter(9, course.getConfirmed());

        query.execute();
    }
}
