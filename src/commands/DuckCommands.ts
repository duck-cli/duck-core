import { resolveDir } from "../Utils/Utils.js"
import { Scanner } from "../Utils/Scanner.js"

export class DuckCommands{
    static async analyze(dir?: string): Promise<void>{
        const targetDir = resolveDir(dir)
        const scanner = new Scanner(targetDir)

        const files = await scanner.scanFiles()
        
        console.log(`Found ${files.length} files`)
        console.log(files.slice(0, 5))
    }
}