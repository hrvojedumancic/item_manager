import { EmailValidator, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { AngularFireService } from "../../services/auth.service";

export abstract class BaseForm {

    public theForm: FormGroup;
    protected angularFireService: AngularFireService;
    protected abstract apiRequest(formData: any): Observable<any>;
    protected abstract handleSuccess(response): void;
    protected abstract handleError(response): void;

    constructor (private aService: AngularFireService) {
        this.angularFireService = aService;
    }

    public isFieldInvalid(formControlName: string, formGroup?: FormGroup): boolean {
        formGroup = formGroup || this.theForm;
        return (
            !formGroup.get(formControlName).disabled &&
            !formGroup.get(formControlName).valid &&            
            formGroup.get(formControlName).touched
        );
    }

    public clearField(formControlName: string, formGroup?: FormGroup) {
        formGroup = formGroup || this.theForm;
        formGroup.get(formControlName).setValue(null);
    }

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
}