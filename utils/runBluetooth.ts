import { execSync } from "child_process";
import chalk from "chalk";

const runBluetooth = (command: string): void => {

    try {
        const res = execSync(
            `bluetoothctl <<< "${command}"`,
            { encoding: "utf-8" }
        )
        console.log(chalk.green(res));

    } catch (error) {

        let message;
        if (error instanceof Error) {
            message = String(error.message);
        }
        else {
            message = String(error);
        }

        console.error(chalk.red(`Error executing command: ${command}`));
        console.error(chalk.red('Error:', message));
    }
}

export default runBluetooth;