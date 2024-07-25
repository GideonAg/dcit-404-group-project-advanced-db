package com.redeemerlives.advanced_database_project.repository;

import com.redeemerlives.advanced_database_project.entity.Employee;
import jakarta.persistence.ParameterMode;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import java.util.ArrayList;
import java.util.List;

@Repository
public class EmployeeRepositoryImpl implements EmployeeRepositoryCustom  {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Employee> getAllEmployees() {
        List<Employee> employees = new ArrayList<>();

        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("get_all_employees");
        query.registerStoredProcedureParameter(1, void.class, ParameterMode.REF_CURSOR);
        query.execute();

        List<Object[]> resultSet = query.getResultList();
        for (Object[] result : resultSet) {
            Employee employee = new Employee();
            employee.setEmployeeNo(((Number) result[0]).longValue());
            employee.setFirstName((String) result[1]);
            employee.setLastName((String) result[2]);
            employee.setPosition((String) result[3]);
            employees.add(employee);
        }
        return employees;
    }

    @Override
    public Employee getEmployee(Long employeeNo) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("get_employee");
        query.registerStoredProcedureParameter(1, Long.class, ParameterMode.IN);
        query.registerStoredProcedureParameter(2, void.class, ParameterMode.REF_CURSOR);
        query.setParameter(1, employeeNo);
        query.execute();

        Object[] result = (Object[]) query.getSingleResult();
        Employee employee = new Employee();
        employee.setEmployeeNo(((Number) result[0]).longValue());
        employee.setFirstName((String) result[1]);
        employee.setLastName((String) result[2]);
        employee.setPosition((String) result[3]);

        return employee;
    }

    @Override
    public void updateEmployee(Long employeeNo, String firstName, String lastName, String position) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("update_employee");
        query.registerStoredProcedureParameter(1, Long.class, ParameterMode.IN);
        query.registerStoredProcedureParameter(2, String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter(3, String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter(4, String.class, ParameterMode.IN);
        query.setParameter(1, employeeNo);
        query.setParameter(2, firstName);
        query.setParameter(3, lastName);
        query.setParameter(4, position);
        query.execute();
    }
}
