import { Response } from "express";
import taskService from "../services/task.service";
import StatusCodes from "../utils/statusCodes.util";
import AuthRequest from "../types/auth.types";

async function createTask(req: AuthRequest, res: Response): Promise<void> {
    try {
        const { name, description } = req.body;
        const userId = req.user.userId;

        if (!name || !description) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Name and description are required",
                data: {}
            });
            return;
        }

        const task = await taskService.createTask(userId, { name, description });

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Task created successfully",
            data: task
        });
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
            data: {}
        });
    }
}

async function getTasks(req: AuthRequest, res: Response): Promise<void> {
    try {
        const userId = req.user.userId;
        const tasks = await taskService.getUserTasks(userId);

        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: "Tasks retrieved successfully",
            data: tasks
        });
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
            data: {}
        });
    }
}

async function getTaskById(req: AuthRequest, res: Response): Promise<void> {
    try {
        const userId = req.user?.id;
        const taskId = req.params.id;

        const task = await taskService.getTaskById(userId, taskId);

        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: "Task retrieved successfully",
            data: task
        });
    } catch (error: any) {
        if (error.type == StatusCodes.NOT_FOUND) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Task not found",
                data: {}
            });
        } else if (error.type == StatusCodes.UNAUTHORIZED) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
                data: {}
            });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal server error",
                data: {}
            });
        }
    }
}

async function updateTask(req: AuthRequest, res: Response): Promise<void> {
    try {
        const userId = req.user?.id;
        const taskId = req.params.id;
        const { name, description } = req.body;

        await taskService.updateTask(userId, taskId, { name, description });

        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: "Task updated successfully",
            data: {}
        });
    } catch (error: any) {
        if (error.type == StatusCodes.NOT_FOUND) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Task not found",
                data: {}
            });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal server error",
                data: {}
            });
        }
    }
}

async function deleteTask(req: AuthRequest, res: Response): Promise<void> {
    try {
        const userId = req.user?.id;
        const taskId = req.params.id;

        await taskService.deleteTask(userId, taskId);

        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: "Task deleted successfully",
            data: {}
        });
    } catch (error: any) {
        if (error.type == StatusCodes.NOT_FOUND) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Task not found",
                data: {}
            });
        } else if (error.type == StatusCodes.UNAUTHORIZED) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
                data: {}
            });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal server error",
                data: {}
            });
        }
    }
}

export default {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
