const format = { timeStyle: "short", dateStyle: "long" };
const makeDate = () => new Date().toLocaleString("en-us", format);

const messages = [
  {
    text: "Hi",
    user: "Amando",
    added: makeDate(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: makeDate(),
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    user: "Tyson",
    added: makeDate(),
  },
];

module.exports = { messages, makeDate };
