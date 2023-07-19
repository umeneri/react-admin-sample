import * as React from "react";

const textlintWorker = new Worker("/textlint-worker.js");

export function postToTextlint(body: string) {
  textlintWorker.postMessage({
    command: "lint",
    text: body,
    ext: ".md",
  });
}

interface LintResult {
  type: string;
  ruleId: string;
  message: string;
  column: number;
  index: number;
  line: number;
}

function setLint(
  event: MessageEvent<any>,
  setLintResults: React.Dispatch<React.SetStateAction<string[]>>
) {
  const messages: LintResult[] = event.data?.result?.messages;
  const messageStrings = messages.map(
    (m) => `[${m.line} 行目:${m.column} 文字目] ${m.message}`
  );
  setLintResults(messageStrings);
}

export function registerReceiver(
  setLintResults: React.Dispatch<React.SetStateAction<string[]>>
) {
  textlintWorker.onmessage = function (event) {
    console.log(event);

    switch (event.data.command) {
      case "init":
        break;
      case "lint:result":
        setLint(event, setLintResults);
        break;
      default:
        console.log("unknown command, ignore");
    }
  };
}
