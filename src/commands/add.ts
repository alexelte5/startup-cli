import { Command } from "commander";
import inquirer from "inquirer";
import { logger } from "../core/logger";
import { loadConfig, saveConfig, Service } from "../core/config";

export const addCommand = new Command("add")
    .description("Add a project")
    .action(async () => {
        const {projectName} = await inquirer.prompt([
            {type: "input", name: "projectName", message: "Project name:"}
        ]);

        const services: Service[] = [];
        let addMore = true;
        while(addMore) {
            const service = await inquirer.prompt([
                {type: "input", name: "name", message: "Service name (e.g. frontend):"},
                {type: "input", name: "path", message: "Path to service:"},
                {type: "input", name: "command", message: "Start command"}
            ]);
            services.push(service);
            const {another} = await inquirer.prompt([
                {type: "confirm", name: "another", message: "Add another service?", default: false}
            ]);
            addMore = another;
        };

        const config = loadConfig();
        config[projectName] = {services};
        saveConfig(config);
        logger.success(`Project "${projectName}" saved with ${services.length} service(s)`);
    })