import { resolveDir } from "../Utils/Utils.js"
import { Scanner } from "../Utils/Scanner.js"
import { FileLoader } from "../Utils/FileLoader.js"
import { AstAnalyzer } from "../Utils/AstAnalyze.js"

export class DuckCommands{
    static async analyze(dir?: string): Promise<void>{
        const targetDir = resolveDir(dir)
        const scanner = new Scanner(targetDir)
        const fileLoader = new FileLoader()

        const files = await scanner.scanFiles()
        const projectFiles = await fileLoader.load(files)
        const codeFeatures = AstAnalyzer.analyze(projectFiles)

        console.log(`Found ${files.length} files`)
        console.log(`Loaded ${projectFiles.length} files`)
        console.log(`code features: ${codeFeatures.map(f => `${f.kind}: ${f.name} in ${f.file} metadata: ${JSON.stringify(f.metadata)}`).join("\n")}`)
    }
}