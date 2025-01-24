<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

<h1 align="center">Task Management API</h1>

<p align="center">A NestJS-based backend application for task management with JWT authentication and Cloudinary integration.</p>

<p align="center">
  <img alt="NestJS Version" src="https://img.shields.io/badge/NestJS-8.0.0-red" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-4.0-blue" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green" />
</p>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Api Endpoint](#api-endpoint)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This is a backend application built with NestJS for managing tasks. It includes JWT authentication and integrates with Cloudinary for image uploads.

## Features

- Task management (CRUD operations)
- JWT authentication
- Cloudinary integration for image uploads
- GraphQL API

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/task-management-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd task-management-api
   ```
3. Install dependencies using npm:
   ```sh
   npm install
   ```

## Usage

1. Start the application:
   ```sh
   npm run start:dev
   ```
2. The application will be running on `http://localhost:3000`.

## Environment Variables

Create a [.env](http://_vscodecontentref_/2) file in the root directory of the project and add the following variables:

```env
DB_TYPE=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Api Endpoint

### 1. **Login**

#### A. _Request_

- **URL**: `POST /graphql`
- **GraphQL Mutation**:
  ```graphql
  mutation {
    login(
      loginInput: { email: "youremail@example.com", password: "yourpassword" }
    )
  }
  ```

#### B. _Response_

- **GraphQL Response**:
  ```graphql
  {
    "data": {
        "login": "your_token_string"
    }
  }
  ```

#### C. _Error Handling_

##### a. **Field Should Not be Empty**

- **Status Code**: 400
- **GraphQL Error Message**: `email must be an email,password should not be empty`
- **GraphQL Error Path**: `login`
- **Response**:

```graphql
  {
    "errors": [
        {
            "message": "email must be an email,password should not be empty",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "login"
            ],
            "extensions": {
                "code": "HTTP_EXCEPTION",
                "status": 400,
                "response": {
                    "message": [
                        "email must be an email",
                        "password should not be empty"
                    ],
                    "error": "Bad Request",
                    "statusCode": 400
                },
                "stacktrace": []
            }
        }
    ],
    "data": null
}
```

### 2. **Register**

#### A. _Request_

- **URL**: `POST /graphql`
- **GraphQL Mutation**:

  ```graphql
  mutation {
    register(
      registerInput: {
        username: "yourusername"
        email: "yourusername@example.com"
        password: "yourpassword"
      }
    ) {
      id
      username
      email
    }
  }
  ```

#### B. _Response_

- **GraphQL Response**:
  ```graphql
  {
    "data": {
        "register": {
            "id": 7,
            "username": "your_username",
            "email": "your_email@example.com"
        }
    }
  }
  ```

#### C. _Error Handling_

##### a. **Username or Email Already Exists**

- **Status Code**: 409
- **GraphQL Error Message**: `Username or email already exists`
- **GraphQL Error Path**: `register`
- **Response**:

```graphql
  {
    "errors": [
      {
        "message": "Username or email already exists",
        "locations": [
          {
            "line": 2,
            "column": 3
          }
        ],
        "path": [
          "register"
        ],
        "extensions": {
          "code": "CONFLICT",
          "status": 409,
          "response": {
            "message": "Username or email already exists",
            "code": "CONFLICT"
          },
          "stacktrace": []
        }
      }
    ],
    "data": null
  }
```

##### b. **Field Should Not be Empty**

- **Status Code**: 400
- **GraphQL Error Message**: `username should not be empty`
- **GraphQL Error Path**: `register`
- **Response**:

```graphql
  {
    "errors": [
        {
            "message": "username should not be empty",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "login"
            ],
            "extensions": {
                "code": "HTTP_EXCEPTION",
                "status": 400,
                "response": {
                    "message": [
                        "email must be an email",
                        "password should not be empty"
                    ],
                    "error": "Bad Request",
                    "statusCode": 400
                },
                "stacktrace": []
            }
        }
    ],
    "data": null
}
```

### 3. **Get Tasks**

#### A. _Request_

- **URL**: `POST /graphql`
- **GraphQL Query**:

  ```graphql
  query {
    getTasks(
      filterByStatus: "string"
      filterByDueDate: "date"
      search: "string"
    ) {
      id
      title
      description
      due_date
      status
      user_id
      user {
        id
        username
      }
    }
  }
  ```

#### B. _Response_

- **GraphQL Response**:

  ```graphql
  {
    "data": {
        "getTasks": [
            {
                "id": "number",
                "title": "string",
                "description": "string",
                "due_date": "date",
                "status": "string",
                "user_id": "number",
                "user": {
                    "id": "number",
                    "username": "string"
                }
            },
        ]
    }
  }
  ```

### 4. **Get Tasks By Id**

#### A. _Request_

- **URL**: `POST /graphql`
- **GraphQL Query**:

  ```graphql
  query {
    getTaskDetail(id: 1) {
      id
      title
      description
      due_date
      status
      user_id
      user {
        id
        username
      }
    }
  }
  ```

#### B. _Response_

- **GraphQL Response**:

  ```graphql
  {
    "data": {
        "getTaskDetail": {
            "id": number,
            "title": "string",
            "description": "string",
            "due_date": "string",
            "status": "string",
            "user_id": number,
            "user": {
                "id": number,
                "username": "string"
            }
        }
    }
  }
  ```

#### C. _Error Handling_

##### a. **Task not found**

- **Status Code**: 404
- **GraphQL Error Message**: `Task not found`
- **GraphQL Error Path**: `getTaskDetail`
- **Response**:

```graphql
  {
    "errors": [
        {
            "message": "Task not found",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "getTaskDetail"
            ],
            "extensions": {
                "code": "NotFoundException",
                "status": 404,
                "response": {
                    "message": "Task not found",
                    "code": "NotFoundException"
                },
                "stacktrace": []
            }
        }
    ],
    "data": null
}
```

### 5. **Create Task**

#### A. _Request_

- **URL**: `POST /graphql`
- **Request Header**:

| Header          | Tipe   | Deskripsi                       |
| --------------- | ------ | ------------------------------- |
| `Authorization` | String | Token Bearer untuk autentikasi. |

```graphql
Bearer your_string_token
```

- **GraphQL Mutation**:

  ```graphql
  mutation {
    createTask(
      taskInput: {
        title: "string"
        description: "string"
        due_date: "string"
        status: "string"
      }
    ) {
      id
      title
      description
      due_date
      status
      user_id
      user {
        id
        username
      }
    }
  }
  ```

#### B. _Response_

- **GraphQL Response**:

  ```graphql
  {
    "data": {
        "createTask": {
            "id": number,
            "title": "string",
            "description": "string",
            "due_date": "string",
            "status": "string",
            "user_id": number,
            "user": {
                "id": number,
                "username": "string"
            }
        }
    }
  }
  ```

#### C. _Error Handling_

##### a. **Field Should Not be Empty**

- **Status Code**: 400
- **GraphQL Error Message**: `title should not be empty,description should not be empty,due_date should not be empty`
- **GraphQL Error Path**: `createTask`
- **Response**:

```graphql
  {
    "errors": [
        {
            "message": "title should not be empty,description should not be empty,due_date should not be empty",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "createTask"
            ],
            "extensions": {
                "code": "HTTP_EXCEPTION",
                "status": 400,
                "response": {
                    "message": [
                        "title should not be empty",
                        "description should not be empty",
                        "due_date should not be empty"
                    ],
                    "error": "Bad Request",
                    "statusCode": 400
                },
                "stacktrace": []
            }
        }
    ],
    "data": null
}
```

### 6. **Update Task**

#### A. _Request_

- **URL**: `POST /graphql`
- **Request Header**:

| Header          | Tipe   | Deskripsi                       |
| --------------- | ------ | ------------------------------- |
| `Authorization` | String | Token Bearer untuk autentikasi. |

```graphql
Bearer your_string_token
```

- **GraphQL Mutation**:

  ```graphql
  mutation {
    updateTask(
      id: number
      taskUpdate: {
        title: "string"
        description: "string",
        "due_date": "string"
        status: "string"
      }
    ) {
      id
      title
      description
      due_date
      status
    }
  }
  ```

#### B. _Response_

- **GraphQL Response**:

  ```graphql
  {
    "data": {
        "updateTask": {
            "id": number,
            "title": "string",
            "description": "string",
            "due_date": "string",
            "status": "string"
        }
    }
  }
  ```

#### C. _Error Handling_

##### a. **Task not found or you are not authorized to update this task**

- **Status Code**: 404
- **GraphQL Error Message**: `Task not found or you are not authorized to update this task`
- **GraphQL Error Path**: `updateTask`
- **Response**:

```graphql
  {
    "errors": [
        {
            "message": "Task not found or you are not authorized to update this task",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "updateTask"
            ],
            "extensions": {
                "code": "NotFoundException",
                "status": 404,
                "response": {
                    "message": "Task not found or you are not authorized to update this task",
                    "code": "NotFoundException"
                },
                "stacktrace": []
            }
        }
    ],
    "data": null
}
```

### 7. **Delete Task**

#### A. _Request_

- **URL**: `POST /graphql`
- **Request Header**:

| Header          | Tipe   | Deskripsi                       |
| --------------- | ------ | ------------------------------- |
| `Authorization` | String | Token Bearer untuk autentikasi. |

```graphql
Bearer your_string_token
```

- **GraphQL Mutation**:

  ```graphql
  mutation {
    deleteTask(id: number) {
      title
      description
      due_date
      status
      user_id
    }
  }
  ```

#### B. _Response_

- **GraphQL Response**:

  ```graphql
  {
    "data": {
        "deleteTask": {
            "title": "string",
            "description": "string",
            "due_date": "string",
            "status": "string",
            "user_id": 6
        }
    }
  }
  ```

#### C. _Error Handling_

##### a. **Task not found or you are not authorized to update this task**

- **Status Code**: 404
- **GraphQL Error Message**: `Task not found or you are not authorized to update this task`
- **GraphQL Error Path**: `deleteTask`
- **Response**:

```graphql
  {
    "errors": [
        {
            "message": "Task not found or you are not authorized to update this task",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "deleteTask"
            ],
            "extensions": {
                "code": "NotFoundException",
                "status": 404,
                "response": {
                    "message": "Task not found or you are not authorized to update this task",
                    "code": "NotFoundException"
                },
                "stacktrace": []
            }
        }
    ],
    "data": null
}
```

### 8. **General Error Message**

#### A. _Error Handling_

##### a. **Invalid or expired token**

- **Status Code**: 400
- **GraphQL Error Message**: `Invalid or expired token`
- **GraphQL Error Path**: `createTask, updateTask, deleteTask, uploadFile`
- **Response**:

```graphql
  {
    "errors": [
        {
            "message": "Invalid or expired token",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "deleteTask"
            ],
            "extensions": {
                "code": "BadRequest",
                "status": 400,
                "response": {
                    "message": "Invalid or expired token",
                    "code": "BadRequest"
                },
                "stacktrace": []
            }
        }
    ],
    "data": null
}
```

##### a. **Token not provided**

- **Status Code**: 400
- **GraphQL Error Message**: `Token not provided`
- **GraphQL Error Path**: `createTask, updateTask, deleteTask, uploadFile`
- **Response**:

```graphql
  {
    "errors": [
        {
            "message": "Token not provided",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "deleteTask"
            ],
            "extensions": {
                "code": "NotFoundException",
                "status": 404,
                "response": {
                    "message": "Token not provided",
                    "code": "NotFoundException"
                },
                "stacktrace": []
            }
        }
    ],
    "data": null
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

```

```

## Assumptions Made During Development

1. **User Authentication and Authorization**

```graphql
Assumption: Users accessing the API are authenticated.
User authentication is implemented using a middleware such as JWT,
but the exact implementation may vary depending on the project's scope.
```

2. Database Setup

```graphql
   Assumption: The database (MySQL) is already set up and accessible.
   Environment variables for database connection
   (e.g., DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
   are correctly configured in a .env file.
```

3. Task Ownership

```graphql
 Assumption: Each task is associated with a specific user, and only the task owner can access or modify their tasks.
```

4. Validation Rules

```graphql
 Assumption: Data validation is performed for all inputs using a library (e.g., class-validator).
 Invalid data will be rejected with clear error messages before processing.
```

5. Task Filtering

```graphql
 Assumption: Filtering tasks by status and dueDate is optional.
 If no filter is provided, the API will return all tasks created by the user.
```

6. File Attachments (Optional Feature)

```graphql
 Assumption: If file attachment functionality is implemented,
 file uploads will be limited to specific formats (e.g., PDF, PNG, JPG)
 and a maximum file size of 5 MB.
```

7. Date and Time FormattingAssumption:

```graphql
 All dates and times are handled in UTC format for consistency,
 and users are responsible for converting them to their local timezone if needed.
```

8. Error Handling

```graphql
 Assumption: All errors are managed gracefully with appropriate GraphQL error responses,
 and no sensitive information is leaked to the client.
```

9. Task Status Enum

```graphql
 Assumption: The status field in tasks is limited to predefined values:
 "pending", "in progress", and "completed".
 Any other status will be considered invalid.
```

11. Search Feature

```graphql
  Assumption: The optional search feature supports searching tasks by title and description, using a basic text-matching approach.
```
