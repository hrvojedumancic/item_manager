export interface TaskModel {
    id: string;
    name: string,
    created_at: string,
    description: string,
    completed: boolean,
    subtasks: string[]
};