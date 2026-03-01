import { Command } from "commander";
import inquirer from "inquirer";
import { editConfig, loadConfig, saveConfig } from "../core/config";
import { logger } from "../core/logger";

export const editCommand = new Command("edit")
    .description("edit a project")
    .argument("<project>", "Name of project")
    .action(async (project: string) => {
        
        if (!checkIfProjectExists(project)) return;

        const { option } = await inquirer.prompt([{
                type: "select", 
                name: "option", 
                message: "What would you like to edit?", 
                choices: [
                    {
                        name: "Project name",
                        value: "projectname"
                    }, 
                    {
                        name: "Edit Service",
                        value: "edit"
                    }, 
                    {
                        name: "Add Service",
                        value: "add"
                    }, 
                    {
                        name: "Delete Service",
                        value: "delete"
                    }
                ]
            }
        ]);
        switch(option) {
            case ("projectname"):
                const { newName } = await inquirer.prompt([
                    {type: "input", name: "newName", message: "Edit projectname:", default: project}
                ]);
                if(newName.trim() == "") {
                    logger.error("Unable to change projectname.");
                    logger.error("Projectname cannot be empty!");
                    break;
                }
                const config = loadConfig()
                if(config[newName]) {
                    logger.error(`Project "${newName}" already exists!`);
                    break;
                }
                config[newName] = config[project];
                delete config[project];
                saveConfig(config);
                logger.success(`Renamed "${project}" to "${newName}"!`)
                break;
        }
    });

function checkIfProjectExists(project: string): boolean {
    const config = loadConfig();
    if(config[project]) {
        return true;
    } else {
        logger.error(`Project with the name: "${project}" not found.`)
        return false;
    }
}
