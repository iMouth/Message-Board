const format = { timeStyle: "short", dateStyle: "long" };
const makeDate = () => new Date().toLocaleString("en-us", format);

const messages = [];

module.exports = { messages, makeDate };
