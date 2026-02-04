import type { CodeFeature, ProjectFile, ProjectIR } from "../interfaces/interfaces.js";
import { detectFileNamingDominant } from "./Utils.js";
import path from "node:path";

export class IRBuilder {
    build(features: CodeFeature[], files: ProjectFile[]): ProjectIR {
        const classes: CodeFeature[] = features.filter(f => f.kind === "class")
        const functions: CodeFeature[] = features.filter(f => f.kind === "function")
        const interfaces: CodeFeature[] = features.filter(f => f.kind === "interface")

        const fileName = detectFileNamingDominant(files)

        return {
            meta: {
                generatedAt: new Date().toISOString(),
                filesAnalyzed: new Set(features.map(f => f.file)).size,
                languages: [...new Set(features.map(f => f.languages))]
            },

            structure: {
                classes: classes.length,
                functions: functions.length,
                interfaces: interfaces.length
            },

            patterns: {
                usesClasses: classes.length > 0,
                usesInterfaces: interfaces.length > 0,
                usesInheritance: classes.some(c => c.metadata.extends),
                functionalStyle: functions.length > classes.length * 2
            },

            exports: {
                exportedClassesRatio: this.ratio(
                classes,
                c => c.metadata.isExported === true
                ),
                exportedFunctionsRatio: this.ratio(
                functions,
                f => f.metadata.isExported === true
                )
            },

            asyncUsage: {
                asyncFunctionsRatio: this.ratio(
                functions,
                f => f.metadata.isAsync === true
                )
            },
            convetions: {
                fileNaming: fileName
            }

        }
    }

    private ratio(items: CodeFeature[],predicate: (f: CodeFeature) => boolean): number {
        if (items.length === 0) return 0
        return items.filter(predicate).length / items.length
    }
}