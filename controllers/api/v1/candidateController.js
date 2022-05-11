import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import {
  candidatesModel,
  candidateExamsModel,
  departmentsModel,
  campusDrivesModel,
} from "../../../models/api/v1/index.js";
import Helper from "../../../helper/commonFunction.js";
import responseCode from "../../../utils/locales/responseCode.js";
import responseMessage from "../../../utils/locales/responseMessage.js";

export default new (class Candidate {
  async signup(req, res) {
    try {
      async function registerCandidate(candidate) {
        //Common Fucntion to create candidate via  Oncampus & walkin
        const createCandidate = await candidatesModel.create(candidate);

        const examModel = await candidateExamsModel.create({
          candidate_id: createCandidate.id,
          created_at: new Date().getTime(),
          campus_drive_id: candidate_type == 1 ? driveid : null,
        });

        return Helper.generate_Token(examModel.candidate_exam_uuid);
      }

      // Finds the validation errors in this request and wraps them in an object with handy functions
      const validationCheck = validationResult(req);

      if (!validationCheck.isEmpty()) {
        return res
          .status(200)
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.BAD_REQUEST,
              validationCheck.errors[0].msg
            )
          );
      }

      // candidate_type:  1 = Campus, 2 = Walkin

      const candidate_type = parseInt(req.body.candidate_type);

      const candidate = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        candidate_type: candidate_type,
        created_at: new Date().getTime(),
      };

      if (candidate_type == 1) {
        // for Campus
        // Query : find candidate via mobile number and type 1(onCampus)
        const query = {
          where: {
            [Op.and]: [
              {
                mobile: req.body.mobile,
              },
              {
                candidate_type: 1,
              },
            ],
          },
        };

        const onCampusUser = await candidatesModel.findOne(query);
        //OncampusUser: if candidate will be found
        if (onCampusUser) {
          if (onCampusUser.mobile == req.body.mobile) {
            return res.send({
              responseCode: 400,
              responseMessage: `User with Contact Number ${onCampusUser.mobile} already exists`,
            });
          }
        }
        //if not found then register new Candidate
        else {
          const campus_drive = await campusDrivesModel.findOne({
            // To store Campus_drive_id and campus id in Candidate table & exam table from campus_drive
            attributes: ["id", "campus_id"],
            where: {
              campus_drive_uuid: req.body.campus_drive_uuid,
            },
          });
          candidate.campus_id = campus_drive.campus_id;
          candidate.campus_drive_id=campus_drive.id;
          var driveid = campus_drive.id;
        }
      } else if (candidate_type == 2) {
        // for Walkin
        // Query : find candidate via mobile number and type 2(Walkin)
        const query = {
          where: {
            [Op.and]: [
              {
                mobile: req.body.mobile,
              },
              {
                candidate_type: 2,
              },
            ],
          },
        };

        const user = await candidatesModel.findOne(query);
        console.log("111", user);
        if (user) {
          // if Candidate appears at same day again then again
          if (user.updated_at) {
            var date = user.updated_at;
            var nDate = new Date(date);
            var getDate = nDate.getDate();
            var getMonth = nDate.getMonth();
            var getYear = nDate.getFullYear();

            //Present date
            var presentDate = new Date();
            var getPresentDate = presentDate.getDate();
            var getPresentMonth = presentDate.getMonth();
            var getPresentYear = presentDate.getFullYear();
          } else {
            var date = user.created_at;
            var nDate = new Date(date);
            var getDate = nDate.getDate();
            var getMonth = nDate.getMonth();
            var getYear = nDate.getFullYear();

            //Present date
            var presentDate = new Date();
            var getPresentDate = presentDate.getDate();
            var getPresentMonth = presentDate.getMonth();
            var getPresentYear = presentDate.getFullYear();
          }

          if (
            getYear === getPresentYear &&
            getMonth === getPresentMonth &&
            getDate === getPresentDate
          ) {
            //Update Cnadidate details
            const updateUser = await candidatesModel.update(
              {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                updated_at: new Date().getTime(),
              },
              {
                where: {
                  id: user.id,
                },
              }
            );

            const examModel = await candidateExamsModel.findOne({
              attributes: ["candidate_exam_uuid"],
              where: {
                candidate_id: user.id,
              },
            });

            //New Token via Helper Function for Updated User
            const updatedToken = Helper.generate_Token(
              examModel.candidate_exam_uuid
            );

            console.log("===>updated", updateUser);
            return res.send(
              Helper.responseWithData(
                true,
                responseCode.OK,
                responseMessage.OK,
                { access_token: updatedToken }
              )
            );
          } else {
            // if Candidate appears same day with same mobile then create new
            candidate.experience_months =
              req.body.experience_year * 12 + req.body.experience_month;

            const department = await departmentsModel.findOne({
              attributes: ["id"],
              where: {
                department_uuid: req.body.department_uuid,
              },
            });

            candidate.department_id = department.id;
          }
        }
        //if candidate is unique or appears at same day with different mobile num then create new
        else {
          candidate.experience_months =
            req.body.experience_year * 12 + req.body.experience_month;

          const department = await departmentsModel.findOne({
            attributes: ["id"],
            where: {
              department_uuid: req.body.department_uuid,
            },
          });

          candidate.department_id = department.id;
        }
      }

      // console.log(candidate);

      const token = await registerCandidate(candidate);
      // console.log(token);
      if (token) {
        return res.send(
          Helper.responseWithData(
            true,
            responseCode.CREATED,
            responseMessage.CREATED,
            { access_token: token }
          )
        );
      } else {
        return res
          .status(200)
          .send(
            Helper.responseWithoutData(
              responseCode.INTERNAL_SERVER_ERROR,
              false,
              responseMessage.INTERNAL_SERVER_ERROR
            )
          );
      }
      // }
    } catch (error) {
      console.log(error.message);
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
  }
})();
