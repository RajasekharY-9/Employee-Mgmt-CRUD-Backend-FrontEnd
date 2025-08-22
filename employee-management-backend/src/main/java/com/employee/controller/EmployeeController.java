package com.employee.controller;


import com.employee.dto.EmployeeDTO;
import com.employee.entity.Employee;
import com.employee.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private static final Logger log= LoggerFactory.getLogger(EmployeeController.class);
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<String> addEmployee(@RequestBody EmployeeDTO employeeDTO) {
        log.info("Adding employee: {}", employeeDTO.getName());
        String response = employeeService.addEmployee(employeeDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Employee> getEmployee(@PathVariable String name) {
        log.info("Fetching employee with name: {}", name);
        Employee employee = employeeService.getEmployee(name);
        return ResponseEntity.ok(employee);
    }

    @GetMapping
    public ResponseEntity<?> getAllEmployees() {
        log.info("Fetching all employees");
        List<Employee> employees = employeeService.getAllEmployees();

        if (employees==null) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }


        return ResponseEntity.ok(employees);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable int id, @RequestBody EmployeeDTO employeeDTO) {
        log.info("Updating employee with id: {}", id);
        Employee updated = employeeService.updateEmployee(id, employeeDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String name) {
        log.info("Deleting employee with name: {}", name);
        String response = employeeService.deleteEmployee(name);
        return ResponseEntity.ok(response);
    }
}
