import { Command } from "commander";
import axios from "axios";
import chalk from "chalk";
import fs from "fs";

const program = new Command();
const BASE_URL = "http://localhost:3001";

program
  .name("mcp")
  .description("Modular Component Provider CLI")
  .version("0.0.1");

program
  .command("list")
  .description("List components for a specific kit")
  .argument("<kit>", "Component kit name (e.g., shadcn)")
  .action(async (kit) => {
    const { data } = await axios.get(`${BASE_URL}/${kit}/components`);
    data.forEach((comp: any) => {
      console.log(`${chalk.green(comp.name)}  -  ${chalk.gray(comp.version)}`);
    });
  });

program
  .command("get")
  .description("Get a component's code from a kit")
  .argument("<kit>", "Component kit name (e.g., shadcn)")
  .argument("<name>", "Component name (e.g., button)")
  .option("-o, --out <path>", "Write component to a file")
  .action(async (kit, name, options) => {
    const { data } = await axios.get(`${BASE_URL}/${kit}/components/${name}`);
    if (options.out) {
      fs.writeFileSync(options.out, data.code.tsx, "utf-8");
      console.log(chalk.green(`✅ Saved to ${options.out}`));
    } else {
      console.log(chalk.yellow(`🧩 ${name}.tsx`));
      console.log(data.code.tsx);
    }
  });

program.parse();
