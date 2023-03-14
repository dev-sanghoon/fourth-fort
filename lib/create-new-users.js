function getRandomNumber(start, end) {
  const value = Math.random() * (end - start) + start;
  return Math.floor(value);
}

function randomByCode(condition) {
  if (!condition.string && !condition.number) {
    throw new Error("must select least one conditions");
  }
  if (condition.string && condition.number) {
    return () => {
      const asciiIndex = getRandomNumber(48, 83);
      if (asciiIndex > 57) {
        return String.fromCharCode(asciiIndex + 39);
      }
      return String.fromCharCode(asciiIndex);
    };
  }
  const [start, end] = condition.number ? [48, 57] : [97, 122];
  return () => {
    const asciiIndex = getRandomNumber(start, end);
    return String.fromCharCode(asciiIndex);
  };
}

function populate(minLength, maxLength, condition) {
  const length = getRandomNumber(minLength, maxLength);
  return Array(length).fill(undefined).map(randomByCode(condition)).join("");
}

function getRandomService() {
  const services = ["gmail.com", "naver.com", "daum.net", "kakao.com"];
  const idx = getRandomNumber(0, services.length - 1);
  return services[idx];
}

function createRandomEmail() {
  const stringPart = populate(4, 8, { string: true });
  const numberPart = populate(2, 4, { number: true });
  const servicePart = getRandomService();
  return `${stringPart}${numberPart}@${servicePart}`;
}

function createRandomPassword() {
  return populate(6, 18, { number: true, string: true });
}

module.exports = { createRandomEmail, createRandomPassword };
