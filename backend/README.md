# Project Setup Guide

This document provides instructions for setting up and running the project in different environments.

## Prerequisites

- Node.js (version 20 or higher)
- Yarn package manager
- Docker and Docker Compose

## Getting Started

### Step 1: Start Docker Container

Run the following command to start the MSSQL, Redis, Mongo Docker containers:

```bash
yarn docker
```

This command will:

- Build and start the SQL Server, MongoDB, and Redis containers
- Run initialization scripts to create the database and tables
- Insert sample data into the tables

> **Important**: Wait approximately 15 seconds after the container starts to ensure that database initialization is complete.

### Step 2: Start the Application

#### Development Environment

To run the application in development mode:

```bash
yarn dev
```

In development mode:

- The application will provide detailed error messages
- Changes to code will be automatically detected and applied
- Debugging information will be more verbose

#### Production Environment

To run the application in production mode:

```bash
yarn start
```

In production mode:

- Error messages will be simplified for security reasons
- Performance will be optimized
- Debugging information will be limited

## API Documentation

API documentation is available at:

- http://localhost:3000/api-docs

## SQL Configuration

The SQL Server instance is configured with:

- Username: sa
- Password: Admin@123
- Database: cc_db_dev
- Default port: 4000

## Mongo Configuration

The Mongo Server instance is configured with:

- URI: mongodb://mongo:Admin123@localhost:4001/cc_db_dev_nosql?authSource=admin

## Redis Configuration

The Redis Server instance is configured with:

- URI: redis://:Admin123@localhost:4002

## Test Accounts

The following test accounts are available for testing the application:

| Username | Password | Role  |
| -------- | -------- | ----- |
| admin    | 1        | admin |
| user1    | 1        | user  |
| user2    | 1        | user  |

You can use these accounts to test different permission levels in the application.
