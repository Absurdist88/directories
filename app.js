const fileParser = require('./fileParser');
const MockFileSystem = require ('./MockFileSystem');

const main = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const file = 'test-input.txt';
            const commands = await fileParser.extractCommands(file);
            const mockFS = new MockFileSystem();
            
            for (const command of commands) {
                switch (command.type) {
                    case 'CREATE':
                        console.log(`CREATE ${command.directory}`);
                        mockFS.createDir(command.directory);
                        break;
                    case 'LIST':
                        console.log('LIST');
                        mockFS.listDir();
                        break;
                    case 'MOVE':
                        console.log(`MOVE ${command.directory} ${command.arg}`);
                        mockFS.moveDir(command.directory, command.arg);
                        break;
                    case 'DELETE':
                        console.log(`DELETE ${command.directory}`);
                        mockFS.deleteDir(command.directory);
                        break;
                    default:
                        console.log(`Unknown command given: ${command.type}`);
                }
            }

            resolve('Done');
        } catch (err) {
            reject(err);
        }
    });
}


main().then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})
