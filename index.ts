#!/usr/bin/env node
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';

const mainMenu = [
  {
    type: 'list',
    name: 'action',
    message: 'Select an action:',
    choices: ['Power On', 'Power Off', 'Scan', 'Make Discoverable', 'Connect', 'Exit'],
  },
];

const main = async () => {
  console.log(chalk.blue('Bluetooth CLI App'));

  while (true) {
    const { action } = await inquirer.prompt(mainMenu);

    switch (action) {
      case 'Power On':
        runBluetoothCommand('power on');
        break;
      case 'Power Off':
        runBluetoothCommand('power off');
        break;
      case 'Scan':
        runBluetoothCommand('scan on');
        break;
      case 'Make Discoverable':
        runBluetoothCommand('discoverable on');
        break;
      case 'Connect':
        await scanAndConnect();
        break;
      case 'Exit':
        console.log('Exiting the Bluetooth CLI app.');
        process.exit(0);
      default:
        console.log(chalk.red('Invalid option. Please try again.'));
    }
  }
};

function runBluetoothCommand(command) {
  try {
    const output = execSync(`bluetoothctl <<< "${command}"`, { encoding: 'utf-8' });
    console.log(chalk.green(output));
  } catch (error) {
    console.error(chalk.red(`Error executing command: ${command}`));
    console.error(chalk.red('Error:', error.message));
  }
}

async function scanAndConnect() {
  // Run a scan to discover devices
  runBluetoothCommand('scan on');

  // Get a list of available devices
  const availableDevices = getAvailableDevices();

  if (availableDevices.length === 0) {
    console.log(chalk.yellow('No devices found. Please make sure there are discoverable devices nearby.'));
    return;
  }

  // Allow the user to select a device to connect to
  const { selectedDevice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedDevice',
      message: 'Select a device to connect to:',
      choices: availableDevices,
    },
  ]);

  runBluetoothCommand(`pair ${selectedDevice}`);
  runBluetoothCommand(`connect ${selectedDevice}`);
}

function getAvailableDevices() {
  try {
    const output = execSync('bluetoothctl devices', { encoding: 'utf-8' });
    const devices = output
      .trim()
      .split('\n')
      .map((line) => line.split(' ')[1]);
    return devices;
  } catch (error) {
    console.error(chalk.red('Error fetching available devices.'));
    return [];
  }
}

main();
