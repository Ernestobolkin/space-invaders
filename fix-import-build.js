const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, './build');

// A simple function to fix import paths
function fixImportPaths(fileContent) {
    // This regular expression finds all import statements with the special comment
    return fileContent.replace(/from\s+['"]([^'"]+)['"]/g, (match, p1) => {
        // If the path already ends with '.js' or specific other conditions, don't change it.
        if (p1.endsWith('.js') || p1.startsWith('http') || p1.startsWith('./node_modules')) {
            return match;
        }
        // Append '.js' to the import specifier
        return `from '${p1}.js'`;
    });
}

// Recursively read all .js files and fix import paths
function fixDirectoryImports(directory) {
    fs.readdir(directory, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Error reading files:', err);
            return;
        }
        files.forEach(file => {
            const fullPath = path.join(directory, file.name);
            if (file.isDirectory()) {
                // Recurse into directories
                fixDirectoryImports(fullPath);
            } else if (file.name.endsWith('.js')) {
                // Read, fix, and write each .js file
                const content = fs.readFileSync(fullPath, 'utf8');
                const fixedContent = fixImportPaths(content);
                fs.writeFileSync(fullPath, fixedContent);
                console.log("Fixed imports in " + fullPath);
            }
        });
    });
}

// Start the process
fixDirectoryImports(directoryPath);