"use client";

type Props = {
  input: string;
  setInput: (value: string) => void;
  onAnalyze: () => void;
};

export function InputForm({ input, setInput, onAnalyze }: Props) {
  return (
    <div className="w-full flex flex-col gap-4 flex-1 min-h-0">
      <div className="relative flex-1 min-h-0 flex flex-col">
        <textarea
          placeholder={`Example:\nif x <= 10 {\n  sum = 3.14 + 1+2j;\n}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          className="flex-1 w-full bg-slate-50/80 border border-slate-200 rounded-2xl p-4 resize-none transition-all focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 focus:bg-white text-slate-800 font-mono text-sm leading-7 placeholder:text-slate-400 shadow-inner"
        />

        <div className="pointer-events-none absolute bottom-3 right-3 rounded-lg bg-white/80 border border-slate-200 px-2 py-1 text-[10px] text-slate-400 shadow-sm">
          Source Input
        </div>
      </div>

      <button
        onClick={onAnalyze}
        className="shrink-0 group bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold py-3 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(79,70,229,0.22)] focus:outline-none focus:ring-4 focus:ring-indigo-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 transition-transform group-hover:scale-110"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          />
        </svg>
        Analyze Source
      </button>
    </div>
  );
}
