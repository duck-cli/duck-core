type SupportedLanguage = "ts" | "tsx" | "js" | "jsx" | "json" | "md" 

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
  kind: "class" | "function" | "interface"
  name: string
  metadata: Record<string, unknown>
}