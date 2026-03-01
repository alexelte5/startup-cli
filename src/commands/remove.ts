import { Command } from "commander";
import { deleteConfig } from "../core/config";
import { logger } from "../core/logger";

export const removeCommand = new Command("remove")
    .description("Remove a project")
    .argument("<project>", "removes project from config")
    .action((project) => {
        deleteConfig(project)
        logger.success(`deleted project "${project}" from your config`)
    })