import { Section } from "./section";

export interface Todo {
    id: number,
    userId: number,
    title: string,
    date: Date,
    done: boolean,
    desc?: string,
    section?: Section
}