package com.employee.service;

import com.employee.dto.EmployeeDTO;
import com.employee.entity.Employee;
import com.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService{


    EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public String addEmployee(EmployeeDTO employeeDTO) {
       Optional<Employee> emp= employeeRepository.findByName(employeeDTO.getName());
        if(emp.isPresent()){
            throw new RuntimeException("Employee with same name Already Exists");
        }
        Employee employee=new Employee();
        employee.setAddress(employeeDTO.getAddress());
        employee.setName(employeeDTO.getName());
         employeeRepository.save(employee);
        return "Employee Created!!!";
    }

    @Override
    public Employee getEmployee(String name) {
        Optional<Employee> emp= employeeRepository.findByName(name);
        if(emp.isEmpty()){
            throw new RuntimeException("No One Available !!!");
        }
        return emp.get();
    }

    @Override
    public String deleteEmployee(String name) {
        Optional<Employee> emp= employeeRepository.findByName(name);
        if(emp.isEmpty()){
            throw new RuntimeException("No One Available !!!");
        }
       employeeRepository.delete(emp.get());
        return "Employee with name {} deleted "+name;
    }

    @Override
    public List<Employee> getAllEmployees() {
        List<Employee> all = employeeRepository.findAll();
        if(!all.isEmpty()){
            return all;
        }
        return null;
    }

    @Override
    public Employee updateEmployee(int id, EmployeeDTO employeeDTO) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if(employee.isEmpty()){
            throw new RuntimeException("No One Available !!!");
        }
        else{
            Employee emp=employee.get();
            emp.setName(employeeDTO.getName());
            emp.setAddress(employeeDTO.getAddress());
            employeeRepository.save(emp);
            return emp;
        }

    }


}
