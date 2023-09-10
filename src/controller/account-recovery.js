(window, parameters) => {
    const page = window.page;
    const showAlert = window.showAlert;

    if (!parameters.id || !parameters.token) {

        showAlert({
            textId: "message.error.malformedUrl",
            type: "error"
        });
        page.open('home');
        return;

    } else {

        const ajax = window.ajax;
        const dom = window.dom;
        const language = window.language;

        const FormObject = window.FormObject;

        language.addTexts([
            {
                id: "message.recovery.success",
                content: {
                    id: "Your password has been succesfully updated",
                    en: "Kata sandi anda telah berhasil diperbarui"
                }
            }
        ]);

        const accountRecoveryForm = new FormObject("form-account-recovery");
        accountRecoveryForm.useRecaptcha();

        const requestBody = {
            id: parameters.id,
            token: parameters.token,
            purpose: "account_recovery"
        };

        ajax.post("password/email", responseBody => {
            accountRecoveryForm.setValue("email", responseBody.email);
            page.loadingScreen.hide();
        }, requestBody);

        dom.getById('button-account-recovery').onclick = () => {
            const requestBody = accountRecoveryForm.getValues();
            requestBody.id = parameters.id;
            requestBody.token = parameters.token;

            page.loadingScreen.show();
            ajax.post("password/change", responseBody => {
                if (responseBody.error) {
                    page.loadingScreen.hide();
                }
            }, requestBody);
        };
    }
};