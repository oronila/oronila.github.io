import { useState, useRef, useEffect } from "react";

type TerminalHistory = {
    type: "input" | "output";
    content: string;
};

export default function TerminalApp() {
    const [history, setHistory] = useState<TerminalHistory[]>([
        { type: "output", content: "Welcome to NoorOS Terminal v1.0" },
        { type: "output", content: "Type 'help' for a list of commands." },
    ]);
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim();
        if (!trimmed) {
            setHistory((prev) => [...prev, { type: "input", content: "" }]);
            return;
        }

        const newHistory: TerminalHistory[] = [...history, { type: "input", content: cmd }];
        const parts = trimmed.split(" ");
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        switch (command) {
            case "help":
                newHistory.push({
                    type: "output",
                    content: `Available commands:
  help       - Show this help message
  clear      - Clear the terminal screen
  ls         - List directory contents
  cat [file] - View file contents
  whoami     - Display current user
  date       - Display current date and time
  echo [txt] - specific text`,
                });
                break;
            case "clear":
                setHistory([]);
                setInput("");
                return;
            case "ls":
                newHistory.push({
                    type: "output",
                    content: `About Me
Projects/
Resume
Music/
Contact.lnk`,
                });
                break;
            case "whoami":
                newHistory.push({ type: "output", content: "guest" });
                break;
            case "date":
                newHistory.push({ type: "output", content: new Date().toString() });
                break;
            case "echo":
                newHistory.push({ type: "output", content: args.join(" ") });
                break;
            case "cat":
                if (args.length === 0) {
                    newHistory.push({ type: "output", content: "Usage: cat [filename]" });
                } else {
                    const filename = args[0];
                    if (filename === "About Me") {
                        newHistory.push({
                            type: "output",
                            content: `Noor Ali
probably building something new.
projects at github.`,
                        });
                    } else if (filename === "Resume") {
                        newHistory.push({ type: "output", content: "[Binary file]" });
                    } else {
                        newHistory.push({ type: "output", content: `cat: ${filename}: No such file or directory` });
                    }
                }
                break;
            default:
                newHistory.push({ type: "output", content: `command not found: ${command}` });
        }

        setHistory(newHistory);
        setInput("");
    };

    return (
        <div
            className="h-full w-full bg-black p-4 font-pixel text-sm text-green-500 overflow-y-auto selection:bg-green-900 selection:text-white"
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((line, i) => (
                <div key={i} className={`mb-1 ${line.type === "input" ? "font-bold" : ""}`}>
                    {line.type === "input" && <span className="mr-2 text-green-700">$</span>}
                    <div className="whitespace-pre-wrap leading-relaxed">{line.content}</div>
                </div>
            ))}
            <div className="flex items-center">
                <span className="mr-2 text-green-700">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleCommand(input);
                        }
                    }}
                    className="flex-1 bg-transparent outline-none border-none text-green-500 font-pixel caret-green-500"
                    autoComplete="off"
                    spellCheck="false"
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
}
