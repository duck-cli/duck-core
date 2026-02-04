import path from "node:path";
import fs from "node:fs"
import type { ProjectFile } from "../interfaces/interfaces.js";

export function resolveDir(dir?: string){
    const targetDir: string = dir
    ? path.resolve(dir)
    : process.cwd()

    if(!fs.existsSync(targetDir))
        throw new Error(`Directory does not exist: ${targetDir}`)

    if(!fs.statSync(targetDir).isDirectory())
        throw new Error(`Path is not a directory: ${targetDir}`)
  return targetDir
}

export function detectFileNaming(fileName: string): "camelCase" | "PascalCase" | "kebab-case" | "snake_case" | "unknown" {
  if (/^[a-z][a-zA-Z0-9]*$/.test(fileName)) return "camelCase"
  if (/^[A-Z][a-zA-Z0-9]*$/.test(fileName)) return "PascalCase"
  if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(fileName)) return "kebab-case"
  if (/^[a-z0-9]+(_[a-z0-9]+)+$/.test(fileName)) return "snake_case"
  return "unknown"
}

export function detectFileNamingDominant(files: ProjectFile[]){
    const namingCounts: Record<string, number> = {
        "camelCase": 0,
        "PascalCase": 0,
        "kebab-case": 0,
        "snake_case": 0
    }

    files.forEach(file => {
        const fileName = path.basename(file.path, path.extname(file.path))
        const naming = detectFileNaming(fileName)
        if (naming !== "unknown") {
            namingCounts[naming] = (namingCounts[naming] || 0) + 1
        }
    })

    const entries = Object.entries(namingCounts)

    const [dominant, count] = entries.sort((a, b) => b[1] - a[1])[0]!

    return count > 0 ? dominant as "camelCase" | "PascalCase" | "kebab-case" | "snake_case" : "unknown"
}
