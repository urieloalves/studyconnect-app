export type User = {
    id: string;
    name: string;
    email: string;
}

export type Group = {
    id: string;
    name: string;
    description: string;
    courseLink: string;
    users: User[]
}