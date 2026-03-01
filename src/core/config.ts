import fs from "fs";
import path from "path";
import os from "os";
import { logger } from "./logger";

export type Service = {
    name: string,
    path: string,
    command: string
};

export type Project = {
    services: Service[]
};

export type Config = {
    [projectName: string]: Project
};

const CONFIG_PATH = path.join(os.homedir(), ".startup-cli", "projects.json");

export function loadConfig(): Config {
    if (!fs.existsSync(CONFIG_PATH)) return {};
    const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(raw) as Config;
};

export function saveConfig(config: Config): void {
    fs.mkdirSync(path.dirname(CONFIG_PATH), {recursive: true});
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2))
}

export function deleteConfig(project: string) {
    const config = loadConfig();
    if(config[project]) {
    delete config[project];
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    } else {
        logger.error(`Project "${project}" was not found`);
    }
}

export function editConfig(project: string, option: string) {
    switch (option) {
            case ("projectname"):
                editProjectname(project);
                break;
            case ("edit"):
                editService(project);
                break;
            case ("add"):
                addService(project);
                break;
            case ("delete"):
                deleteService(project);
                break;
            default:
                break;
    }
}

function editProjectname(project: string) {
    
}

function editService(project: string) {

}

function addService(project: string) {

}

function deleteService(project: string) {

}