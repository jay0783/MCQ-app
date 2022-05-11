import JWT from "jsonwebtoken";
import { validationResult } from "express-validator";
import db from "../../../models/api/v1/index.js";
import Helper from "../../../helper/commonFunction.js";
import responseCode from "../../../utils/locales/responseCode.js";
import responseMessage from "../../../utils/locales/responseMessage.js";

const { candidate_exams, candidate_exam_questions, questions, question_options } = db;
class Candidate {
  async saveAnswer(req, res) {
    try {

      // Finds the validation errors in this request and wraps them in an object with handy functions
      const validationCheck = validationResult(req);

      if (!validationCheck.isEmpty()) {
        return res.status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.BAD_REQUEST,
              validationCheck.errors[0].msg
            )
          )
      }

      const Authorization = req.headers['authorization'];
      const verifyToken = JWT.verify(Authorization, `${process.env.JWT_SECRETKEY}`);
      if (verifyToken) {
        const { candidate_exam_uuid } = verifyToken;
        const { question_uuid, question_option_uuid } = req.body;

        // find the candidate exam details in candidate exam model
        const candidateExamDetails = await candidate_exams.findOne({
          attributes: ["id"],
          where: { candidate_exam_uuid: candidate_exam_uuid },
        });
        if (candidateExamDetails) {
          //find the quetion in questions table
          const questionDetails = await questions.findOne({
            attributes: ["id"],
            where: { question_uuid: question_uuid },
          });
          if (questionDetails) {

            if (question_option_uuid) {
              //find the questions option in question_options table
              const questionOptionDetails = await question_options.findOne({
                attributes: ["id"],
                where: { question_option_uuid: question_option_uuid },
              });
              var question_option_id = questionOptionDetails.id;
            }
            const question_id = questionDetails.id;
            // find the candidate exam details in candidate_exam_questions table and update the answer
            const updateAnswer = await candidate_exam_questions.update(
              {
                question_option_id: (!question_option_id) ? null : question_option_id,
                question_status: (!question_option_id) ? 2 : 1, // flag: 0 unattempt, 1 attempt, 2 skip
                updated_at: new Date().getTime(),
              },
              {
                where: {
                  candidate_exam_id: candidateExamDetails.id,
                  question_id: question_id,
                  status: 1,
                },
              }
            );
            if (updateAnswer[0] != 0) {
              return res
                .status(200)
                .send(
                  Helper.responseWithoutData(
                    true,
                    responseCode.OK,
                    responseMessage.OK
                  )
                );
            } else {
              return res
                .status(200)
                .send(
                  Helper.responseWithoutData(
                    false,
                    responseCode.INTERNAL_SERVER_ERROR,
                    responseMessage.INTERNAL_SERVER_ERROR
                  )
                );
            }
          } else {
            return res
              .status(200)
              .send(
                Helper.responseWithoutData(
                  false,
                  responseCode.NOT_FOUND,
                  responseMessage.NOT_FOUND
                )
              );
          }
        } else {
          return res
            .status(200)
            .send(
              Helper.responseWithoutData(
                false,
                responseCode.NOT_FOUND,
                responseMessage.NOT_FOUND
              )
            );
        }
      } else {
        return res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.UNAUTHORIZED,
              responseMessage.UNAUTHORIZED
            )
          );
      }
    } catch (error) {
      return res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.INTERNAL_SERVER_ERROR,
            error.message
          )
        );
    }
  }
  async saveAnswerApp(req, res) {
    try {

      // Finds the validation errors in this request and wraps them in an object with handy functions
      const validationCheck = validationResult(req);

      if (!validationCheck.isEmpty()) {
        return res.status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.BAD_REQUEST,
              validationCheck.errors[0].msg
            )
          )
      }

      const Authorization = req.headers['authorization'];
      const verifyToken = JWT.verify(Authorization, `${process.env.JWT_SECRETKEY}`);
      if (verifyToken) {
        const { candidate_exam_uuid } = verifyToken;
        // find the candidate exam details in candidate exam model
        const candidateExamDetails = await candidate_exams.findOne({
          attributes: ["id"],
          where: { candidate_exam_uuid: candidate_exam_uuid },
        });
        if (candidateExamDetails) {
          for (let i = 0; i < req.body.length; i++) {
            const { question_uuid, question_option_uuid } = req.body[i];
            //find the quetion in questions table
            const questionDetails = await questions.findOne({
              attributes: ["id"],
              where: { question_uuid: question_uuid },
            });
            if (questionDetails) {

              if (question_option_uuid) {
                //find the questions option in question_options table
                const questionOptionDetails = await question_options.findOne({
                  attributes: ["id"],
                  where: { question_option_uuid: question_option_uuid },
                });
                var question_option_id = questionOptionDetails.id;
              }
              const question_id = questionDetails.id;
              // find the candidate exam details in candidate_exam_questions table and update the answer
              const updateAnswer = await candidate_exam_questions.update(
                {
                  question_option_id: (!question_option_id) ? null : question_option_id,
                  question_status: (!question_option_id) ? 2 : 1, // flag: 0 unattempt, 1 attempt, 2 skip
                  updated_at: new Date().getTime(),
                },
                {
                  where: {
                    candidate_exam_id: candidateExamDetails.id,
                    question_id: question_id,
                    status: 1,
                  },
                }
              );
              if (updateAnswer[0] != 0) {
                if (i == (req.body.length - 1)) {
                  return res
                    .status(200)
                    .send(
                      Helper.responseWithoutData(
                        true,
                        responseCode.OK,
                        responseMessage.OK
                      )
                    );
                } else {
                  continue;
                }
              } else {
                return res
                  .status(200)
                  .send(
                    Helper.responseWithoutData(
                      false,
                      responseCode.INTERNAL_SERVER_ERROR,
                      responseMessage.INTERNAL_SERVER_ERROR
                    )
                  );
              }
            } else {
              return res
                .status(200)
                .send(
                  Helper.responseWithoutData(
                    false,
                    responseCode.NOT_FOUND,
                    responseMessage.NOT_FOUND
                  )
                );
            }
          }
        } else {
          return res
            .status(200)
            .send(
              Helper.responseWithoutData(
                false,
                responseCode.NOT_FOUND,
                responseMessage.NOT_FOUND
              )
            );
        }
      } else {
        return res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.UNAUTHORIZED,
              responseMessage.UNAUTHORIZED
            )
          );
      }
    } catch (error) {
      return res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.INTERNAL_SERVER_ERROR,
            error.message
          )
        );
    }
  }
}

export default new Candidate();
