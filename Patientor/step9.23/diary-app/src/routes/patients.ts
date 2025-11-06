// src/routes/patients.ts
import express from "express";
import patients from "../patients";

const router = express.Router();

router.get("/:id", function (req, res) {
        const patient = patients.find(p => p.id === req.params.id);
        if (patient) {
            res.json(patient.entries);
        } else {
            res.status(404).send({ error: "Patient not found" });
        }
    });

export default router;
