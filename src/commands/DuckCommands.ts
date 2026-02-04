import { resolveDir } from "../Utils/Utils.js"
import { Scanner } from "../Utils/Scanner.js"
import { FileLoader } from "../Utils/FileLoader.js"
import { AstAnalyzer } from "../Utils/AstAnalyze.js"
import { IRBuilder } from "../Utils/IrBuilder.js"
import type { CodeFeature, ProjectFile, ScannedFile } from "../interfaces/interfaces.js"

export class DuckCommands{
    static async analyze(dir?: string): Promise<void>{
        const targetDir: string = resolveDir(dir)
        const scanner: Scanner = new Scanner(targetDir)
        const fileLoader: FileLoader = new FileLoader()
        const irBuilder: IRBuilder = new IRBuilder()

        const files: ScannedFile[]  = await scanner.scanFiles()
        const projectFiles: ProjectFile[] = await fileLoader.load(files)
        const codeFeatures: CodeFeature[] = AstAnalyzer.analyze(projectFiles)
        const IRmodel = irBuilder.build(codeFeatures, projectFiles)

        console.log(`Found ${files.length} files`)
        console.log(`Loaded ${projectFiles.length} files`)
        console.log("Project IR Model:", JSON.stringify(IRmodel, null, 2))
    }
}