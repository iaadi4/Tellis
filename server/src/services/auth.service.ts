import { PrismaClient } from "../generated/prisma";
import StatusCodes from "../utils/statusCodes.util"; 
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface SignupData {
    name: string
    email: string
    password: string
}

interface LoginData extends Omit<SignupData, "name"> {};

class AuthServices {
    async register({ name, email, password }: SignupData) {
        try {
            let user = await prisma.user.findFirst({
                where: {
                    email
                }
            })
            if(user) {
                const error = new Error("User already exist with this email");
                (error as any).type = StatusCodes.BAD_REQUEST;
                throw error;
            }
            const hashedPassword = bcrypt.hashSync(password, 10);
            user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            })
            return user;
        } catch (error) {
            console.error("Service error: ", error);
            throw error;
        }
    }

    async login({ email, password }: LoginData) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email
                }
            })
            if(!user) {
                const error = new Error("User doen't exist with this email.");
                (error as any).type = StatusCodes.NOT_FOUND;
                throw error;
            }
            const comparePassword = bcrypt.compareSync(password, user.password);
            if(!comparePassword) {
                const error = new Error("Wrong password");
                (error as any).type = StatusCodes.UNAUTHORIZED;
                throw error;
            }
            return user;
        } catch (error) {
            console.error("Service error: ", error);
            throw error;
        }
    }
}

const authServices = new AuthServices();
export default authServices;