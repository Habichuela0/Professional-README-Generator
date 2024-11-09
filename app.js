//Json packages
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';


//Licenses
const LICENSE_INFO = {
    'MIT': {
        badge: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
        notice: 'This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.'
    },
    'Apache 2.0': {
        badge: '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
        notice: 'This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.'
    },
    'GPL 3.0': {
        badge: '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
        notice: 'This project is licensed under the GNU GPL v3 - see the [LICENSE](LICENSE) file for details.'
    },
    'BSD 3': {
        badge: '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
        notice: 'This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.'
    },
    'None': {
        badge: '',
        notice: 'This project is not licensed.'
    }
};

//Collecting user input
const questions = [
    {
        type:'input',
        name: 'projectDescription',
        message: 'Please provide a description of your project',
        validate: projectDescriptionInput => {
            if (projectDescriptionInput) {
                return true
            } else {
                console.log('You must enter a project decription')
                return false
            }
        }
       
    }, 
    {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
        validate: projectNameInput => {
            if (projectNameInput) {
                return true
            } else {
                console.log('You must enter a project name')
                return false
            }
        }
    },
       { type: 'input',
        name: 'username',
        message: 'Please provide your GitHub username',
        validate: usernameInput => {
            if (usernameInput) {
                return true
            } else {
                console.log('You must enter a GitHub username')
                return false
            }
        } 
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the installation instructions?',
        default: 'npm install'
    },

    { type: 'input',
    name: 'email',
    message: 'Please provide your email address',
    validate: emailInput => {
        if (emailInput) {
            return true
        } else {
            console.log('Please enter your email address')
            return false
        }
    }

    },

    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: Object.keys(LICENSE_INFO)
    },                                                                                                          
]
// function to generate README content
function generateReadme(answers) {
    const licenseBadge = LICENSE_INFO[answers.license].badge;
    const licenseNotice = LICENSE_INFO[answers.license].notice;

    return `# ${answers.projectName}

${licenseBadge}

## Description
${answers.projectDescription}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${licenseNotice}

## Contributing
${answers.contribution}

## Tests
${answers.tests}

`;
}

async function writeToFile(fileName, data) {
    try {
        const filePath = path.join(process.cwd(), fileName);
        await fs.promises.writeFile(filePath, data);
        console.log(`Success! README.md has been generated at ${filePath}`);
    } catch (err) {
        console.error('Error writing README file:', err);
    }
}

async function init() {
    try {
        console.log('Welcome to the Professional README Generator!');
        console.log('Please answer the following questions to generate your README.md\n');
    
        //prompt user for inputs
        const answers = await inquirer.prompt(questions);
        
        //generate README content
        const readmeContent = generateReadme(answers);
        
        //write README file
        await writeToFile('README.md', readmeContent);
    } catch (err) {
        console.error('Error generating README:', err);
    }}

    //start app
    init();
