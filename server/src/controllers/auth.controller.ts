import { Request, Response } from "express";
import authServices from "../services/auth.service";
import StatusCodes from "../utils/statusCodes.util";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET!;

async function login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Email or password missing",
                data: {}
            })
        }
        const user = await authServices.login({ email, password }) as User;
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: "User logged in successfully",
            data: user
        })
    } catch (error: any) {
        if(error.type == StatusCodes.NOT_FOUND) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "User does not exist with this email",
                data: {}
            })
        } else if(error.type == StatusCodes.UNAUTHORIZED) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Invalid credentials",
                data: {}
            })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal server error",
                data: {}
            })
        }
    }
}

async function register(req: Request, res: Response): Promise<void> {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password ) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Required fields missing",
                data: {}
            })
        }
        const user = await authServices.register({ name, email, password });
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User registered successfully",
            data: user
        })
    } catch (error: any) {
        if(error.type == StatusCodes.BAD_REQUEST) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "User already exist with this email",
                data: {}
            })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal server error",
                data: {}
            })
        }
    }
}

export default {
    login,
    register
}