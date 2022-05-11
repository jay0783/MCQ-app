import jwt from "jsonwebtoken";

class Helper {
  responseWithData(
    responseStatus,
    responseCode,
    responseMessage,
    responseData
  ) {
    return {
      responseStatus: responseStatus,
      responseCode: responseCode,
      responseMessage: responseMessage,
      responseData: responseData,
    };
  }
  responseWithoutData(responseStatus, responseCode, responseMessage) {
    return {
      responseStatus: responseStatus,
      responseCode: responseCode,
      responseMessage: responseMessage,
    };
  }

  generate_Token(payload) {
    return jwt.sign(
      {
        candidate_exam_uuid: payload,
      },
      `${process.env.JWT_SECRETKEY}`,
      {
        expiresIn: "1d",
      }
    );
  }
}

export default new Helper();
