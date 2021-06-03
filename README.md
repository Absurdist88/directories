# Input File
- Create file containing set of commands
- Default filename is `test-input.txt`
- If other filename is desired, update app.js with new filename

# Command Format
- `CREATE [dir]` - Creates new directory
- `MOVE [sourceDir] [destDir]` - Moves given source directory and it's children to destination directory
- `DELETE [targetDir]` - Removes given directory and it's children
- `LIST` - Prints the current state of the full filesystem

# To Run
- `node app.js`