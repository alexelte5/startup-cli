import { Command } from "commander";
import { loadConfig } from "../core/config";
import { logger } from "../core/logger";
import { runAllServices } from "../core/runner";

export const startCommand = new Command("start")
    .description("Start a project")
    .argument("<project>", "Name of the project")
    .action((project: string) => {
        const config = loadConfig();
        const services = config[project].services
        if(services) {
            runAllServices(services);
        } else {
            logger.error(`cannot start project "${project}.`)
        }
    })