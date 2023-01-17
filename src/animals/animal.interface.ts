export interface BaseAnimal {
    name: string;
    age: number;
}

export interface Animal extends BaseAnimal {
    id: string;
}
