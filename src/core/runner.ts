import { spawn } from "child_process";
import { Service } from "./config";

export function runService(service: Service): void {
  const [cmd, ...args] = service.command.split(" ");
  const process = spawn(cmd, args, {
    cwd: service.path,      // startet den prozess im richtigen ordner
    stdio: "inherit",       // output wird direkt in deine konsole weitergeleitet
    shell: true,
  });

  process.on("error", (err) => {
    console.error(`❌ ${service.name} failed: ${err.message}`);
  });
}

export function runAllServices(services: Service[]): void {
  for (const service of services) {
    console.log(`▶ Starting ${service.name}...`);
    runService(service);
  }
}