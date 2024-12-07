import { jest } from "@jest/globals";
import userController from "../../controller/user/userController.js";
import userModel from "../../model/userModel.js";
import errors from "../../hellpers/errors.js";

// Mock de funciones del modelo
userModel.findAll = jest.fn();
userModel.findByPk = jest.fn();
userModel.findOne = jest.fn();
userModel.create = jest.fn();

describe("User Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    /** Test para getAllUsers */
    describe("getAllUsers", () => {
        it("should return all users", async () => {
            const mockUsers = [
                { id: 1, username: "user1", email: "user1@example.com" },
                { id: 2, username: "user2", email: "user2@example.com" },
            ];
            userModel.findAll.mockResolvedValueOnce(mockUsers);

            const result = await userController.getAllUsers();
            expect(result).toEqual(mockUsers);
        });
    });

    /** Test para getUserById */
    describe("getUserById", () => {
        it("should return a user by ID", async () => {
            const mockUser = { id: 1, username: "user1", email: "user1@example.com" };
            userModel.findByPk.mockResolvedValueOnce(mockUser);

            const result = await userController.getUserById(1);
            expect(result).toEqual(mockUser);
        });
    });

    /** Test para getUserByEmail */
    describe("getUserByEmail", () => {
        it("should return a user by email", async () => {
            const mockUser = { id: 1, username: "user1", email: "user1@example.com" };
            userModel.findOne.mockResolvedValueOnce(mockUser);

            const result = await userController.getUserByEmail("user1@example.com");
            expect(result).toEqual(mockUser);
        });
    });

    /** Test para getUserByUsername */
    describe("getUserByUsername", () => {
        it("should return a user by username", async () => {
            const mockUser = { id: 1, username: "user1", email: "user1@example.com" };
            userModel.findOne.mockResolvedValueOnce(mockUser);

            const result = await userController.getUserByUsername("user1");
            expect(result).toEqual(mockUser);
        });
    });

    /** Test para createUser */
    describe("createUser", () => {
        it("should create a new user", async () => {
            const mockUser = { id: 1, username: "user1", email: "user1@example.com" };
            userModel.create.mockResolvedValueOnce(mockUser);

            const result = await userController.createUser(
                "user1",
                "user1@example.com",
                "password123"
            );
            expect(result).toEqual(mockUser);
        });
    });
});
