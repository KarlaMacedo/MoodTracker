import Mood from "../models/Mood.js";

export const createMood = async (req, res) => {
    try {
        const { text, tag } = req.body;
        const mood = await Mood.create({ user: req.user._id, text, tag });
        res.status(201).json(mood);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al guardar el registro emocional" });
    }
};

export const getMoods = async (req, res) => {
    try {
        const { tag, startDate, endDate, page = 1, limit = 10 } = req.query;
        const query = { user: req.user._id };
        if (tag) query.tag = tag;
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) query.createdAt.$lte = new Date(endDate);
        if (startDate && endDate) query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [total, moods] = await Promise.all([
            Mood.countDocuments(query),
            Mood.find(query).sort({ createdAt: -1 }).limit(parseInt(limit)).skip(skip)
        ]);
        const totalPages = Math.ceil(total / parseInt(limit));
        res.status(200).json({
            moods,
            pagination: {
                total,
                totalPages,
                currentPage: parseInt(page),
                perPage: parseInt(limit)
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los registros emocionales" });
    }
};

export const updateMood = async (req, res) => {
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
};

export const deleteMood = async (req, res) => {
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
};