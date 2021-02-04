import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

export abstract class BaseForm {
    public theForm: FormGroup;
    
    abstract apiRequest(formData: any): Observable<any>;

    public isSubmitDisabled(): boolean {
        return this.theForm.invalid || this.theForm.disabled;
    }

    public onSubmit(): void {
        const formData = this.theForm.value;
        this.apiRequest(formData).subscribe({
            next: (response) => this.handleSuccess(response),
            error: (error) => this.handleError(error)
        })
    }

    public abstract handleSuccess(response): void;
    public abstract handleError(response): void;
}