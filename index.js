//imports required modules
const fs = require('fs');
const inquirer = require('inquirer');
const buildHtml = require();
// imports classes
const Employee = [];
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');

//builds the validate func to save space in classes below. Will only stop blank inputs, not incorrect format inputs.
validated = (input) => {
    if(input) {
        return true;
    } return "Please fill in";
};


const workplaceArr = [];

//add manager func
const addManager = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter Managers name",
            validate: validated,
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the managers ID?",
            validate: validated,
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the Managers email?",
            validate: validated,
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the Managers office number?",
            validate: validated,
        },
    ])
    .then(managerData => {
        const{ name, id, email, officeNumber} = managerData;
        const manager = new Manager (name, id, email, officeNumber);

        workplaceArr.push(manager)
        console.log(manager);
    })
}

const addMember = () => {
    console.log(`
    =================
    Adding employees to the team
    =================
    `);

    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "Please choose Team members role",
            choices: ['Engineer', 'Intern'],
        },
        {
            type: 'input',
            name: 'name',
            message: "Enter Team members name",
            validate: validated,
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the Team members ID?",
            validate: validated,
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the Team members email?",
            validate: validated,
        },
        {
            type: 'input',
            name: 'Github',
            message: "What is the Engineer's Github?",
            when: (input) => input.role === "Engineer",
            validate: validated,
        },
        {
            type: 'input',
            name: 'university',
            message: "Which University did the intern attend?",
            when: (input) => input.Intern === "Intern",
            validate: validated,
        },
        {
            type: 'confirm',
            name: 'confirmAddMember',
            message: "Would you like to add any more Team members?",
            default: false,
        },
    ])
    .then(teamMemberData => {
        const { name, id, email, github, university} = teamMemberData;
        const teamMember;

        if(role === "Engineer") {
            teamMember = new Engineer (name, id, email, github);
            console.log(teamMember);
        }
            else if(role === "Intern"){
                teamMember = new Intern (name, id, email, university);
                console.log(teamMember);
            }
        
        workplaceArr.push(teamMember);
        
        if(confirmAddMember){
            return addMember(workplaceArr);
        } else { 
            return workplaceArr;
        }
    })
};
