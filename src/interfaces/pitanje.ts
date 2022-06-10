export interface IPitanje {
    id: number;
    text: string;
    isCorrect: boolean;
    dateCreated: Date;
    dateUpdated: Date;
    categories: number[];
};