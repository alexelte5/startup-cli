import { Command } from "commander";
import inquirer from "inquirer";
import { loadConfig, saveConfig } from "../core/config";
import { logger } from "../core/logger";

export const editCommand = new Command("edit")
  .description("edit a project")
  .argument("<project>", "Name of project")
  .action(async (project: string) => {
    if (!checkIfProjectExists(project)) return;

    const { option } = await inquirer.prompt([
      {
        type: "select",
        name: "option",
        message: "What would you like to edit?",
        choices: [
          {
            name: "Project name",
            value: "projectname",
          },
          {
            name: "Edit Service",
            value: "edit",
          },
          {
            name: "Add Service",
            value: "add",
          },
          {
            name: "Delete Service",
            value: "delete",
          },
        ],
      },
    ]);
    switch (option) {
      case "projectname":
        editProjectName(project);
        break;
      case "edit":
        editService(project);
        break;
    }
  });

function checkIfProjectExists(project: string): boolean {
  const config = loadConfig();
  if (config[project]) {
    return true;
  } else {
    logger.error(`Project with the name: "${project}" not found.`);
    return false;
  }
}

async function editProjectName(project: string) {
  const { newName } = await inquirer.prompt([
    {
      type: "input",
      name: "newName",
      message: "Edit projectname:",
      default: project,
    },
  ]);
  if (newName.trim() == "") {
    logger.error("Unable to change projectname.");
    logger.error("Projectname cannot be empty!");
    return;
  }
  const config = loadConfig();
  if (config[newName]) {
    logger.error(`Project "${newName}" already exists!`);
    return;
  }
  config[newName] = config[project];
  delete config[project];
  saveConfig(config);
  logger.success(`Renamed "${project}" to "${newName}"!`);
}

async function editService(project: string) {
  const config = loadConfig();
  const rawServices = config[project].services;
  const services = rawServices.map((service) => service.name);

  const { toEditService } = await inquirer.prompt([
    {
      type: "select",
      name: "toEditService",
      message: "Which service do you want to edit?",
      choices: services.map((service) => ({
        name: service,
        value: service,
      })),
    },
  ]);

  const current = rawServices.find((service) => service.name === toEditService)!;
  const editedService = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Service name (e.g. frontend):",
      default: current.name,
    },
    {
      type: "input",
      name: "path",
      message: "Path to service:",
      default: current.path,
    },
    {
      type: "input",
      name: "command",
      message: "Start command",
      default: current.command,
    },
  ]);

  config[project].services = rawServices.map((service) =>
    service.name === toEditService ? editedService : service,
  );
  saveConfig(config);

  logger.success(`Service "${editedService.name}" updated!`);
}
