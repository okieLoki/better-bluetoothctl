import { execSync } from "child_process";
import inquirer from "inquirer";
import chalk from "chalk";

interface Device{
    name: string;
    macAddr: string;
}

const mainMenu = [
  {
    type: "list",
    name: "action",
    message: "Select an action: ",
    choices: [
      'Power On/Off',
      'Pair/Unpair',
      'Scan',
      'Connect/Disconnect',
      'Exit'
    ]
  }
]