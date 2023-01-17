import {Animal, BaseAnimal, Giraffe} from "./animal.interface";
import {Animals} from "./animals.interface";
import {v4 as uuid} from "uuid";

// base data
let animals: Animals = {
    "607df35d-6e82-4796-a132-9ede5f64a0c92": {
        id: "607df35d-6e82-4796-a132-9ede5f64a0c92",
        name: "Peter",
        age: 25
    },
    "c9680b7d-646b-4983-869b-c3a0ef302a18": {
        id: "c9680b7d-646b-4983-869b-c3a0ef302a18",
        name: "Thomas",
        age: 30
    }
}

export const getAll = async (): Promise<Animal[]> => Object.values(animals);

export const find = async (id: string): Promise<Animal> => animals[id];

export const create = async (animal: BaseAnimal): Promise<Animal> => {
    const id = uuid();

    animals[id] = {
        id,
        ...animal
    };

    return animals[id];
}

export const update = async (
    id: string, 
    newAnimalData: BaseAnimal
): Promise<Animal | null> => {
    if (!animals[id])
        return null;

    animals[id] = {
        id,
        ...newAnimalData
    };

    return animals[id];
};

export const remove = async(id: string): Promise<null | void> => {
    const animal = await find(id);

    if (!animal)
        return null;

    delete animals[id];
};
