# Employee Management CRUD Application

This project demonstrates a **Spring Boot + React.js** CRUD application with **Spring Security (basic auth)** and **Swagger UI** integration.

---

## Backend (Spring Boot)

### Features
- Employee CRUD (Create, Read, Update, Delete)
- H2 in-memory database
- Spring Security (Basic Authentication)
- Swagger UI documentation

### How to Run
1. Clone the repository
  
   git clone <your-repo-url>
   cd backend


2. Build and run

   mvn spring-boot:run

3. Access:

   * API Swagger: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
   * H2 Console: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

### Credentials

* **Username:** `admin`
* **Password:** `admin123`

These credentials are configured in the `application.properties` file.

---

## Frontend (React)

### Features

* Login form with basic authentication
* Employee CRUD operations (list, add, update, delete)

### How to Run

1. Go to frontend folder:


   cd frontend

2. Install dependencies:


   npm install

3. Run the app:


   npm start
 
4. Open [http://localhost:3000](http://localhost:3000)

### Login Credentials

Use the same as backend:

* **Username:** `admin`
* **Password:** `admin123`

---

## API Endpoints

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | /employees      | Get all employees  |
| GET    | /employees/{id} | Get employee by id |
| POST   | /employees      | Add new employee   |
| PUT    | /employees/{id} | Update employee    |
| DELETE | /employees/{id} | Delete employee    |

---

## Implementation Summary

* **Backend**

  * Built with Spring Boot
  * `Employee` entity, repository, and controller
  * Spring Security for basic auth
  * Swagger (springdoc-openapi) for API docs

* **Frontend**

  * React with Axios for API calls
  * Login form
  * CRUD operations UI

---

## Notes

* Both frontend and backend should be running together.
* Make sure backend runs on `8080` and frontend on `3000`.
* If ports differ, update `axios` base URL in frontend.



