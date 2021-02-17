import { BaseForm } from '../../shared/services/base-form/base-form.service';

export abstract class LoginForm extends BaseForm {

    public onSubmit(): Promise<boolean> {
        const formData = this.theForm.value;
        return this.angularFireService.signIn(formData.email, formData.password);
    }

    public onGoogleSubmit() {
        return this.angularFireService.googleSignIn();
    }
}