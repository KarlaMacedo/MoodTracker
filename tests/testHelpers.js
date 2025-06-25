import request from "supertest";
import app from "../index.js";

const createTestUser = async (override = {}) => {
    const user = { username: "TestUser", email: "test@example.com", password: "testpassword" };
    const userData = { ...user, ...override };

    const response = await request(app).post("/api/auth/register").send(userData);

    return {
        user: response.body.user,
        plainPassword: userData.password,
        token: response.body.token,
        res: response
    };
};


const loginTestUser = async (email, password) => {
    const response = await request(app).post("/api/auth/login").send({ email, password });
    return {
        token: response.body.token,
        res: response
    }
};

export { createTestUser, loginTestUser };
