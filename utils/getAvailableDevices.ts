import Device from "../types/Device"
import { execSync } from "child_process";
import chalk from "chalk";

const getAvailableDevice = (): Device[] => {

    try {
        const res = execSync(
            `bluetoothctl devices`,
            { encoding: "utf-8" }
        )

        const devices = res
            .trim()
            .split('\n')
            .map((device: string) => {
                const [macAddr, name] = device.split(' ');
                return { macAddr, name };
            });
            

        return devices;

    } catch (error) {

        let message;
        if (error instanceof Error) {
            message = String(error.message);
        }
        else {
            message = String(error);
        }

        console.error(chalk.red(`Error fetching available devices`));
        console.error(chalk.red('Error:', message));

        return []
    }
}

export default getAvailableDevice;