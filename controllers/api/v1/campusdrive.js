import { Op } from 'sequelize'
import sequelize from 'sequelize'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

import {
  campusDrivesModel,
  campusesModel
} from '../../../models/api/v1/index.js'
import Helper from '../../../helper/commonFunction.js'
import responseCode from '../../../utils/locales/responseCode.js'
import responseMessage from '../../../utils/locales/responseMessage.js'

class Campusdrive {
  async getcampusdrive (req, res) {
    const drive = req.params.campus_token

    const valideToken = await campusDrivesModel.findOne({
      attributes: [
        'campus_drive_uuid',
        'campus_id',
        'start_datetime',
        'end_datetime'
      ],
      include: {
        model: campusesModel,
        attributes: ['campus_name'],
        required: true
      },

      where: {
        campus_drive_token: drive,
        status: 1
        // end_datetime : null,
      }
    })

    // console.log(valideToken.campus.campus_name)
    if (valideToken) {
      let carrentTime = new Date()
        .getTime()
        .toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      carrentTime = parseInt(carrentTime.replaceAll(',', ''))

      if (carrentTime <= valideToken.start_datetime.getTime()) {
        res.send(
          Helper.responseWithoutData(
            false,
            responseCode.BAD_REQUEST,
            'The exam has not yet started'
          )
        )
      } else if (carrentTime >= valideToken.end_datetime.getTime()) {
        res.send(
          Helper.responseWithData(
            false,
            responseCode.BAD_REQUEST,
            'The exam has already finished.. Please Try again later'
          )
        )
      } else {
        let data = {
          campus_drive_uuid: valideToken.campus_drive_uuid,
          campus_name: valideToken.campus.campus_name
        }
        res.send(
          Helper.responseWithData(
            true,
            responseCode.OK,
            responseMessage.OK,
            data
          )
        )
      }
    } else {
      res.send(
        Helper.responseWithoutData(
          false,
          responseCode.BAD_REQUEST,
          'Invalid Link'
        )
      )
    }
  }
}
export default new Campusdrive()
