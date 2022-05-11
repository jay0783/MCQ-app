import Helper from '../../../helper/commonFunction.js'
import responseMessage from '../../../utils/locales/responseMessage.js'
import responseCode from '../../../utils/locales/responseCode.js'
import jwt from 'jsonwebtoken'

class Tokenverification {
  async verifyjwtToken (req, res) {
    let token = req.headers['authorization']
    // console.log(token.exp)

    if (!token) {
      res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.BAD_REQUEST,
            responseMessage.BAD_REQUEST
          )
        )
    }
    try {
      // token = token.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRETKEY, function (err, decoded) {
        if (err) {
          res
            .status(200)
            .send(
              Helper.responseWithoutData(
                true,
                responseCode.UNAUTHORIZED,
                responseMessage.UNAUTHORIZED
              )
            )
        } else {
          res
            .status(200)
            .send(
              Helper.responseWithoutData(
                true,
                responseCode.OK,
                responseMessage.OK
              )
            )
        }
      })
    } catch (err) {
      console.log('rushit')
      res
        .status(200)
        .send(
          Helper.responseWithoutData(
            false,
            responseCode.UNAUTHORIZED,
            responseMessage.UNAUTHORIZED
          )
        )
    }
  }
}

export default new Tokenverification()
