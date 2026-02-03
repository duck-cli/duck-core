import fg from "fast-glob"
import path from "node:path"

type SupportedLanguage = "ts" | "tsx" | "js" | "jsx" | "json" | "md" 

interface ScannedFiles {
    absolutePath: string
    relativePath: string
    language: SupportedLanguage
}

export class Scanner {
    constructor(private readonly rootDir: string){}
    
    async scanFiles(): Promise<ScannedFiles[]>{
        const patterns = ["**/*.{ts,tsx,js,jsx,json,md}"]

        const ignore = [
            "**/node_modules/**",
            "**/dist/**",
            "**/build/**",
            "**/.git/**",
            "**/.next/**",
            "**/coverage/**"
        ]

        const entries = await fg(patterns, {
            cwd: this.rootDir,
            ignore,
            absolute: true,
            onlyFiles: true
        })

        return entries.map(filePath => ({
            absolutePath: filePath,
            relativePath: path.relative(this.rootDir, filePath),
            language: this.detectLanguage(filePath)
        }))
    }

    private detectLanguage(filePath: string): SupportedLanguage {
        const ext = path.extname(filePath).toLowerCase()

        switch (ext) {
            case ".ts":
                return "ts"
            case ".tsx":
                return "tsx"
            case ".js":
                return "js"
            case ".jsx":
                return "jsx"
            case ".json":
                return "json"
            case ".md":
                return "md"
            default:
                throw new Error(`Unsupported file type: ${filePath}`)
        }
    }
}