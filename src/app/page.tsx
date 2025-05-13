"use client";

import { useState } from "react";
import { analyze, Token } from "@/lib/analyzer";
import { InputForm } from "@/components/InputForm";
import { TokenTable } from "@/components/TokenTable";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState<Token[]>([]);

  const handleAnalyze = () => {
    const result = analyze(input);
    setTokens(result);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-start px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">
        Lexical Analyzer using NFA
      </h1>

      <InputForm input={input} setInput={setInput} onAnalyze={handleAnalyze} />

      {tokens.length > 0 && <TokenTable tokens={tokens} />}
    </main>
  );
}
