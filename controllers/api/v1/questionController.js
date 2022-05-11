/*******************************
 * @author : Jay Patel
 * @description : Question controller that fetches random questions from db, based on category.
 */
import QueryTypes from "@sequelize/core";
import Sequelize from "sequelize";
import {
  questionsModel,
  questionOptionsModel,
  categoriesModel,
  candidatesModel,
  candidateExamQuestionsModel,
  candidateExamsModel,
  difficulty_level,
  question_difficulty,
  sequlizeInstance,
} from "../../../models/api/v1/index.js";
const Op = Sequelize.Op;

class questionController {
  async getRandomQuestionsByCategory(req, res) {
    //Fetch question from db, based on the category (Divide weightage questions based on category )
    try {
      const cExamUuid = req.token_payload.candidate_exam_uuid;
      const getCandidateExam = await candidateExamsModel.findOne({
        attributes: ["id", "exam_started_at"],
        where: { candidate_exam_uuid: cExamUuid },
      });
      const cExam_id = getCandidateExam.id;
      const getQuesFromCandidates = await candidateExamQuestionsModel.findAll({
        attributes: ["question_id"],
        where: { candidate_exam_id: cExam_id },
      });
      const candidateTypeData = await candidateExamsModel.findOne({
        attributes: ["campus_drive_id", "exam_started_at"],
        include: [
          {
            model: candidatesModel,
            attributes: ["experience_months", "department_id"],
          },
        ],
        where: { id: cExam_id },
      });
      var candidateExperience = candidateTypeData.candidate.experience_months;
      let candidateDept = candidateTypeData.candidate.department_id;
      if (candidateExperience != null) {
        candidateExperience = Math.floor(candidateExperience / 12);
        var gettotalQuestions = await sequlizeInstance.query(
          "SELECT setting_value FROM settings WHERE setting_key = $setting_key",
          {
            bind: { setting_key: "number_of_question_for_individual_walkin" },
            type: QueryTypes.SELECT,
            plain: true,
            raw: true,
          }
        );
      } else {
        candidateExperience = 0;
        var gettotalQuestions = await sequlizeInstance.query(
          "SELECT setting_value FROM settings WHERE setting_key = $setting_key",
          {
            bind: { setting_key: "number_of_question_per_exam_in_campus" },
            type: QueryTypes.SELECT,
            plain: true,
            raw: true,
          }
        );
      }

      const totalQuestions = parseInt(gettotalQuestions.setting_value);
      const getCategories = await categoriesModel.findAll({
        attributes: [
          // specify an array where the first element is the SQL function and the second is the alias
          [Sequelize.fn("DISTINCT", Sequelize.col("id")), "id"],
        ],
        where: { deleted_at: { [Op.is]: null }, status: 1 },
      });
      const categories = [];
      const quePerCategory = Math.floor(totalQuestions / getCategories.length);

      for (let i = 0; i < getCategories.length; i++) {
        categories.push({
          id: getCategories[i].id,
          limit: quePerCategory,
        });
      }

      const diffQues = totalQuestions - quePerCategory * categories.length;
      if (diffQues) {
        for (let i = 0; i < diffQues; i++) {
          categories[i].limit = categories[i].limit + 1;
        }
      }

      let temp_questions = [];
      const questions = [];
      const responseData = {
        total_duration: 0,
        total_questions: 0,
        question_list: [],
      };

      // ======================fetching questions from candidate_exam_questions table================================

      const checkExamStarted = getCandidateExam.exam_started_at;
      // console.log("======>>> exam_started_at : " + checkExamStarted);

      const getResponseDataList = async (_sendQuestion) => {
        // ======================if the candidate has already taken the exam, questions will be fetched from candidate_exam_questions table================================
        // if (getQuesFromCandidates.length > 0) {
        if (checkExamStarted) {
          console.log("if part==>");
          for (let i = 0; i < getQuesFromCandidates.length; i++) {
            var question = await questionsModel.findOne({
              attributes: ["id", "question_uuid", "question_title"],
              include: [
                //fetching questions
                {
                  model: questionOptionsModel,
                  attributes: ["question_option_uuid", "option_text"],
                },
                {
                  model: candidateExamQuestionsModel,
                  attributes: ["question_option_id", "question_status"],
                  where: { candidate_exam_id: cExam_id },
                },
              ],
              where: { id: getQuesFromCandidates[i].question_id },
            });
            temp_questions.push(question);
          }
          _sendQuestion(temp_questions);
        }
        // ======================if the candidate is appearing for the first time, questions will be generated ================================
        // ==============================and saved in candidate_exam_questions table to keep record ===========================================
        else {
          console.log("else part==>");
          const prepareQuestionListFun = async (
            categories,
            candidateDept,
            candidateExperience,
            _callback
          ) => {
            let tempquestions = [];
            let count = 0;
            for (let i = 0; i < categories.length; i++) {
              let opt = await question_difficulty.findAll({
                //generating random questions, equally from all the categories
                attributes: ["question_id"],
                include: [
                  {
                    model: questionsModel,
                    attributes: [
                      "question_uuid",
                      "question_title",
                      "department_id",
                      "category_id",
                    ],
                    include: [
                      {
                        model: questionOptionsModel,
                        attributes: ["question_option_uuid", "option_text"],
                        where: { deleted_at: null },
                      },
                    ],
                    where: {
                      [Op.and]: [
                        { deleted_at: null },
                        { status: 1 },
                        {
                          department_id: candidateDept
                            ? candidateDept
                            : { [Op.not]: null },
                        },
                        { category_id: categories[i].id },
                      ],
                    },
                    order: Sequelize.literal("rand()"),
                  },
                  {
                    model: difficulty_level,
                    attributes: ["level"],
                    where: {
                      [Op.and]: [
                        { experience_from: { [Op.lte]: candidateExperience } },
                        { experience_to: { [Op.gte]: candidateExperience } },
                      ],
                    },
                  },
                ],
                limit: categories[i].limit,
                order: Sequelize.literal("rand()"),
                // where: {
                //   [Op.and]: [{ deleted_at: null }, { status: 1 }],
                // },
              });
              tempquestions.push(opt);
            }

            _callback(tempquestions);
          };

          //creating data to add in the candidate_exam_questions
          const saveQuestionsToExams = async (temp_ques, _callback) => {
            const updateExamStartTime = await candidateExamsModel.update(
              {
                exam_started_at: Date.now(),
              },
              { where: { id: cExam_id } }
            );
            for (let i = 0; i < temp_ques.length; i++) {
              for (let j = 0; j < temp_ques[i].length; j++) {
                questions.push({
                  candidate_exam_id: cExam_id,
                  question_id: temp_ques[i][j].question_id,
                  question_status: 0,
                  status: 1,
                  created_at: Date.now(),
                });
              }
            }
            _callback(questions);
          };

          prepareQuestionListFun(
            categories,
            candidateDept,
            candidateExperience,
            (temp_questions) => {
              saveQuestionsToExams(temp_questions, async (list) => {
                const saveQuestions =
                  await candidateExamQuestionsModel.bulkCreate(
                    // Batch inserting rows in candidate_exam_questions
                    questions
                  );
                _sendQuestion(temp_questions);
              });
            }
          );
        }
      };
      //Formatting the end response   to help the front-end mapping of the questions
      getResponseDataList(async (ques) => {
        if (getQuesFromCandidates.length > 0) {
          for (let i = 0; i < ques.length; i++) {
            if (ques[i].candidate_exam_questions[0].question_option_id) {
              var quesOptionUuid = await questionOptionsModel.findOne({
                attributes: ["question_option_uuid"],
                where: {
                  id: ques[i].candidate_exam_questions[0].question_option_id,
                },
              });
            }

            responseData.question_list.push({
              question_uuid: ques[i].question_uuid,
              question_title: ques[i].question_title,
              question_options: ques[i].question_options,
              question_status:
                ques[i].candidate_exam_questions[0].question_status,
              question_option_uuid: ques[i].candidate_exam_questions[0]
                .question_option_id
                ? quesOptionUuid.question_option_uuid
                : null,
            });
          }
          responseData.total_duration = responseData.question_list.length; //will be dynamic when provided
          responseData.total_questions = responseData.question_list.length;
        } else {
          for (let i = 0; i < ques.length; i++) {
            for (let j = 0; j < ques[i].length; j++) {
              responseData.question_list.push({
                question_uuid: ques[i][j].question.question_uuid,
                question_title: ques[i][j].question.question_title,
                question_options: ques[i][j].question.question_options,
                question_status: 0,
                question_option_uuid: null,
              });
            }
          }
          responseData.total_duration = responseData.question_list.length; //will be dynamic when provided
          responseData.total_questions = responseData.question_list.length;
        }

        res.json({
          responseCode: 200,
          responseStatus: true,
          responseMessage: "OK",
          responseData: responseData,
        });
      });
    } catch (ex) {
      res.json({
        responseCode: 200,
        responseStatus: false,
        responseMessage: ex.message,
      });
    }
  }
}
export default new questionController();
