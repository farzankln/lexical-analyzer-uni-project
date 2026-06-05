"use client";

export function GuideSection() {
  return (
    <div className="bg-white/75 backdrop-blur-xl border border-slate-200/80 p-5 md:p-6 rounded-3xl shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
      <h3 className="text-sm font-bold text-slate-950 mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.7}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </span>
        Quick Guide & Supported Tokens
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-xs text-slate-600">
        <GuideItem title="Keywords" value="if, else, for, while..." />

        <GuideItem title="Identifiers" value="var_1, sum" />

        <GuideItem title="Numbers" value="42, 3.14, 0.05" />

        <GuideItem title="Complex" value="1+2j, 3.5-1j" />

        <GuideItem title="Operators" value="+, -, *, /, ==, <=" />

        <GuideItem title="Punctuation" value="(, ), {, }, ;" />

        <div className="flex items-start gap-2 col-span-1 md:col-span-2 mt-2 pt-4 border-t border-slate-200">
          <span className="mt-0.5 text-indigo-500">ℹ</span>
          <span className="text-slate-500 leading-5">
            For the most accurate analysis, separate tokens using{" "}
            <strong className="text-slate-700">spaces</strong>.
          </span>
        </div>
      </div>
    </div>
  );
}

function GuideItem({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex items-start gap-2 rounded-2xl bg-slate-50/80 border border-slate-200/70 px-3 py-2.5">
      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
      <span className="leading-5">
        <strong className="text-slate-700">{title}:</strong>{" "}
        <code className="font-mono text-indigo-700">{value}</code>
      </span>
    </div>
  );
}
