const { WELCOME, FORGOT_PASS } = require('../enum/email.enum');

module.exports = {
  [WELCOME]: {
    subject: 'Welcome on board',
    templateName: 'welcome'
  },

  [FORGOT_PASS]: {
    subject: 'Your password is under protect',
    templateName: 'forgot-pass'
  }
};
