import Task from "./task.model"

interface User {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    tasks: Task[]
}

export default User;