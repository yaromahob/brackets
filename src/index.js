module.exports = function check(str, bracketsConfig) {
  const OPEN_BRACKETS = bracketsConfig.map((pair) => pair[0]);
  const CLOSE_BRACKETS = bracketsConfig.map((pair) => pair[1]);
  const MAP_OBJECT = {};

  for (let key of bracketsConfig) {
    MAP_OBJECT[key[0]] = key[1];
  }

  const stack = [];

  for (let i = 0; i < str.length; i++) {
    const currSymbol = str[i];
    if (stack.includes(currSymbol) && CLOSE_BRACKETS.includes(currSymbol)) {
      stack.pop();
      continue;
    }

    if (OPEN_BRACKETS.includes(currSymbol)) {
      stack.push(currSymbol);
    } else {
      if (stack.length === 0) {
        return false;
      }

      const topSymbol = stack[stack.length - 1];
      const relevantTopSymbol = MAP_OBJECT[topSymbol];

      if (currSymbol === relevantTopSymbol) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
};
