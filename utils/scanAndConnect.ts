import runBluetooth from "./runBluetooth"
import getAvailableDevice from "./getAvailableDevices";
import chalk from "chalk";
import inquirer from "inquirer";
import Device from "../types/Device";

const scanAndConnect = async (): Promise<void> => {
    runBluetooth("scan on");

    const availableDevices = getAvailableDevice()

    if (availableDevices.length === 0) {
        console.log(chalk.yellow("No devices found."))
        return
    }

    const devChoice = availableDevices
        .map((device) => ({
            name: `${device.name} (${device.macAddr})`,
            value: device.macAddr
        }))

    const { selectedDevice } = await inquirer.prompt<{ selectedDevice: string }>({
        type: "list",
        name: "selectedDevice",
        message: "Select a device to connect to: ",
        choices: devChoice
    })

    runBluetooth(`connect ${selectedDevice}`)
    runBluetooth(`trust ${selectedDevice}`)
    runBluetooth(`pair ${selectedDevice}`)
    runBluetooth(`connect ${selectedDevice}`)
}

export default scanAndConnect;