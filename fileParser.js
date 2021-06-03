const fs = require('fs');

const extractCommands = async (file) => {
    const rawFileData = await fs.promises.readFile(file, 'utf-8');
    const rawCommandList = rawFileData.split("\n");

    const cleanedCommands = rawCommandList.map((command) => {
        return command.replace('\r', '');
    });

    return constructCommandArray(cleanedCommands);
};

const constructCommandArray = (commands) => {
    let commandsArr = [];

    for (const commandString of commands) {
        const splitCommand = commandString.split(' ');
        const type = splitCommand[0];
        const directory = splitCommand[1] ? splitCommand[1] : null;
        const arg = splitCommand[2] ? splitCommand[2] : null;

        const command = {
            'type': type,
            'directory': directory,
            'arg': arg,
        };

        commandsArr.push(command);
    }

    return commandsArr;
};

module.exports = {extractCommands};
