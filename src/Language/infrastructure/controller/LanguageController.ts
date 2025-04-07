import { Request, Response } from "express";
import LanguageService from "../service/LanguageService";

const languageService = new LanguageService();

export async function createLanguage(req: Request, res: Response) {
    try {
        const { name } = req.body;
        const result = await languageService.create(name);
        if (!result) {
            res.status(400).json({ error: "Language already exists" });
            return;
        }
        res.status(201).json({ success: result });
    } catch (error) {
        console.error("Error creating language:", error);
        res.status(500).json({ error: "Failed to create language" });
    }
}

export async function getById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await languageService.getById(id);
        if (!result) {
            res.status(404).json({ error: "Language not found" });
            return;
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching language by ID:", error);
        res.status(500).json({ error: "Failed to fetch language" });
    }
}

export async function getByName(req: Request, res: Response) {
    try {
        const { name } = req.params;
        const result = await languageService.getByName(name);
        if (!result) {
            res.status(404).json({ error: "Language not found" });
            return;
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching language by name:", error);
        res.status(500).json({ error: "Failed to fetch language" });
    }
}

export async function getAll(req: Request, res: Response) {
    try {
        const result = await languageService.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching all languages:", error);
        res.status(500).json({ error: "Failed to fetch languages" });
    }
}

export async function deleteOne(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await languageService.delete(id);
        if (!result) {
            res.status(404).json({ error: "Language not found" });
            return;
        }
        res.status(200).json({ success: result });
    } catch (error) {
        console.error("Error deleting language:", error);
        res.status(500).json({ error: "Failed to delete language" });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const { id, name } = req.params;
        const result = await languageService.update(id, name);
        if (!result) {
            res.status(404).json({ error: "Language not found" });
            return;
        }
        res.status(200).json({ success: result });
    } catch (error) {
        console.error("Error updating language:", error);
        res.status(500).json({ error: "Failed to update language" });
    }
}
