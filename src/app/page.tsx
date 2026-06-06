"use client";

import { useState } from "react";
import { analyze, Token } from "@/lib/analyzer";
import { InputForm } from "@/components/InputForm";
import { TokenTable } from "@/components/TokenTable";
import { GuideSection } from "@/components/GuideSection";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState<Token[]>([]);

  const handleAnalyze = () => {
    const result = analyze(input);
    setTokens(result);
  };

  return (
    <main className="min-h-dvh w-full bg-blue-200 text-slate-800 font-sans selection:bg-indigo-200 selection:text-indigo-950 flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 py-6 flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
          {/* Left Column */}
          <section className="flex flex-col gap-6 h-full min-h-0 overflow-y-auto lg:overflow-hidden">
            {/* Top Container - Dynamic Height */}
            <div className="bg-white/85 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-[0_10px_35px_rgba(15,23,42,0.06)] p-6 flex flex-col flex-1 min-h-[400px]">
              <div className="mb-4 shrink-0">
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  NFA Based Tokenizer
                </div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-950">
                  Lexical Analyzer
                </h1>
                <p className="text-slate-500 text-sm mt-2 leading-6">
                  Analyze source input and classify tokens with a clean,
                  readable interface.
                </p>
              </div>

              <InputForm
                input={input}
                setInput={setInput}
                onAnalyze={handleAnalyze}
              />
            </div>

            {/* Bottom Container - Fixed Size */}
            <div className="shrink-0">
              <GuideSection />
            </div>
          </section>

          {/* Right Column */}
          <section className="flex flex-col h-full min-h-0">
            <div className="bg-white/85 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-[0_10px_35px_rgba(15,23,42,0.06)] p-6 flex flex-col h-full min-h-0">
              <div className="flex items-center justify-between gap-4 mb-5 shrink-0">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-950">
                    Analysis Results
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {tokens.length > 0
                      ? `${tokens.length} token${tokens.length > 1 ? "s" : ""} detected`
                      : "No tokens analyzed yet"}
                  </p>
                </div>

                {tokens.length > 0 && (
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                    Scrollable
                  </span>
                )}
              </div>

              <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                {tokens.length > 0 ? (
                  <TokenTable tokens={tokens} />
                ) : (
                  <div className="flex-1 w-full flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/70">
                    <div className="text-center px-6">
                      <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.7}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h10.5m-10.5 4.5h7.5"
                          />
                        </svg>
                      </div>
                      <p className="text-slate-600 text-sm font-medium">
                        Enter code and click Analyze
                      </p>
                      <p className="text-slate-400 text-xs mt-1">
                        Tokens will appear here in a scrollable table.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
