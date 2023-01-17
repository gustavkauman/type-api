import express, { Request, Response } from "express";
import * as AnimalService from "./animals.service";
import { BaseAnimal, Animal } from "./animal.interface";

export const animalRouter = express.Router();

animalRouter.get("/", async (req: Request, res: Response) => {
    try {
        const animals: Animal[] = await AnimalService.getAll();
        res.status(200).send(animals);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

animalRouter.get("/:uuid", async (req: Request, res: Response) => {
    const uuid: string = req.params.uuid as string;
    
    try {
        const animal: Animal = await AnimalService.find(uuid);

        if (animal)
            return res.status(200).send(animal);

        res.status(404).send({ status_code: 404, message: "animal not found"});
    } catch (e) {
        res.status(500).send(e.message);
    }
});

animalRouter.post("/", async (req: Request, res: Response) => {
    try {
        const animal: BaseAnimal = req.body;

        const newAnimal = await AnimalService.create(animal);

        res.status(201).send(newAnimal);
    } catch (e) {
        res.status(500).send(e.message);
    }
});


animalRouter.put("/:uuid", async (req: Request, res: Response) => {
    const uuid: string = req.params.uuid as string;

    try {
        const animalUpdate: BaseAnimal = req.body;

        const existingData = await AnimalService.find(uuid);

        if (existingData) {
            const updatedAnimal = await AnimalService.update(uuid, animalUpdate);
            return res.status(200).json(updatedAnimal);
        }

        res.status(404).send(
            {
                status_code: 404, 
                message: "an animal was not found with the given id"
            }
        );
    } catch (e) {
        res.status(500).send(e.message);
    }
});

animalRouter.delete("/:uuid", async (req: Request, res: Response) => {
    const uuid: string = req.params.uuid as string;

    try {
        if (await AnimalService.remove(uuid) === null)
            return res.status(404).send(
                {
                    status_code: 404,
                    message: "could not find an animal with the given id"
                }
            );

        res.status(204).send();
    } catch (e) {
        res.status(500).send(e.message);
    }
});
