import inquirer from 'inquirer';

class Todo {
    user='';
    tasks: { task: string; completed: string; date: string }[]=[]
    
    write_todo(): void {
        inquirer.prompt([
            {
                type: 'input',
                name: 'task',
                message: '📝 write your task here:  ex: ',
                default: 'checking mails' 
            },
            {
                type: 'confirm',
                name: 'ischecked',
                message: 'Has your task completed: '
            }
        ]).then((ans) => {
            const date_ob = new Date();
            const day = ("0" + date_ob.getDate() + 1).slice(-2);
            const month = ("0" + date_ob.getMonth() + 1).slice(-2);
            const year = date_ob.getFullYear();
            const hour = date_ob.getHours();
            const minute = date_ob.getMinutes();
            const second = date_ob.getSeconds();
            
            const date = `${day}-${month}-${year} ${hour}:${minute}:${second}`
            const task = {
                task: ans.task,
                completed: ans.ischecked ? '✔️  completed' : '⏳  incompleted',
                date
            };
            console.log(`_____________\ntask:   ${task.task}\nmark as:   ${task.completed}\ncreatedAt:  ${date}`)
            this.tasks.push(task);
            console.log(`_____________`);
            this.displayList();
        })
    }

    displayList(): void {
        inquirer.prompt([
            {
                type: 'list',
                name: 'nextmove',
                message: `${this.user}, choose what you want now?`,
                choices: [
                    {
                        name: 'add more tasks',
                        value: 'addTask'
                    },
                    {
                        name: 'See all tasks',
                        value: 'allTasks'
                    },
                    {
                        name: 'Exit',
                        value: 'exit'
                    },
                ]
            }
        ]).then ((ans) => {
            switch(ans.nextmove) {
                case 'addTask':
                   this.write_todo();
                break;
                case 'allTasks':
                    console.log('\n')
                    console.log('_____ALL TASKS_____');
                    this.tasks.map((task, i: number) => {
                        console.log(`_______ ${i+1} ______\ntask:   ${task.task}\nmark as:   ${task.completed}\ncreatedAt:  ${task.date}`);
                        console.log('\n');
                    });
                    console.log('_____END TASKS_____');
                    console.log('\n')
                    this.displayList();
                break;    
                case 'exit':
                    console.log('\nEnjoy your day. Thanks\n')
                        
            }
        })
    }
}

export class UserTasks extends Todo {

    getInputFromUser(): void {
        inquirer.prompt([
            {
                type: 'input',
                name: 'user',
                message: 'Please Enter your name:',
                default: 'John Doe'
            }
        ]).then((ans) => {
            this.user = ans.user;
            console.log(`_____________\nHi ${this.user}, \nWhat's in your mind.\nBring all your tasks.\nOrganize your work.\n_____________`);
            this.write_todo()
        })
    }
}
