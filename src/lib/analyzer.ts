export type Token = {
  type: string;
  value: string;
};

function createNFA(word: string) {
  const transitions: Record<number, Record<string, number>> = {};
  for (let i = 0; i < word.length; i++) {
    transitions[i] = { [word[i]]: i + 1 };
  }
  return { start: 0, accept: word.length, transitions };
}

function runNFA(nfa: ReturnType<typeof createNFA>, input: string) {
  let state = nfa.start;
  for (const char of input) {
    const next = nfa.transitions[state]?.[char];
    if (next === undefined) return false;
    state = next;
  }
  return state === nfa.accept;
}

const reservedWords = ["if", "else", "for", "while"];
const reservedNFAs = reservedWords.map(createNFA);

function isInteger(word: string) {
  return /^\d+$/.test(word);
}

function isFloat(word: string) {
  return /^\d+\.\d+$/.test(word);
}

function isComplex(word: string) {
  return /^\d+[+-]\d+j$/.test(word);
}

function isIdentifier(word: string) {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(word);
}

export function analyze(input: string): Token[] {
  const tokens: Token[] = [];
  const words = input.trim().split(/\s+/);

  for (const word of words) {
    if (!word) continue;
    let matched = false;

    for (let i = 0; i < reservedNFAs.length; i++) {
      if (runNFA(reservedNFAs[i], word)) {
        tokens.push({ type: "KEYWORD", value: word });
        matched = true;
        break;
      }
    }

    if (!matched) {
      if (isInteger(word)) tokens.push({ type: "INTEGER", value: word });
      else if (isFloat(word)) tokens.push({ type: "FLOAT", value: word });
      else if (isComplex(word)) tokens.push({ type: "COMPLEX", value: word });
      else if (isIdentifier(word))
        tokens.push({ type: "IDENTIFIER", value: word });
      else tokens.push({ type: "UNKNOWN", value: word });
    }
  }

  return tokens;
}
