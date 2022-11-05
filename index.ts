import { Program } from './common/program';

const numberOfTasks: number = 100;
const concurrencyMax: number = 5;
//Creating Array of random tasks
const taskList = [...Array(numberOfTasks)].map(() =>
    [...Array(~~(Math.random() * 10 + 3))].map(() =>
        String.fromCharCode(Math.random() * (123 - 97) + 97)
    ).join(''))
console.log({taskList});
const program = new Program();

program.Start(taskList, taskList.length);
