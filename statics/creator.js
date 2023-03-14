const fs = require("fs");
const {
  createRandomEmail,
  createRandomPassword,
} = require("../lib/create-new-users");

const userNumber = 1000;

let users = "";

for (let idx = 0; idx < userNumber; idx++) {
  users += `${createRandomEmail()},${createRandomPassword()}\n`;
}

fs.writeFile(`${__dirname}/output/register-targets.csv`, users, (err) => {
  if (err) throw err;
});
