package com.employee;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;




@SpringBootApplication

public class EmployeeManagementBackendApplication {
	private static final Logger log = LoggerFactory.getLogger(EmployeeManagementBackendApplication.class);

	public static void main(String[] args) {
		log.info("EmployeeManagementBackendApplication started : ");
		SpringApplication.run(EmployeeManagementBackendApplication.class, args);
	}

}
