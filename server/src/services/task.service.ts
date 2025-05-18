import { PrismaClient } from "../generated/prisma";
import StatusCodes from "../utils/statusCodes.util";

const prisma = new PrismaClient();

interface TaskData {
    name: string
    description: string
}

class TaskService {
    async createTask(userId: string, { name, description }: TaskData) {
        try {
            const task = await prisma.task.create({
                data: {
                    name,
                    description,
                    userId
                }
            })
            return task;
        } catch (error) {
            console.error("Service error: ", error);
            throw error;
        }
    }

    async getUserTasks(userId: string) {
        try {
            const tasks = await prisma.task.findMany({
                where: {
                    userId
                }
            })
            return tasks;
        } catch (error) {
            console.error("Service error: ", error);
            throw error;
        }
    }

    async getTaskById(userId: string, taskId: string) {
        try {
            const task = await prisma.task.findFirst({
                where: {
                    id: taskId,
                    userId
                }
            })
            if(!task) {
                const error = new Error("Cannot find task with this id");
                (error as any).type == StatusCodes.NOT_FOUND;
                throw error;
            }
            return task;
        } catch (error) {
            console.error("Service error: ", error);
            throw error;
        }
    }

    async updateTask(userId: string, taskId: string, data: Partial<TaskData>) {
        try {
            let task = await prisma.task.findFirst({
                where: {
                    id: taskId,
                    userId
                }
            })
            if(!task) {
                const error = new Error("Cannot find task with this id");
                (error as any).type == StatusCodes.NOT_FOUND;
                throw error;
            }
            task = await prisma.task.update({
                where: {
                    userId,
                    id: taskId
                },
                data: data
            })
            return task;
        } catch (error) {
            console.error("Service error: ", error);
            throw error;
        }
    }

    async deleteTask(userId: string, taskId: string) {
        try {
            const task = await prisma.task.findFirst({
                where: {
                    id: taskId,
                    userId
                }
            })
            if(!task) {
                const error = new Error("Cannot find task with this id");
                (error as any).type == StatusCodes.NOT_FOUND;
                throw error;
            }
            await prisma.task.delete({
                where: {
                    id: taskId
                }
            })
            return true;
        } catch (error) {
            console.error("Service error: ", error);
            throw error;
        }
    }
}

const taskService = new TaskService();
export default taskService;