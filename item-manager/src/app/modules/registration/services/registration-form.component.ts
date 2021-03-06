import { BaseForm } from '../../shared/components/base-form/base-form.component';

export abstract class RegistrationForm extends BaseForm {

    public onSubmit(): Promise<boolean> {
        const formData = this.theForm.value;
        return this.angularFireService.signUp(formData.email, formData.password);
    }

    public onGoogleSubmit() {
        return this.angularFireService.googleSignIn();
    }
}