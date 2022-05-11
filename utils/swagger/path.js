export default {
  "/departments": {
    get: {
      tags: ["Department"],
      summary: "Used for get all departments",
      parameters: [
        {
          $ref: "#/components/parameters/token",
        },
        {
          $ref: "#/components/parameters/nonce",
        },
        {
          $ref: "#/components/parameters/timestamp",
        },
      ],
      responses: {
        200: {
          description: "Return Technologies Name",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/DepartmentResponseList",
              },
            },
          },
        },
      },
    },
  },
  "/candidate/signup": {
    post: {
      tags: ["Candidate"],
      summary: "Used for candidate Registration",
      parameters: [
        {
          $ref: "#/components/parameters/token",
        },
        {
          $ref: "#/components/parameters/nonce",
        },
        {
          $ref: "#/components/parameters/timestamp",
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CandidateRegistrationRequest",
            },
          },
        },
      },

      responses: {
        200: {
          description: "return candidate registration status",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CandidateRegistrationResponse",
              },
            },
          },
        },
      },
    },
  },

  "/questions": {
    get: {
      tags: ["Question"],
      summary: "This is used to generate questions",
      security: [
        {
          apiAuth: [],
        },
      ],
      parameters: [
        {
          $ref: "#/components/parameters/token",
        },
        {
          $ref: "#/components/parameters/nonce",
        },
        {
          $ref: "#/components/parameters/timestamp",
        },
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      responses: {
        200: {
          description: "Return random questions fetched from database",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/QuestionResponseList",
              },
            },
          },
        },
      },
    },
  },
  "/candidate/save-answer": {
    put: {
      tags: ["Candidate"],
      summary: "save candidate answer",
      security: [
        {
          apiAuth: [],
        },
      ],
      parameters: [
        {
          $ref: "#/components/parameters/token",
        },
        {
          $ref: "#/components/parameters/nonce",
        },
        {
          $ref: "#/components/parameters/timestamp",
        },
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      // expected request body
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CandidateSaveAnswerRequest", // Input data model
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successfully saved the candidate response",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommonResponse",
              },
            },
          },
        },
      },
    },
  },
  "/candidate/save-answer-app": {
    put: {
      tags: ["Candidate"],
      summary: "save candidate answer",
      security: [
        {
          apiAuth: [],
        },
      ],
      parameters: [
        {
          $ref: "#/components/parameters/token",
        },
        {
          $ref: "#/components/parameters/nonce",
        },
        {
          $ref: "#/components/parameters/timestamp",
        },
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      // expected request body
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CandidateSaveAnswerRequestApp", // Input data model
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successfully saved the candidate response",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommonResponse",
              },
            },
          },
        },
      },
    },
  },
  "/candidate/result": {
    get: {
      tags: ["Candidate"],
      summary: "Used for get Result of user",
      security: [
        {
          apiAuth: [],
        },
      ],
      parameters: [
        {
          $ref: "#/components/parameters/token",
        },
        {
          $ref: "#/components/parameters/nonce",
        },
        {
          $ref: "#/components/parameters/timestamp",
        },
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      responses: {
        200: {
          description: "Return Result of Specific Person",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResultResponse",
              },
            },
          },
        },
      },
    },
  },
  "/check-campus/{campus_token}": {
    get: {
      tags: ["Campus Drive"],
      summary: "Used for get Campus Token is valid",
      parameters: [
        {
          $ref: "#/components/parameters/token",
        },
        {
          $ref: "#/components/parameters/nonce",
        },
        {
          $ref: "#/components/parameters/timestamp",
        },
        {
          name: "campus_token",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Return Result of Specific Person",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CampusDriveResponse",
              },
            },
          },
        },
      },
    },
  },
  "/campuses": {
    get: {
      tags: ["Campus Drive"],
      summary: "Used for get all campuses",
      parameters: [
        {
          $ref: "#/components/parameters/token",
        },
        {
          $ref: "#/components/parameters/nonce",
        },
        {
          $ref: "#/components/parameters/timestamp",
        },
      ],
      responses: {
        200: {
          description: "Return Campuses Name",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CampusResponseList",
              },
            },
          },
        },
      },
    },
  },
  "/verify-token": {
    get: {
      tags: ["Authentication"],
      summary: "Used for verifiy token",
      security: [
        {
          apiAuth: [],
        },
      ],
      parameters: [
        {
          $ref: "#/components/parameters/token",
        },
        {
          $ref: "#/components/parameters/nonce",
        },
        {
          $ref: "#/components/parameters/timestamp",
        },
        {
          $ref: "#/components/parameters/authToken",
        },
      ],
      responses: {
        200: {
          description: "Return Result of Specific Person",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommonResponse",
              },
            },
          },
        },
      },
    },
  },
 
};
