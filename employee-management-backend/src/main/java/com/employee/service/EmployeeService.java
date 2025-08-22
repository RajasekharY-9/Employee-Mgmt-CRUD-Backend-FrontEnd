package com.employee.service;

import com.employee.dto.EmployeeDTO;
import com.employee.entity.Employee;

import java.util.List;

public interface EmployeeService {
    String addEmployee(EmployeeDTO employeeDTO);

    Employee getEmployee(String name);

    String deleteEmployee(String name);

    List<Employee> getAllEmployees();

    Employee updateEmployee(int id,EmployeeDTO employeeDTO);

}
