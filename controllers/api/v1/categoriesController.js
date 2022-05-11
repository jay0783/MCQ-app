import db from "../../../models/api/v1/index.js";
import Helper from "../../../helper/commonFunction.js";
import responseMessage from "../../../utils/locales/responseMessage.js";
import responseCode from "../../../utils/locales/responseCode.js";
const categoryModel = db.categories;

class categories {
  async categories(req, res) {
    try {
      const categories = await categoryModel.findAll({
        where: { status: 1 },
        order: [["category_name", "ASC"]],
        attributes: ["category_uuid", "category_name"],
      });
      if (categories) {
        res
          .status(200)
          .send(
            Helper.responseWithData(
              true,
              responseCode.OK,
              responseMessage.OK,
              categories
            )
          );
      } else {
        res
          .status(200)
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
}

export default new categories();
