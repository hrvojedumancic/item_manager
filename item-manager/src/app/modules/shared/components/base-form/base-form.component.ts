import { EmailValidator, FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { AngularFireService } from "../../services/auth.service";

export abstract class BaseForm {

    public formLoaded: boolean = false;
    public theForm: FormGroup;
    protected angularFireService: AngularFireService;
    public abstract onSubmit(): void;

    constructor (private aService: AngularFireService) {
        this.angularFireService = aService;
    }

    public isFieldControlInvalid(formControlName: string, formGroup?: FormGroup): boolean {
        formGroup = formGroup || this.theForm;
        return (
            !formGroup.get(formControlName).disabled &&
            !formGroup.get(formControlName).valid &&            
            formGroup.get(formControlName).touched
        );
    }

    public isFieldArrayInvalid(formArray: string, formGroup?: FormGroup, index?: number): boolean {
        formGroup = formGroup || this.theForm;
        return (
            !formGroup.get(formArray).value[index].disabled &&
            !formGroup.get(formArray).value[index].valid &&
            formGroup.get(formArray).value[index].touched
        );
    }

    public clearField(formControlName: string, formGroup?: FormGroup) {
        formGroup = formGroup || this.theForm;
        formGroup.get(formControlName).setValue(null);
    }

    public isSubmitDisabled(): boolean {
        return this.theForm.invalid || this.theForm.disabled;
    }
}