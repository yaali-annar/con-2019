(window) => {
    const dom = window.dom;
    const language = window.language;
    const localStorage = window.localStorage;
    const page = window.page;
    const showAlert = window.showAlert;

    const FormObject = window.FormObject;

    language.addTexts([
        {
            id: "message.forgotPassword.error.verifyEmailFirst",
            content: {
                en: "Please verify your email first",
                id: "Mohon verifikasi surel anda terlebih dahulu."
            }
        }
    ]);

    const forgotPasswordForm = new FormObject("form-forgot-password");
    forgotPasswordForm.useRecaptcha();


    forgotPasswordForm.setAction('password/forgot', responseBody => {
        const mail = forgotPasswordForm.getValue('email');
        const forgotPasswordSuccessMessage = {
            en: `We have sent account recovery email to: ${mail}`,
            id: `Kami telah mengirimkan cara mengubah password ke: ${mail}`
        };

        if (responseBody.success) {
            showAlert({
                type: "success",
                text: forgotPasswordSuccessMessage[localStorage.language]
            });
            page.open('home');
        }
        if (responseBody.error) {
            page.loadingScreen.hide();
        }
    });

    dom.getById("button-request-account-recovery-email").onclick = () => {
        page.loadingScreen.show();
        forgotPasswordForm.submit();
    };

    page.loadingScreen.hide();
};