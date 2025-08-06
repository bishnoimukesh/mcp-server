"use client";

type CopyButtonProps = {
  text: string;
  filename: string;
};

export default function CopyButton({ text, filename }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log(`Copied ${filename} to clipboard`);
    });
  };

  return (
    <button 
      onClick={handleCopy}
      className="text-gray-400 hover:text-white transition-colors text-sm"
    >
      Copy
    </button>
  );
}
