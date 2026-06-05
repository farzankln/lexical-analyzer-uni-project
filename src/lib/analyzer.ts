export type TokenType =
  | "RESERVED_WORD"
  | "IDENTIFIER"
  | "INTEGER"
  | "FLOAT"
  | "COMPLEX"
  | "OPERATOR"
  | "PUNCTUATION"
  | "UNKNOWN";

export interface Token {
  value: string;
  type: TokenType;
  line: number;
  column: number;
}

function parseComplexNumbers(tokens: Token[]): Token[] {
  const parsedTokens: Token[] = [];
  let i = 0;

  while (i < tokens.length) {
    const currentToken = tokens[i];

    // Pattern: -num1 + num2j
    if (
      (currentToken.type === "INTEGER" || currentToken.type === "FLOAT") &&
      currentToken.value.startsWith("-") &&
      i + 3 < tokens.length
    ) {
      const nextToken = tokens[i + 1];
      const thirdToken = tokens[i + 2];
      const fourthToken = tokens[i + 3];

      if (
        nextToken.type === "OPERATOR" &&
        (nextToken.value === "+" || nextToken.value === "-") &&
        (thirdToken.type === "INTEGER" || thirdToken.type === "FLOAT") &&
        fourthToken.type === "IDENTIFIER" &&
        fourthToken.value.toLowerCase() === "j"
      ) {
        const complexValue = `${currentToken.value}${nextToken.value}${thirdToken.value}${fourthToken.value}`;
        parsedTokens.push({
          value: complexValue,
          type: "COMPLEX",
          line: currentToken.line,
          column: currentToken.column,
        });
        i += 4;
        continue;
      }
    }

    // Pattern: num1 + num2j
    if (
      (currentToken.type === "INTEGER" || currentToken.type === "FLOAT") &&
      i + 3 < tokens.length
    ) {
      const nextToken = tokens[i + 1];
      const thirdToken = tokens[i + 2];
      const fourthToken = tokens[i + 3];

      if (
        nextToken.type === "OPERATOR" &&
        (nextToken.value === "+" || nextToken.value === "-") &&
        (thirdToken.type === "INTEGER" || thirdToken.type === "FLOAT") &&
        fourthToken.type === "IDENTIFIER" &&
        fourthToken.value.toLowerCase() === "j"
      ) {
        const complexValue = `${currentToken.value}${nextToken.value}${thirdToken.value}${fourthToken.value}`;
        parsedTokens.push({
          value: complexValue,
          type: "COMPLEX",
          line: currentToken.line,
          column: currentToken.column,
        });
        i += 4;
        continue;
      }
    }

    // Pattern: num j (e.g., 5j)
    if (
      (currentToken.type === "INTEGER" || currentToken.type === "FLOAT") &&
      i + 1 < tokens.length &&
      tokens[i + 1].type === "IDENTIFIER" &&
      tokens[i + 1].value.toLowerCase() === "j"
    ) {
      const complexValue = `${currentToken.value}${tokens[i + 1].value}`;
      parsedTokens.push({
        value: complexValue,
        type: "COMPLEX",
        line: currentToken.line,
        column: currentToken.column,
      });
      i += 2;
      continue;
    }

    parsedTokens.push(currentToken);
    i++;
  }

  return parsedTokens;
}

export function analyze(input: string): Token[] {
  const tokens: Token[] = [];
  let cursor = 0;
  let line = 1;
  let column = 1;

  // Define patterns (order matters - longer/specific matches first)
  const patterns: { type: TokenType; regex: RegExp }[] = [
    { type: "FLOAT", regex: /^-?\d+\.\d+/ },
    { type: "INTEGER", regex: /^-?\d+/ },
    { type: "RESERVED_WORD", regex: /^(?:if|else|for|while)\b/ },
    { type: "IDENTIFIER", regex: /^[a-zA-Z_][a-zA-Z0-9_]*/ },
    { type: "OPERATOR", regex: /^(?:==|!=|<=|>=|&&|\|\||[+\-*/=<>])/ },
    { type: "PUNCTUATION", regex: /^[(){};,]/ },
  ];

  while (cursor < input.length) {
    const whitespaceMatch = input.slice(cursor).match(/^\s+/);
    if (whitespaceMatch) {
      const ws = whitespaceMatch[0];
      for (let i = 0; i < ws.length; i++) {
        if (ws[i] === "\n") {
          line++;
          column = 1;
        } else {
          column++;
        }
      }
      cursor += ws.length;
      continue;
    }

    if (cursor >= input.length) break;

    const remainingInput = input.slice(cursor);
    let matched = false;

    for (const { type, regex } of patterns) {
      const match = remainingInput.match(regex);
      if (match) {
        const value = match[0];
        tokens.push({ value, type, line, column });

        cursor += value.length;
        column += value.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      const char = remainingInput[0];
      tokens.push({ value: char, type: "UNKNOWN", line, column });
      cursor++;
      column++;
    }
  }

  // Pass initial tokens through the secondary parser for complex numbers
  return parseComplexNumbers(tokens);
}
