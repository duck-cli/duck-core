export type SupportedLanguage = "ts" | "tsx" | "js" | "jsx" | "json" | "md" 

export interface ScannedFile {
    absolutePath: string
    relativePath: string
    language: SupportedLanguage
}

export interface ProjectFile{
  path: string           
  absolutePath: string
  content: string
  language: SupportedLanguage
  size: number           
}

export interface CodeFeature {
  file: string
  kind: "class" | "function" | "interface",
  languages: SupportedLanguage,
  name: string
  metadata: Record<string, unknown>
}

export interface ProjectIR{
    meta: {
        generatedAt: string
        filesAnalyzed: number
        languages: string[]
    }

    structure: {
        classes: number
        functions: number
        interfaces: number
    }

    patterns: {
        usesClasses: boolean
        usesInterfaces: boolean
        usesInheritance: boolean
        functionalStyle: boolean
    }

    exports: {
        exportedClassesRatio: number
        exportedFunctionsRatio: number
    }

    asyncUsage: {
        asyncFunctionsRatio: number
    },

    convetions: {
        fileNaming: "camelCase" | "PascalCase" | "kebab-case" | "snake_case" | "unknown"
    }
}