import { User } from "../models/user";

export const USERS: User[] = [
    {
        id: 1,
        name: '123',
        token: 'asghadtjtaysadrshghersh',
        sections: [
            { id: 0, title: 'General', color: '#ff1100', visible: true },
            { id: 1, title: 'Job', color: '#117fd9', visible: false },
            { id: 2, title: 'Home', color: '#a11dc2', visible: false }
        ]
    }
];