import entry from "../../../../src/features/entry";

const entries = {
  existing: [`${process.cwd()}/existing.js`],
};

module.exports = entry(entries, "./src/client.js");
