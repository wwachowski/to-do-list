import { Todo } from "../models/todo";

export const TODOS: Todo[] = [
    {
        id: 1,
        userId: 1,
        title: 'Do laundry',
        date: new Date('2023-02-03 16:01'),
        done: false,
        section: { id: 2, title: 'Home', color: '#a11dc2', visible: false }
    },
    {
        id: 2,
        userId: 1,
        title: 'Create real backend',
        date: new Date('2023-02-01 04:44'),
        done: false,
        desc: 'also provide real http functionallity!',
        section: { id: 1, title: 'Job', color: '#117fd9', visible: false }
    },
    {
        id: 3,
        userId: 1,
        title: 'Buy gifts for Thomas and Jeremy',
        date: new Date('2023-02-04 22:35'),
        done: false,
        section: { id: 1, title: 'Job', color: '#117fd9', visible: false }
    },
    {
        id: 4,
        userId: 1,
        title: 'New task',
        date: new Date('2023-02-04 03:55'),
        done: false,
        desc: 'Another task!',
        section: { id: 2, title: 'Home', color: '#a11dc2', visible: false }
    },
    {
        id: 5,
        userId: 1,
        title: 'Sort?',
        date: new Date('2023-02-05 08:36'),
        done: false,
        desc: 'Test test test test',
        section: { id: 0, title: 'General', color: '#ff1100', visible: true }
    },
    {
        id: 6,
        userId: 1,
        title: 'Sort!',
        date: new Date('2023-02-05 15:09'),
        done: false,
        desc: 'Test test test test',
        section: { id: 1, title: 'Job', color: '#117fd9', visible: false }
    },
    {
        id: 7,
        userId: 1,
        title: 'My class is applied conditionally',
        date: new Date('2023-02-05 11:11'),
        done: true,
        desc: 'https://open.spotify .com/track/6r9xnu eU24r4eoG3HXC87E? si=5de02541f7444c39',
        section: { id: 0, title: 'General', color: '#ff1100', visible: true }
    }
];