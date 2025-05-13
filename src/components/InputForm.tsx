"use client";

type Props = {
  input: string;
  setInput: (value: string) => void;
  onAnalyze: () => void;
};

export function InputForm({ input, setInput, onAnalyze }: Props) {
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4 mb-8">
      <textarea
        placeholder="Enter your code or text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-36 border border-gray-300 rounded-xl p-4 resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={onAnalyze}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition-all shadow"
      >
        Analyze
      </button>
    </div>
  );
}
