import { BaseOverlayDispatcher } from '@angular/cdk/overlay/dispatchers/base-overlay-dispatcher';
import { BaseForm } from '../../shared/components/base-form/base-form.component';

export abstract class LoginForm extends BaseForm {

    public onSubmit(): Promise<boolean> {
        const formData = this.theForm.value;
        return this.angularFireService.signIn(formData.email, formData.password);
    }

    public onGoogleSubmit() {
        return this.angularFireService.googleSignIn();
    }
}