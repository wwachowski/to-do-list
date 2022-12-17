import { Todo } from "../models/todo";

export const TODOS: Todo[] = [
    {
        id: 1,
        userId: 1,
        title: 'Do laundry',
        date: new Date(),
        done: false
    },
    {
        id: 2,
        userId: 1,
        title: 'Create real backend',
        date: new Date(),
        done: false,
        desc: 'also provide real http functionality!',
        section: 'ToDo list'
    },
    {
        id: 3,
        userId: 1,
        title: 'Buy gifts for Thomas and Jeremy',
        date: new Date(),
        done: false,
        section: 'Christmas!'
    }
];