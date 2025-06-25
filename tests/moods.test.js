
import request from "supertest";
import app from "../index.js";
import mongoose from "mongoose";
import Mood from "../src/models/Mood.js";
import User from "../src/models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createTestUser, loginTestUser } from "./testHelpers.js";

const API = "/api/mood";

let token;
let moodId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    const password = await bcrypt.hash("testpassword", 10);
    const user = await User.create({ username: "TestUser", email: "test@example.com", password });
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
}, 20000);

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
}, 20000);

describe("Mood endpoints", () => {
    it("debería crear un nuevo registro emocional", async () => {
        const response = await request(app)
            .post(`${API}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ text: "Test mood", tag: "Trabajo" });
        expect(response.statusCode).toBe(201);
        expect(response.body.text).toBe("Test mood");
        expect(response.body.tag).toBe("Trabajo");
        moodId = response.body._id;
    });

    it("debería obtener todos los registros emocionales del usuario", async () => {
        const response = await request(app)
            .get(`${API}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.moods)).toBe(true);
        expect(response.body.moods.length).toBeGreaterThan(0);
        expect(response.body.pagination).toBeDefined();
    });

    it("debería filtrar los registros emocionales por tag", async () => {
        const response = await request(app)
            .get(`${API}?tag=Trabajo`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.moods[0].tag).toBe("Trabajo");
    });

    it("debería actualizar un registro emocional", async () => {
        const response = await request(app)
            .put(`${API}/${moodId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ text: "Registro emocional actualizado", tag: "Familia" });
        expect(response.statusCode).toBe(200);
        expect(response.body.text).toBe("Registro emocional actualizado");
        expect(response.body.tag).toBe("Familia");
    });

    it("debería eliminar un registro emocional", async () => {
        const response = await request(app)
            .delete(`${API}/${moodId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.msg).toBe("Registro emocional eliminado");
    });
});