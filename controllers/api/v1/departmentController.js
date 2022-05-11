import { departmentsModel } from "../../../models/api/v1/index.js";
import Helper from "../../../helper/commonFunction.js";
import responseMessage from "../../../utils/locales/responseMessage.js";
import responseCode from "../../../utils/locales/responseCode.js";

/**
 * Department api controller
 */
class departments {
  async departments(req, res) {
    try {
      const technology = await departmentsModel.findAll({
        where: {
          status: 1,
          deleted_at: null
        },
        order: [["department_name", "ASC"]],
        attributes: ["department_uuid", "department_name"],
      });
      if (technology) {
        res
          .send(
            Helper.responseWithData(
              true,
              responseCode.OK,
              responseMessage.OK,
              technology
            )
          );
      } else {
        res
          .send(
            Helper.responseWithoutData(
              false,
              responseCode.NOT_FOUND,
              responseMessage.NOT_FOUND
            )
          );
      }
    } catch (error) {
      res
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.INTERNAL_SERVER_ERROR,
            responseMessage.INTERNAL_SERVER_ERROR
          )
        );
    }
  }
}

export default new departments();
