#!/usr/bin/env node


import figlet from "figlet";
import gradient from "gradient-string";
import { UserTasks } from "./model.js";
figlet.text('ts-todo-app', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 120,
    whitespaceBreak: true
}, ((err, data) => {
    console.log('\n');
    console.log(gradient.rainbow(data));
    console.log('\n');
    const todoInstance = new UserTasks;
    todoInstance.getInputFromUser();
}));
