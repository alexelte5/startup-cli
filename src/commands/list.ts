import { Command } from "commander";
import { loadConfig } from "../core/config";
import { logger } from "../core/logger";

export const listCommand = new Command("list")
    .description("Prints config-file")
    .action(() => {
        const config = loadConfig();
        if(Object.keys(config).length === 0) {
            logger.info("No existing projects");
        } else {
            console.log(JSON.stringify(config, null, 2));
        }
    })