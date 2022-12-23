const { HI, HELLO } = require('../enum/sms.enam');

module.exports = {
  [HI]: (name) => {
    return `Hi ${name} on our platform `
  },
  [HELLO]: (name) => {
    return `hello ${name}, chek email`
  }
};
