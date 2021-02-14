export enum Collections {
    USERS = 'users',
    TASKS = 'tasks'
}

export function CollectionsMap(): Collections[] {
    return [
        Collections.USERS,
        Collections.TASKS
    ];
}