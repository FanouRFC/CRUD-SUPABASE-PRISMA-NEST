export type user = {
    id: string,
    name: string,
    email: string
}

export type post = {
    id: string,
    title: string,
    content: string,
    published: boolean,
    author: user
}