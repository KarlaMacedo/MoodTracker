import express from "express";
import authMiddleware from "../middleware/auth.js";
import Mood from "../models/Mood.js";
import ms from "ms";

const router = express.Router();

//POST create
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { text, tag } = req.body;
        const mood = await Mood.create({ user: req.user._id, text, tag });
        res.status(201).json(mood);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al guardar el registro emocional" });
    }
});

//GET all and filter
router.get("/", authMiddleware, async (req, res) => {
    try {
        const { tag, startDate, endDate } = req.query;
        const query = { user: req.user._id };
        if (tag) query.tag = tag;
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) query.createdAt.$lte = new Date(endDate);
        if (startDate && endDate) query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        const moods = await Mood.find(query).sort({ createdAt: -1 });
        res.status(200).json(moods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los registros emocionales" });
    }
});

//PUT update
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { text, tag } = req.body;
        const updateMood = await Mood.findOneAndUpdate(
            { user: req.user._id, _id: req.params.id },
            { text, tag }, { new: true }
        );

        if (!updateMood) {
            return res.status(404).json({ message: "Registro emocional no encontrado" });
        }

        res.status(200).json(updateMood);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el registro emocional" });
    }
});

//DELETE delete
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deleteMood = await Mood.findOneAndDelete({ user: req.user._id, _id: req.params.id });
        if (!deleteMood) {
            return res.status(404).json({ message: "Registro emocional no encontrado" });
        }
        res.status(200).json({ msg: "Registro emocional eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el registro emocional" });
    }
});

export default router;