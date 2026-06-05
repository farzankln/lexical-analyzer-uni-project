"use client";

import { Token } from "@/lib/analyzer";

interface TokenTableProps {
  tokens: Token[];
}

export function TokenTable({ tokens }: TokenTableProps) {
  const getTypeStyle = (type: string) => {
    switch (type) {
      case "RESERVED_WORD":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "IDENTIFIER":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "INTEGER":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "FLOAT":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "COMPLEX":
        return "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200";
      case "OPERATOR":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "PUNCTUATION":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "UNKNOWN":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden rounded-2xl border border-slate-200 bg-white custom-scrollbar">
      <table className="w-full min-w-[560px] text-left text-sm relative">
        <thead className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur shadow-sm border-b border-slate-200">
          <tr>
            <th className="w-2/5 px-4 py-3.5 font-semibold text-xs uppercase tracking-wide text-slate-500">
              Token
            </th>
            <th className="w-2/5 px-4 py-3.5 font-semibold text-xs uppercase tracking-wide text-slate-500">
              Type
            </th>
            <th className="w-1/5 px-4 py-3.5 font-semibold text-xs uppercase tracking-wide text-slate-500 text-center">
              Ln : Col
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {tokens.map((token, index) => (
            <tr key={index} className="hover:bg-indigo-50/35 transition-colors">
              <td className="px-4 py-3 font-mono text-slate-800 font-medium break-all">
                {token.value}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold border whitespace-nowrap ${getTypeStyle(
                    token.type,
                  )}`}
                >
                  {token.type}
                </span>
              </td>

              <td className="px-4 py-3 text-center text-slate-500 font-mono text-xs whitespace-nowrap">
                {token.line} : {token.column}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
