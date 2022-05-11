import express from "express";

import candidateController from "../../../controllers/api/v1/candidateController.js";
import candidateExam from "../../../controllers/api/v1/candidateExam.js";
import departmentController from "../../../controllers/api/v1/departmentController.js";
import categoriesController from "../../../controllers/api/v1/categoriesController.js";
import questionController from "../../../controllers/api/v1/questionController.js";
import candidateAnswercontroller from "../../../controllers/api/v1/candidateAnswerController.js";
import campusdrive from "../../../controllers/api/v1/campusdrive.js";
import campusController from "../../../controllers/api/v1/campusController.js";
import validationtoken from "../../../controllers/api/v1/validateJWTToken.js"

import validator from "../../../middlewares/validator.js";

// import candidateResult from "./candidateResult.js";
import auth from "../../../middlewares/auth.js";

/**
 * Candidate Api routing
 */
const router = express.Router();
router.use(auth.validateApiKey);

router.get("/departments", departmentController.departments);
router.get("/campuses", campusController.campuses);
router.get("/check-campus/:campus_token", campusdrive.getcampusdrive);
router.post(
  "/candidate/signup",
  validator("signup"),
  candidateController.signup
);
router.put(
  "/candidate/save-answer",
  validator("saveAnswer"),
  candidateAnswercontroller.saveAnswer
);
router.put(
  "/candidate/save-answer-app",
  validator("saveAnswerApp"),
  candidateAnswercontroller.saveAnswerApp
);

router.get("/verify-token", validationtoken.verifyjwtToken);
router.use(auth.verifyjwtToken);

router.get("/questions", questionController.getRandomQuestionsByCategory);
router.get("/candidate/result", candidateExam.getCandidateResult);


// route.use("/candidate", candidateRouter);
// route.use("/candidateresult", candidateResult);
// route.use("/question", questions);
// route.use("/departments", departments);
export default router;
