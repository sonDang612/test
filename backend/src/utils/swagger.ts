import swaggerJsdoc from "swagger-jsdoc";

// Swagger definition
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "A simple Express API to manage users",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["userName", "password", "fullName", "role"],
          properties: {
            id: {
              type: "string",
              description: "User ID",
            },
            userName: {
              type: "string",
              description: "User's username",
            },
            password: {
              type: "string",
              description: "User's password (hashed)",
            },
            fullName: {
              type: "string",
              description: "User's full name",
            },
            role: {
              type: "string",
              description: "User's role",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["userName", "password"],
          properties: {
            userName: {
              type: "string",
              description: "User's username",
            },
            password: {
              type: "string",
              description: "User's password",
            },
          },
        },
        SignupRequest: {
          type: "object",
          required: ["userName", "password", "fullName", "role"],
          properties: {
            userName: {
              type: "string",
              description: "User's username",
            },
            password: {
              type: "string",
              description: "User's password",
            },
            fullName: {
              type: "string",
              description: "User's full name",
            },
            role: {
              type: "string",
              description: "User's role (user / admin) which is can be empty",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "JWT authentication token",
            },
            userName: {
              type: "string",
              description: "User's username",
            },
            statusCode: {
              type: "integer",
              description: "HTTP status code",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            status: {
              type: "string",
              description: "Error status",
            },
            error: {
              type: "object",
              properties: {
                statusCode: {
                  type: "integer",
                  description: "HTTP status code",
                },
                status: {
                  type: "string",
                  description: "HTTP status message",
                },
                isOperational: {
                  type: "boolean",
                  description: "HTTP operation",
                },
              },
            },
            message: {
              type: "string",
              description: "Error message",
            },
            stack: {
              type: "string",
              description: "Stack's message",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      "/users/login": {
        post: {
          tags: ["Authentication"],
          summary: "User login",
          description: "Authenticates a user and returns a JWT token",
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginRequest",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "User logged in successfully!",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: {
                        type: "string",
                        example: "success",
                      },
                      token: {
                        type: "string",
                        example:
                          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzQ0MDMyNzU4LCJleHAiOjE3NDQwMzYzNTh9.6aTY-OO_5Njl1VGjaJ0SZqSvUqgbcEcDIgS3wp5vgVg",
                      },
                      data: {
                        type: "object",
                        properties: {
                          user: {
                            type: "object",
                            properties: {
                              userName: {
                                type: "string",
                              },
                              fullName: {
                                type: "string",
                              },
                              role: {
                                type: "string",
                              },
                              id: {
                                type: "number",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad request - missing username or password",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
            "401": {
              description:
                "Unauthorized - incorrect credentials or user already logged in",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
      },
      "/users/signup": {
        post: {
          tags: ["Authentication"],
          summary: "User signup",
          description: "Registers a new user and returns a JWT token",
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SignupRequest",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Create user successfully!",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: {
                        type: "string",
                        example: "success",
                      },
                      token: {
                        type: "string",
                        example:
                          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzQ0MDMyNzU4LCJleHAiOjE3NDQwMzYzNTh9.6aTY-OO_5Njl1VGjaJ0SZqSvUqgbcEcDIgS3wp5vgVg",
                      },
                      data: {
                        type: "object",
                        properties: {
                          user: {
                            type: "object",
                            properties: {
                              userName: {
                                type: "string",
                              },
                              fullName: {
                                type: "string",
                              },
                              role: {
                                type: "string",
                              },
                              id: {
                                type: "number",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad request - missing required information",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
      },
      "/users/logout": {
        post: {
          tags: ["Authentication"],
          summary: "User logout",
          description: "Logs out the currently authenticated user",
          responses: {
            "200": {
              description: "User logged out successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Logout successfully!",
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized - user not authenticated",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
      },
      "/users/info": {
        get: {
          tags: ["User"],
          summary: "Get user information",
          description: "Retrieves the details of the authenticated user",
          responses: {
            "200": {
              description: "User information retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "User details",
                      },
                      data: {
                        type: "object",
                        properties: {
                          user: {
                            type: "object",
                            properties: {
                              userName: {
                                type: "string",
                              },
                              fullName: {
                                type: "string",
                              },
                              role: {
                                type: "string",
                              },
                              id: {
                                type: "number",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized - user not authenticated",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
      },
      "/users": {
        get: {
          tags: ["User"],
          summary: "[ADMIN] - Get active users",
          description: "Retrieves actives data of user on the system",
          responses: {
            "200": {
              description: "List Active Users",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "User details",
                      },
                      data: {
                        type: "object",
                        properties: {
                          users: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "integer",
                                },
                                userName: {
                                  type: "string",
                                },
                                fullName: {
                                  type: "string",
                                },
                                role: {
                                  type: "string",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized - user not authenticated",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  // Path to the API docs
  // Note: Update this path to match your project structure
  apis: [
    "./src/controllers/*.controller.ts",
    "./src/routes/*.routes.ts",
    "./src/entities/mssql/*.entity.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, options };
