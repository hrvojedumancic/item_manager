
export enum MessageOption {
    SUCCESS = 'Success',
    ERROR = 'Error'
}

export function MessageOptionMap(): MessageOption[] {
    return [MessageOption.SUCCESS, MessageOption.ERROR]; 
}