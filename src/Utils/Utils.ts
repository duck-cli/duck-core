import path from "node:path";
import fs from "node:fs"

export function resolveDir(dir?: string){
    const targetDir = dir
    ? path.resolve(dir)
    : process.cwd()

    if(!fs.existsSync(targetDir))
        throw new Error(`Directory does not exist: ${targetDir}`)

    if(!fs.statSync(targetDir).isDirectory())
        throw new Error(`Path is not a directory: ${targetDir}`)
  return targetDir
}

