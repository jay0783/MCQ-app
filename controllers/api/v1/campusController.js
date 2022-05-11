import {
    Op
} from "sequelize";
import {
    campusesModel,
    campusDrivesModel
} from "../../../models/api/v1/index.js";
import Helper from "../../../helper/commonFunction.js";
import responseMessage from "../../../utils/locales/responseMessage.js";
import responseCode from "../../../utils/locales/responseCode.js";


/**
 * Campus api controller
 */

class campuses {
    async campuses(req, res) {
        try {

            const allcampuses = await campusDrivesModel.findAll({
                attributes: ['campus_drive_uuid'],
                include: {
                    model: campusesModel,
                    attributes: ['campus_name'],

                    required: true,
                },
                where: {
                    [Op.and]: [{
                        status: 1
                    },{
                        deleted_at: null
                    },{
                        end_datetime: {
                            [Op.gt]: Date.now()
                        }
                    }]


                }
            });
            const response = [];
            for (let i = 0; i < allcampuses.length; i++) {
                response.push({
                    campus_drive_uuid: allcampuses[i].campus_drive_uuid,
                    campus_name: allcampuses[i].campus.campus_name
                });
            }
            if (allcampuses) {
                res
                    .send(
                        Helper.responseWithData(
                            true,
                            responseCode.OK,
                            responseMessage.OK,
                            response
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

export default new campuses();