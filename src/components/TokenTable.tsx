"use client";

import { Token } from "@/lib/analyzer";

type Props = {
  tokens: Token[];
};

export function TokenTable({ tokens }: Props) {
  return (
    <div className="w-full max-w-2xl shadow overflow-hidden border border-gray-200 rounded-xl">
      <table className="min-w-full text-sm bg-white">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="text-left px-4 py-2">Token</th>
            <th className="text-left px-4 py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } border-t border-gray-200`}
            >
              <td className="px-4 py-2 font-mono">{token.value}</td>
              <td className="px-4 py-2">{token.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
