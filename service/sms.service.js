const twilio = require('twilio');

const { TWILIO_ACCOUNT_SID, TWILIO_SERVICE_SID, TWILIO_AUTH_TOKEN } = require('../config/config');
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const ApiError = require('../error/ApiError');

module.exports = {
  smsSend: async (message, phone) => {
    try {
      const smsResp = await client.messages.create({
        body: message,
        to: phone,
        messagingServiceSid: TWILIO_SERVICE_SID
      });
    } catch (e) {
      throw new ApiError('sms no valid', 401)
    }
  }
};
