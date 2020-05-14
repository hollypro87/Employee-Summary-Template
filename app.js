const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs").promises;

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

async function askManager() {
    return await inquirer
        .prompt([{
            type: "input",
            name: "name",
            message: "What is your manager's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's email?",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your manager's office number?",
        }
        ]);
}

async function askEngineer() {
    return await inquirer
        .prompt([{
            type: "input",
            name: "name",
            message: "What is your engineer's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email?",
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's Github username?",
        }
        ]);
}

async function askIntern() {
    return await inquirer
        .prompt([{
            type: "input",
            name: "name",
            message: "What is your intern's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern's id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your intern's email?",
        },
        {
            type: "input",
            name: "school",
            message: "What is your intern's school?",
        }
        ])
}

async function addEmployee() {
    return await inquirer
        .prompt([{
            type: "list",
            name: "role",
            message: "Which type of employee would you like to add?",
            choices: [{
                name: "Engineer",
                value: "eng"
            },
            {
                name: "Intern",
                value: "int"
            },
            {
                name: "My Team is now complete!",
                value: "none"
            }
            ]
        }]);
}

async function init() {
    const employees = [];

    const managerRes = await askManager();
    const manager = new Manager(managerRes.name, managerRes.id, managerRes.email, managerRes.officeNumber);
    employees.push(manager);

    let employeeRole = await addEmployee();

    while (employeeRole.role !== "none") {

        if (employeeRole.role === "eng") {
            const engineerRes = await askEngineer();
            const engineer = new Engineer(engineerRes.name, engineerRes.id, engineerRes.email, engineerRes.github);
            employees.push(engineer);
        } else {
            const internRes = await askIntern();
            const intern = new Intern(internRes.name, internRes.id, internRes.email, internRes.school);
            employees.push(intern);
        }

        employeeRole = await addEmployee();
    }
    const outputHTML = render(employees);
    await fs.writeFile(outputPath, outputHTML)
    console.log("Successfully created team html!")
}

init();