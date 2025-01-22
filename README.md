# Full Stack Web Application

This repository contains my **Software Engineering Capstone Project**, a Full Stack web application built using **React** and **Java Spring Boot**. It was deployed on **AWS** using **S3** for image storage, **RDS** for the database, and a **Dockerized application** deployed to **Elastic Beanstalk**.

---

## Access the Application
You can access the live application here:  
[**Main Avenue Books**](https://mainavebooks.com/)

---

## What This Application Includes

### Frontend
- Built with **React**.
- Implemented reusable components, form validations, and a responsive design.
- Managed state using React hooks.

### Backend
- Developed RESTful APIs using **Spring Boot**.
- Used **Spring Security** for authentication and authorization.
  - Included **JWT tokens** for secure access.
- Integrated **Okta** for user login and authentication, using **OAuth 2.0** and **OIDC** for secure token-based access.
- Connected the application to a **MySQL database** via **Spring Data JPA**.

### Deployment
- Deployed the application to **AWS**:
  - **S3**: For static file and image storage.
  - **RDS**: For database hosting.
  - **Elastic Beanstalk**: For deploying the backend via a Docker container.

---

## Features
- User registration, login, and role-based access control.
- Secure endpoints protected by **JWT authentication**.
- REST APIs for CRUD operations.
- Image upload and management stored in **S3**.
- Database integration with **MySQL** hosted on **AWS RDS**.
- Deployed using **Docker** and **Elastic Beanstalk**.

---

## Technologies Used
- **Frontend**: React, React Router, TypeScript, Bootstrap
- **Backend**: Java Spring Boot, Spring Security, Spring Data JPA
- **Database**: MySQL
- **Cloud**: AWS S3, AWS RDS, Elastic Beanstalk
- **Containerization**: Docker
- **Tools**: IntelliJ IDEA, Visual Studio Code, Maven, npm
