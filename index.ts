import mainMenu from "./menus/mainMenu";
import runBluetooth from "./utils/runBluetooth";
import scanAndConnect from "./utils/scanAndConnect";
import chalk from "chalk";
import inquirer from "inquirer";

const main = async () => {

  console.log(chalk.green("Welcome to the Bluetooth CLI!"));

  let exit = false;

  while (!exit) {
    const { action } = await inquirer.prompt(mainMenu)

    switch (action) {
      case 'Power On':
        runBluetooth("power on");
        break;
      case 'Power Off':
        runBluetooth("power off");
        break;
      case 'Scan':
        runBluetooth("scan on");
        break;
      case 'Make Discoverable':
        runBluetooth("discoverable on");
        break;
      case 'Connect':
        scanAndConnect();
        break;
      case 'Disconnect':
        runBluetooth("disconnect");
        break;
      case 'Exit':
        exit = true;
        break;
      default:
        console.log(chalk.red("Invalid option"));
        break;
    }
  }

}

main();