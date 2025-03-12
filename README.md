# Task Management System

## Overview
The Task Management System allows users to create, update, delete, and view tasks. It is built with Angular using NgRx for state management,
while the backend is developed as microservices in .NET using ASP.NET Core Web API for communication. Swagger is used for API testing.

### Features
* Frontend (Angular + NgRx)
Task Management State: Actions, reducers, and selectors for handling tasks.
User Interface: Display tasks in a list with add, edit, and delete functionality.
HTTP Communication: API services to interact with the backend.

### Backend (.NET Microservices)
* Task Microservice: CRUD operations for tasks.
* User Microservice: CRUD operations for users.
** Swagger Integration: API testing and documentation.

#### Technologies Used
Frontend: Angular, TypeScript, NgRx (Store, Effects, Reducers, Selectors)
Backend: ASP.NET Core Web API, C#, Entity Framework 
Database: SQL Server 
API Testing: Swagger
