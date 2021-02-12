
export enum MessageOption {
    SUCCESS = 'Success',
    ERROR = 'Error',
    OK = 'Ok'
}

export function MessageOptionMap(): MessageOption[] {
    return [MessageOption.SUCCESS, MessageOption.ERROR]; 
}