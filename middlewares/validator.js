import { body, check } from "express-validator";
export default function validate(methodName) {
  switch (methodName) {
    case "signup": {
      return [
        body("first_name")
          .notEmpty()
          .withMessage("First name is required")
          .isLength({ min: 2, max: 30 })
          .withMessage("First Name must be min 3 and max 30 characters long")
          .isAlpha()
          .withMessage("first Name must be in Alphabetic"),

        body("last_name")
          .notEmpty()
          .withMessage("Last name is required")
          .isLength({ min: 2, max: 30 })
          .withMessage("Last Name must be min 3 and max 30 characters long")
          .isAlpha()
          .withMessage("last Name must be in Alphabetic"),

        body("email")
          .notEmpty()
          .withMessage("Email field is required")
          .isEmail()
          .withMessage("invalid Email")
          .isLength({ min: 8, max: 75 })
          .withMessage("Email length must be min 8 and more than 75"),

        body("mobile")
          .notEmpty()
          .withMessage("Mobile num field is required")
          .isMobilePhone()
          .withMessage("Mobile num must be in numeric")
          .isLength({ min: 10, max: 15 })
          .withMessage("Mobile num must be 10 characters long"),

        body("candidate_type")
          .notEmpty()
          .withMessage("candidate_type is required")
          .isInt({ gt: 0, lt: 3 })
          .withMessage("candidate type must be in 1 or 2"),
 
        body("experience_year")
          .optional({checkFalsy: true })
          .isInt({ gt: -1 })
          .withMessage("experience year must not be in minus")
          .isInt({ lt: 21 })
          .withMessage("experience year must not be more than 20"),

        body("experience_month")
          .optional({checkFalsy: true }) 
          .isInt({ gt: -1 })
          .withMessage("experience month must not be in minus")
          .isInt({ lt: 12 })
          .withMessage("experience month must not be more than 11"),
      ];
    }
    case "saveAnswer": {
      return [
        body("question_uuid")
          .notEmpty()
          .withMessage("question_uuid can't be empty"),
        body("question_uuid")
          .not()
          .isInt()
          .withMessage("question_uuid must have a string"),
        body("question_option_uuid")
          .not()
          .isInt()
          .withMessage("question_option_uuid must have a string"),
        body("question_option_uuid")
          .optional({ checkFalsy: true })
          .isString()
          .withMessage("question_option_uuid field may be empty"),
      ];
    }
    case "saveAnswerApp": {
      return [
        body().isArray(),
        body("*.question_uuid")
          .notEmpty()
          .withMessage("question_uuid can't be empty"),
        body("*.question_uuid")
          .not()
          .isInt()
          .withMessage("question_uuid must have a string"),
        body("*.question_option_uuid")
          .not()
          .isInt()
          .withMessage("question_option_uuid must have a string"),
        body("*.question_option_uuid")
          .optional({ checkFalsy: true })
          .isString()
          .withMessage("question_option_uuid field may be empty"),
      ];
    }
    default: {
      return [body("invalid Method")];
    }
  }
}
