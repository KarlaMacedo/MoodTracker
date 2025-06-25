import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        enum: ["Trabajo", "Familia", "Amigos", "Salud", "Amor", "Finanzas", "Estudio", "Otros", "Sin clasificar"],
        default: "Sin clasificar",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Mood", moodSchema);