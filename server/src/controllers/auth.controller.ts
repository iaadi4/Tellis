import { Request, Response } from "express";
import authServices from "../services/auth.service";
import StatusCodes from "../utils/statusCodes.util";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

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
            return;
        }
        const user = await authServices.login({ email, password }) as User;
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
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

export async function me(req: Request, res: Response): Promise<void> {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
                data: {}
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const user = await prisma.user.findFirst({
            where: {
                id: decoded.userId
            }
        })
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "User not found",
                data: {}
            });
            return;
        }
        res.status(StatusCodes.SUCCESS).json({
            success: true,
            message: "",
            data: user
        });
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Invalid token",
            data: {}
        });
    }
}

async function logout(req: Request, res: Response): Promise<void> {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
    
        res.status(200).json({
            success: true,
            message: "User logged out successfully",
            data: {},
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Logout failed",
            data: {},
        });
    }
  }
  

export default {
    login,
    register,
    me,
    logout
}