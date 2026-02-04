#!/usr/bin/env node

import { Command } from "commander"
import { DuckCommands } from "./commands/DuckCommands.js"

const program: Command = new Command()

program
    .name("duck")
    .description("Duck is a cli governance for contexts and patterns of your codebase")
    .version("0.0.1")

program.command("analyze [directory]")
    .action(DuckCommands.analyze)

program.parse(process.argv)