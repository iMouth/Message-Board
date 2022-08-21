const format = { dateStyle: "long", timeStyle: "medium" };

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date().toLocaleString("en-us", format),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date().toLocaleString("en-us", format),
  },
];

module.exports = messages;
