
import request from "supertest";
import app from "../index.js";
import mongoose from "mongoose";
import { createTestUser } from "./testHelpers.js";

const API = "/api/auth";

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
}, 20000);

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
}, 20000);

describe("Auth endpoints", () => {
    const userUnique = {
        username: "TestUser",
        email: `test+${Date.now()}@example.com`,
        password: "testpassword"
    };

    it("debería registrar un nuevo usuario", async () => {
        const { res } = await createTestUser();
        expect(res.statusCode).toBe(201);
        expect(res.body.token).toBeDefined();
    });

    it("debería hacer login con ususario registrado", async () => {
        const email = `karla+${Date.now()}@example.com`;
        const rawPassword = "securepass";

        const { user, token, plainPassword } = await createTestUser({ username: "karla123", email, password: rawPassword });

        const res = await request(app).post(`${API}/login`).send({
            email,
            password: plainPassword
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    it("debería fallar al hacer login con credenciales incorrectas", async () => {
        const res = await request(app).post(`${API}/login`).send({ ...userUnique, email: "wrongemail", password: "wrongpassword" });
        expect(res.statusCode).toBe(401);
    });
});