# CuentasClaras Angular
>(Proyecto presentado y aprobado por la catedra de Taller de Tecnologias de Produccion de Software Opcion Java)

CuentasClaras is a financial management application, this frontend was developed using Angular. It helps users manage personal or shared expenses by allowing them to track, split, and settle group costs efficiently. This project leverages a RESTful backend API, providing endpoints for user registration, group management, and expense tracking.
## Features

 * User Authentication: Allows users to securely register and log in.
 * Group Management: Users can create and manage groups to track shared expenses.
 * Expense Tracking: Add expenses to a group and automatically calculate split amounts.
 * Expense Summary: View detailed summaries of group expenses, including who owes whom.
 * Responsive Design: A mobile-friendly, responsive interface that works across all device types.

## Prerequisites

* Node.js (>= 14.x.x)
* npm or yarn
* Angular CLI

## Getting Started

  1- Clone the repository:
```
git clone https://github.com/clovergreen24/CCAngular.git
cd CCAngular
```
2- Install dependencies:
```
npm install
```
3- Set up the environment variables:
Create an environment.ts file under the src/environments folder to set the API URL for the backend.
```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```
4- Run the development server:
```
ng serve
```
Open your browser at http://localhost:4200 to view the app.
## Technologies Used

* Angular: Front-end framework for building single-page applications.
* TypeScript: For static typing and better code maintainability.
* Angular Router: For client-side routing.
* HTTPClient: For handling HTTP requests to the backend API.
* Bootstrap: For styling and responsive design.
## API Integration

The app communicates with a [backend REST API (built with Spring Boot)](https://github.com/Manaaa22/CuentasClarasSpring/blob/main/README.md) to manage users, groups, and expenses. The backend handles authentication, expense logic, and group management.
