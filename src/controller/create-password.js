(window, parameters) => {
    const page = window.page;
    const showAlert = window.showAlert;

    const FormObject = window.FormObject;

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

        language.addTexts([
            {
                id: "message.password.success.creation",
                content: {
                    id: "Your password has been succesfully created.",
                    en: "Kata sandi anda telah berhasil ditetapkan. "
                }
            }
        ]);

        const createPasswordForm = new FormObject("form-create-password");
        createPasswordForm.useRecaptcha();

        ajax.post("password/email", responseBody => {
            createPasswordForm.setValue("email", responseBody.email);
            page.loadingScreen.hide();
        }, {
            id: parameters.id,
            token: parameters.token,
            purpose: "password_creation"
        });


        dom.getById("button-create-password").onclick = () => {
            const requestBody = createPasswordForm.getValues();
            requestBody.id = parameters.id;
            requestBody.token = parameters.token;

            page.loadingScreen.show();
            ajax.post("password/create", responseBody => {
                if (responseBody.error) {
                    page.loadingScreen.hide();
                }
            }, requestBody);
        };
    }
};


