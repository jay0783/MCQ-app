export default {
  DepartmentResponseList: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "array",
            items: {
              $ref: "#/components/schemas/DepartmentResponseFields",
            },
          },
        },
      },
    ],
  },
  DepartmentResponseFields: {
    type: "object",
    properties: {
      department_uuid: {
        type: "string",
      },
      department_name: {
        type: "string",
      },
    },
  },
  QuestionResponseList: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "object",
            $ref: "#/components/schemas/QuestionResponseData",
          },
        },
      },
    ],
  },
  QuestionResponseData: {
    type: "object",
    properties: {
      total_duration: {
        type: "integer",
      },
      total_questions: {
        type: "integer",
      },
      question_list: {
        type: "array",
        items: {
          $ref: "#/components/schemas/QuestionsResponseFields",
        },
      },
    },
  },
  QuestionsResponseFields: {
    type: "object",
    properties: {
      question_uuid: {
        type: "string",
      },
      question_title: {
        type: "string",
      },
      question_options: {
        type: "array",
        items: {
          $ref: "#/components/schemas/OptionsResponseFields",
        },
      },
      question_status: {
        type: "integer",
      },
      question_option_uuid: {
        type: "string",
      },
    },
  },
  OptionsResponseFields: {
    type: "object",
    properties: {
      question_option_uuid: {
        type: "string",
      },
      option_text: {
        type: "string",
      },
    },
  },
  ResultResponse: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "object",
            $ref: "#/components/schemas/ResultResponseFields",
          },
        },
      },
    ],
  },
  ResultResponseFields: {
    type: "object",
    properties: {
      totalQuestion: {
        type: "integer",
      },
      rightAnswer: {
        type: "integer",
      },
      wrongAnswer: {
        type: "integer",
      },
      attempted: {
        type: "integer",
      },
      unattempted: {
        type: "integer",
      },
      skipped: {
        type: "integer",
      },
    },
  },
  CommonResponse: {
    type: "object",
    properties: {
      responseStatus: {
        type: "boolean",
      },
      responseCode: {
        type: "integer",
      },
      
      responseMessage: {
        type: "string",
      },
    },
  },
  CandidateSaveAnswerRequest: {
    type: "object",
    properties: {
      question_uuid: {
        type: "string",
      },
      question_option_uuid: {
        type: "string",
      },
    },
  },
  CandidateSaveAnswerRequestApp: {
    type: "array",
    items: {
      $ref: "#/components/schemas/CandidateSaveAnswerRequestFieldsApp",
    },
  },
  CandidateSaveAnswerRequestFieldsApp: {
    type: "object",
    properties: {
      question_uuid: {
        type: "string",
      },
      question_option_uuid: {
        type: "string",
      },
    },
  },
  CandidateRegistrationRequest: {
    type: "object",
    required: ["first_name", "last_name", "email", "mobile", "candidate_type"],
    properties: {
      first_name: {
        type: "string",
      },
      last_name: {
        type: "string",
      },
      email: {
        type: "string",
      },
      mobile: {
        type: "string",
      },
      candidate_type: {
        type: "integer",
      },
      experience_year: {
        type: "integer",
      },
      experience_month: {
        type: "integer",
      },
      campus_drive_uuid: {
        type: "string",
      },
      department_uuid: {
        type: "string",
      },
    },
  },
  CandidateRegistrationResponse: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "object",
            $ref: "#/components/schemas/RegistrationResponseFields",
          },
        },
      },
    ],
  },
  RegistrationResponseFields: {
    type: "object",
    properties: {
      access_token: {
        type: "string",
      },
    },
  },
  CampusDriveResponse: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "object",
            $ref: "#/components/schemas/CampusDriveResponseFields",
          },
        },
      },
    ],
  },
  CampusDriveResponseFields: {
    type: "object",
    properties: {
      campus_drive_uuid: {
        type: "string",
      },
      campus_name: {
        type: "string",
      },
    },
  },
  CampusResponseList: {
    type: "object",
    allOf: [
      {
        $ref: "#/components/schemas/CommonResponse",
      },
      {
        properties: {
          responseData: {
            type: "array",
            items: {
              $ref: "#/components/schemas/CampusResponseFields",
            },
          },
        },
      },
    ],
  },
  CampusResponseFields: {
    type: "object",
    properties: {
      campus_drive_uuid: {
        type: "string",
      },
      campus_name: {
        type: "string",
      },
    },
  },
};
