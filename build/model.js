import chalk from 'chalk';
import inquirer from 'inquirer';
class Todo {
    constructor() {
        this.user = '';
        this.tasks = [];
    }
    write_todo() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'task',
                message: chalk.bgGreen('📝 write your task here:  ex: '),
                default: chalk.yellow('checking mails')
            },
            {
                type: 'confirm',
                name: 'ischecked',
                message: chalk.bgGreen('Has your task completed: ')
            }
        ]).then((ans) => {
            const date_ob = new Date();
            const day = ("0" + date_ob.getDate() + 1).slice(-2);
            const month = ("0" + date_ob.getMonth() + 1).slice(-2);
            const year = date_ob.getFullYear();
            const hour = date_ob.getHours();
            const minute = date_ob.getMinutes();
            const second = date_ob.getSeconds();
            const date = `${day}-${month}-${year} ${hour}:${minute}:${second}`;
            const task = {
                task: ans.task,
                completed: ans.ischecked ? chalk.yellow('✔️  completed') : chalk.yellow('⏳  incompleted'),
                date
            };
            console.log(chalk.bgCyan(`task:   ${chalk.green(task.task)}\nmark as:   ${chalk.green(task.completed)}\ncreatedAt:  ${chalk.yellow(date)}`));
            this.tasks.push(task);
            console.log(`_____________`);
            this.displayList();
        });
    }
    displayList() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'nextmove',
                message: chalk.yellow(`${chalk.cyan.bold(this.user)}, choose what you want now?`),
                choices: [
                    {
                        name: chalk.yellow('add more tasks'),
                        value: 'addTask'
                    },
                    {
                        name: chalk.yellow('See all tasks'),
                        value: 'allTasks'
                    },
                    {
                        name: chalk.yellow('Exit'),
                        value: 'exit'
                    },
                ]
            }
        ]).then((ans) => {
            switch (ans.nextmove) {
                case 'addTask':
                    this.write_todo();
                    break;
                case 'allTasks':
                    console.log('\n');
                    console.log(chalk.magenta('_____ALL TASKS_____'));
                    this.tasks.map((task, i) => {
                        console.log(chalk.cyan(`_______ ${chalk.green(i + 1)} ______\ntask:   ${chalk.magenta(task.task)}\nmark as:   ${chalk.magenta(task.completed)}\ncreatedAt:  ${chalk.magenta(task.date)}`));
                        console.log('\n');
                    });
                    console.log((chalk.magenta('_____END TASKS_____')));
                    console.log('\n');
                    this.displayList();
                    break;
                case 'exit':
                    console.log('\n');
                    console.log(chalk.bgGreen('Enjoy your day. Thanks'));
            }
        });
    }
}
export class UserTasks extends Todo {
    getInputFromUser() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'user',
                message: chalk.bgCyan('Please Enter your name:'),
                default: chalk.magenta('John Doe')
            }
        ]).then((ans) => {
            this.user = ans.user;
            console.log(chalk.green(`_____________\nHi ${chalk.bold.yellow(this.user)}, \nWhat's in your mind.\nBring all your tasks.\nOrganize your work.\n_____________`));
            this.write_todo();
        });
    }
}
