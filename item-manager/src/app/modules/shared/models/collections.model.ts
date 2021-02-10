export enum Collections {
    USERS = 'users',
    TASKS = 'tasks',
    SUBTASKS = 'subtasks'
}

export function CollectionsMap(): Collections[] {
    return [
        Collections.USERS,
        Collections.TASKS,
        Collections.SUBTASKS
    ];
}