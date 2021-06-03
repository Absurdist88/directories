class MockFileSystem {
    constructor() {
        this.fileSystem = [];
    }

    createDir(name) {
        if (!name.includes('/')) {
            this.fileSystem.push({ dirName: name, subDirs: null });

            this.sortDirectories(this.fileSystem);
            return;
        }

        const nestedDirs = name.split('/');
        const rootDirName = nestedDirs.shift();

        if (nestedDirs.length === 1) {
            const dir = this.fileSystem.find(dir => dir.dirName === rootDirName);
            if (!dir.subDirs) dir.subDirs = [];
            dir.subDirs.push({ dirName: nestedDirs.shift(), subDirs: null });

            this.sortDirectories(this.fileSystem);
            return;
        }

        let nearestParentDir = null;
        const rootDir = this.fileSystem.find(dir => dir.dirName === rootDirName);
        const newDir = nestedDirs.pop();

        for (const dirName of nestedDirs) {
            if (!nearestParentDir) {
                nearestParentDir = rootDir.subDirs.find(dir => dir.dirName === dirName);

                continue;
            }

            nearestParentDir = nearestParentDir.subDir.find(dir => dir.dirName === dirName);
        }

        if (!nearestParentDir.subDirs) nearestParentDir.subDirs = [];
        nearestParentDir.subDirs.push({ dirName: newDir, subDirs: null });

        this.sortDirectories(this.fileSystem);
    }

    moveDir(src, dest) {
        if (!src.includes('/')) {
            const srcDir = this.fileSystem.find(dir => dir.dirName === src);
            const destDir = this.fileSystem.find(dir => dir.dirName === dest);

            if (!destDir.subDirs) destDir.subDirs = [];
            destDir.subDirs.push(srcDir);

            this.deleteDir(src);
            this.sortDirectories(this.fileSystem);

            return;
        }

        
        const createName = `${dest}/${src.split('/').pop()}`;
        this.createDir(createName);
        this.deleteDir(src);
        this.sortDirectories(this.fileSystem);
    }

    deleteDir(target) {
        if (!target.includes('/')) {
            this.fileSystem = this.fileSystem.filter(dir => dir.dirName !== target);

            return;
        }

        const pathArr = target.split('/');
        const targetDirName = pathArr.pop();
        const rootDirName = pathArr.shift();

        let currentDir = this.fileSystem.find(dir => dir.dirName === rootDirName);

        if (!currentDir) {
            console.log(`Cannot delete ${target} - ${rootDirName} does not exist`);

            return;
        }

        if (pathArr.length !== 0) {
            for (const path of pathArr) {
                currentDir = currentDir.subDirs.find(dir => dir.dirName === path);
            }
        }

        currentDir.subDirs = currentDir.subDirs.filter(dir => dir.dirName !== targetDirName);
    }

    listDir() {
        for (const dir of this.fileSystem) {
            console.log(dir.dirName)

            if (!dir.subDirs) continue;

            for (const subDir of dir.subDirs) {
                this.printChildren(subDir, 1);
            }
        }
    }

    printChildren(dir, depth) {
        if (!dir) return;

        const indent = this.getIndent(depth);
        console.log(`${indent}${dir.dirName}`);

        if (!dir.subDirs) return;

        for (const subDir of dir.subDirs) {
            this.printChildren(subDir, depth + 1);
        }
    }

    getIndent(count) {
        let indent = '';
        for (let i = 0; i < count; i++) {
            indent += '  ';
        }

        return indent;
    }

    sortDirectories(dirs) {
        if (!dirs) return;

        dirs.sort((a, b) => (a.dirName > b.dirName) ? 1 : -1);

        for (const dir of dirs) {
            this.sortDirectories(dir.subDirs);
        }
    }
}

module.exports = MockFileSystem;
