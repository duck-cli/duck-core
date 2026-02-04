import type { ScannedFile } from "../interfaces/interfaces.js"
import fs from "node:fs/promises"
import type { ProjectFile } from "../interfaces/interfaces.js"

const MAX_FILE_SIZE = 200_000 // 200kb (ajustar depois)

export class FileLoader {
  async load(files: ScannedFile[]): Promise<ProjectFile[]> {
    const result: ProjectFile[] = []

    for (const file of files) {
      const stat = await fs.stat(file.absolutePath)

      if (stat.size > MAX_FILE_SIZE) {
        continue
      }

      const content = await fs.readFile(file.absolutePath, "utf-8")

      result.push({
        path: file.relativePath,
        absolutePath: file.absolutePath,
        content,
        language: file.language,
        size: stat.size
      })
    }

    return result
  }
}