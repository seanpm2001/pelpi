const { version } = require("./package.json");
const readline = require("readline");
import { evalExpr, Type } from "./instr";
console.log(`Pelpi Version: ${version}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ">> ",
});

const handleLine = (accStatement, answer) => {
  const statementEnd = answer.trim().slice(-1)[0] === ";";
  const currLine = statementEnd ? answer.trim().slice(0, -1) : answer;
  const statement = `${accStatement}${currLine}`;
  if (statementEnd) {
    console.log(
      "Parsed: ",
      JSON.stringify(evalExpr(statement, { a: [1, 2] }), undefined, 2)
    );
    startStatement();
  } else {
    continueStatement(statement);
  }
};

function startStatement() {
  rl.question(">> ", (line) => handleLine("", line));
}

function continueStatement(prevString: string) {
  rl.question("", (line) => handleLine(prevString, line));
}

startStatement();
