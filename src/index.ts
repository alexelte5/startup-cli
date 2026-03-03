#!/usr/bin/env node
import { Command } from "commander";
import { startCommand } from "./commands/start";
import { addCommand } from "./commands/add";
import { removeCommand } from "./commands/remove";
import { listCommand } from "./commands/list";
import { editCommand } from "./commands/edit";

const program = new Command();

program
  .name("startup")
  .description("Start your projects with 1 command")
  .version("0.1.0");

program.addCommand(startCommand); //TODO: implement a "depends-on" function
program.addCommand(addCommand);
program.addCommand(removeCommand);
program.addCommand(listCommand);
program.addCommand(editCommand); //TODO: edit/add/delete service

program.parse();
