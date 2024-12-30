import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import CopyButton from "./CopyButton"
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function CodeBlock({ language, code }: { language: string, code: string }) {
  const trimmedCode = code.split("\n") // split into lines
    .map((line) => line.trimEnd()) // remove trailing spaces from each line
    .join("\n"); // join back into a single string

    const [isExpanded, setIsExpanded] = useState(false);
    const lines = trimmedCode.split("\n");
    const displayCode = isExpanded ? trimmedCode : lines.slice(0, 6).join("\n");

  return (
    <div className="my-4 bg-[#0a0a0f] rounded-lg overflow-hidden border border-[#ffffff0a]">

      {/* header bar showing language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#ffffff08]">

        {/* language indicator with icon */}
        <div className="flex items-center gap-2">
          <img src={`/${language}.png`} alt={language} className="size-4 object-contain" />
          <span className="text-sm text-gray-400">{language || "plaintext"}</span>
        </div>

        {/* button to copy code to clipboard */}
        <CopyButton code={trimmedCode} />
      </div>

      {/* code block with syntax highlighting */}
      <div className="relative">
        <SyntaxHighlighter language={language.toLowerCase()} style={atomOneDark}
        customStyle={{
          padding: "1rem",
          background: "transparent",
          margin: 0,
        }} wrapLines={true} showLineNumbers>

          {displayCode}

        </SyntaxHighlighter>

        {
          lines.length > 6 && (
            <button onClick={() => setIsExpanded(!isExpanded)}
            className="absolute bottom-2 right-2 px-2 py-1 bg-blue-500/20 text-blue-400
            rounded text-xs flex items-center gap-1 hover:bg-blue-500/30 transition-colors" >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  Show More <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )
        }
      </div>
    </div>
  )
}

export default CodeBlock