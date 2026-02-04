import { Project } from "ts-morph"
import type { ProjectFile, SupportedLanguage } from "../interfaces/interfaces.js"
import type { CodeFeature } from "../interfaces/interfaces.js"

export class AstAnalyzer {
  static analyze(files: ProjectFile[]) {
    const project = new Project({
      useInMemoryFileSystem: true
    })

    for (const file of files) {
      if (file.language === "ts" || file.language === "tsx") {
        project.createSourceFile(file.path, file.content)
      }
    }

    const features: CodeFeature[] = []

    for (const sourceFile of project.getSourceFiles()) {
      const filePath = sourceFile.getFilePath()

      for (const cls of sourceFile.getClasses()) {
        features.push({
          file: filePath,
          languages: sourceFile.getExtension().replace(".", "") as SupportedLanguage,
          kind: "class",
          name: cls.getName() || "UnnamedClass",
          metadata: {
            isExported: cls.isExported(),
            hasDefaultExport: cls.isDefaultExport(),
            isAbstract: cls.isAbstract(),
            extends: cls.getExtends()?.getExpression().getText() ?? null,
            implements: cls.getImplements().map(impl => impl.getText())
          }
        })
      }

      for (const func of sourceFile.getFunctions()) {
        features.push({
          file: filePath,
          kind: "function",
          languages: sourceFile.getExtension().replace(".", "") as SupportedLanguage,
          name: func.getName() || "UnnamedFunction",
          metadata: {
            isAsync: func.isAsync(),
            isExported: func.isExported(),
            paramsCount: func.getParameters().length
          }
        })
      }
        
      for (const iface of sourceFile.getInterfaces()) {
        features.push({
            file: filePath,
            kind: "interface",
            languages: sourceFile.getExtension().replace(".", "") as SupportedLanguage,
            name: iface.getName() || "UnnamedInterface",
            metadata: {
                propertiesCount: iface.getProperties().length,
                extends: iface.getExtends().map(e => e.getText())
            }
        })
      }
    }

    return features
  }
}
