import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageOption } from '../models/messages.model';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

     constructor(private snackBar: MatSnackBar) {}

     displayMessage(message: string, action: MessageOption) {
        this.snackBar.open(message, action);
     }
}