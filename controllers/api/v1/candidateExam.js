import db from '../../../models/api/v1/index.js'
import helper from '../../../helper/commonFunction.js'
import responseMessage from '../../../utils/locales/responseMessage.js'
import responseCode from '../../../utils/locales/responseCode.js'
import QueryTypes from '@sequelize/core'
import SettingHelper from "../../../helper/setting.js"

const sequelize = db.sequelize
const question_options = db.question_options
const candidateExams = db.candidate_exams
const candidate_exam_questions = db.candidate_exam_questions
const candidate = db.candidate

class Result {
  async getCandidateResult (req, res) {
    try {
      /**
       * candidate_exam_uuid from Token
       */

      const candidateExamUuid = req.token_payload.candidate_exam_uuid
      

      /**
       * check candidate is exist or not in the database -> if exist then send the ResponseWithData else ResponseWithoutData
       */
      const checkCandidate = await candidateExams.findOne({
        attributes: ['candidate_exam_uuid'],
        where: {
          candidate_exam_uuid: candidateExamUuid
        }
      })

      if (checkCandidate) {
        /**
         * find candidate_id
         */

        var candidateID = await candidateExams.findOne({
          attributes: ['id','candidate_id'],

          include: {
            model: candidate_exam_questions
          },
         
          where: {
            candidate_exam_uuid: candidateExamUuid
          }
        })
        
      

        var mode = await candidate.findOne({
          attributes: ['candidate_type'],
          where: {
            id: candidateID.candidate_id
          }
        })

        const candidateExamMode = mode.candidate_type
       
       
        
        /**
         *  * * * * * * * * * * *   Find Candidate Total Questions  * * * * * * * * * * *
         */

        var TOTALQUESTION = await candidate_exam_questions.count({
          attributes: ['question_id'],
          where: {
            candidate_exam_id: candidateID.id
          }
        })

        /**
         *  * * * * * * * * * * *   Find Candidate Right Questiona Answer  * * * * * * * * * * *
         */

        var RIGHTANSWER = await candidate_exam_questions.count({
          attributes: ['question_id'],
          include: [
            {
              model: question_options,
              where: {
                is_correct_answer: 1
              }
            }
          ],
          where: {
            candidate_exam_id: candidateID.id
          }
        })

        /**
         *  * * * * * * * * * * *   Find Candidate Skipped Questions  * * * * * * * * * * *
         */

        var SKIPPED = await candidateExams.count({
          attributes: ['total_questions'],

          include: [
            {
              model: candidate_exam_questions,
              attributes: ['question_id'],
              where: {
                question_status: 2
              }
            }
          ],

          where: {
            candidate_exam_uuid: candidateExamUuid
          }
        })

        /**
         *  * * * * * * * * * * *   Find Candidate ATTEMPTED Questions  * * * * * * * * * * *
         */

        var ATTEMPTED = await candidate_exam_questions.count({
          attributes: ['question_status'],
          where: {
            question_status: 1,
            candidate_exam_id: candidateID.id
          }
        })

        /**
         *  * * * * * * * * * * *   Find Candidate UNATTEMPTED Questions  * * * * * * * * * * *
         */

        var UNATTEMPTED = await candidateExams.count({
          attributes: ['total_questions'],

          include: [
            {
              model: candidate_exam_questions,
              attributes: ['question_id'],
              where: {
                question_status: 0
              }
            }
          ],

          where: {
            candidate_exam_uuid: candidateExamUuid
          }
        })

        /**
         * candidate total_questions and total_correct_answer save in database
         */

        await candidateExams.update(
          {
            total_questions: TOTALQUESTION,
            total_correct_answers: RIGHTANSWER
          },
          {
            where: {
              candidate_exam_uuid: candidateExamUuid
            }
          }
        )

        /**
         *  * * * * * * * * * * *   Find Candidate Finalresult   * * * * * * * * * * *
         */
        let candidateresult = {
          totalQuestion: TOTALQUESTION,
          rightAnswer: RIGHTANSWER,
          wrongAnswer: ATTEMPTED - RIGHTANSWER,
          attempted: ATTEMPTED,
          unattempted: UNATTEMPTED,
          skipped: SKIPPED
        }

        /**
         * Check the setting table for allowance and then give the result to the candidate
         */
        if (candidateExamMode == 1) {
          
          const setting = await SettingHelper.getSettingValue('result_allow_in_campus');
          const result_given = setting.setting_value
         
          if (result_given == 'no') {
            res
              .status(200)
              .send(
                helper.responseWithoutData(
                  true,
                  responseCode.OK,
                  responseMessage.OK
                )
              )
          } else {
            res
              .status(200)
              .send(
                helper.responseWithData(
                  true,
                  responseCode.OK,
                  responseMessage.OK,
                  candidateresult
                )
              )
          }
        }
         else if (candidateExamMode == 2) {
          const setting = await SettingHelper.getSettingValue('result_allow_in_walkin');
          const result_given = setting.setting_value
          console.log(result_given)
          if (result_given == 'no') {
            res
              .status(200)
              .send(
                helper.responseWithoutData(
                  true,
                  responseCode.OK,
                  responseMessage.OK,
                  
                )
              )
          } else {
            res
              .status(200)
              .send(
                helper.responseWithData(
                  true,
                  responseCode.OK,
                  responseMessage.OK,
                  candidateresult
                )
              )
          }
        } 
        else {
          res
            .status(200)
            .send(
              helper.responseWithoutData(
                false,
                responseCode.NOT_FOUND,
                responseMessage.NOT_FOUND
              )
            )
        }
      } else {
        res
          .status(200)
          .send(
            helper.responseWithoutData(
              false,
              responseCode.NOT_FOUND,
              responseMessage.NOT_FOUND
            )
          )
      }
    } catch (ex) {
      console.error({ error: ex.message })
    }
  }
}

export default new Result()
