import { LANGUAGE_CONFIG } from "@/app/(root)/_constants"
import { create } from "zustand"
import { Monaco } from "@monaco-editor/react"
import { CodeEditorState } from "@/types"

function getInitialState()
{
    if (typeof window == "undefined") {
        return {
            language: "javascript",
            theme: "vs-dark",
            fontSize: 16,
        }
    }

    const savedLanguage = localStorage.getItem("editor-language") || "javascript";
    const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
    const savedFontSize = Number(localStorage.getItem("editor-font-size") || 16);

    return {
        language: savedLanguage,
        theme: savedTheme,
        fontSize: Number(savedFontSize)
    }
}

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
    const states = getInitialState();

    return {
        ...states,
        output: "",
        isRunning: false,
        error: null,
        editor: null,
        executionResult: null,

        getCode: () => get().editor?.getValue() || "",
        
        setEditor: (editor: Monaco) => {
            const savedCode = localStorage.getItem(`editor-code-${get().language}`);

            if (savedCode) {
                editor?.setValue(savedCode);
            }

            set({ editor });
        },

        setTheme: (theme: string) => {
            localStorage.setItem("editor-theme", theme);

            set({ theme });
        },

        setFontSize: (fontSize: number) => {
            localStorage.setItem("editor-font-size", fontSize.toString());

            set({ fontSize });
        },

        setLanguage: (language: string) => {
            const currentCode = get().editor?.getValue();

            if (currentCode) {
                localStorage.setItem(`editor-code-${get().language}`, currentCode);
            }

            localStorage.setItem("editor-language", language);

            set({
                language,
                output: "",
                error: null
            })
        },

        runCode: async() => {
            const { language, getCode } = get();
            const code = getCode();

            if (!code)
            {
                set({ error: "Write your code to continue" });
                return;
            }

            set({ isRunning: true, error: null, output: "" });

            try {
                const runtime = LANGUAGE_CONFIG[language].pistonRuntime;

                const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        language: runtime.language,
                        version: runtime.version,
                        files: [{ content: code }]
                    })
                })

                const data = await response.json();

                if (data.message)
                {
                    set({ error: data.message, executionResult: { code, output: "", error: data.message } });
                    return;
                }

                if (data.compile && data.compile.code !== 0)
                {
                    const error = data.compile.stderr || data.compile.output;

                    set({
                        error,
                        executionResult: { code, output : "", error }
                    })

                    return;
                }

                if (data.run && data.run.code !== 0)
                {
                    const error = data.run.stderr || data.run.output;

                    set({
                        error,
                        executionResult: { code, output: "", error }
                    })

                    return;
                }

                const output = data.run.output || data.compile.output;

                set({
                    output: output.trim(),
                    error: null,
                    executionResult: { code, output: output.trim(), error: null }
                })
            }
            catch(err: any) {
                set({
                    error: "Error running code",
                    executionResult: { code, output: "", error: "Error running code" }
                })
                console.log("error in runcode store", err.message);
            }
            finally {
                set({ isRunning: false });
            }
        },

        resetOutput: () => {
            set({ output: "", error: null, executionResult: null });
        }
    }
})

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;