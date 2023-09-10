(window) => {

    const dom = window.dom;
    const language = window.language;
    const page = window.page;

    const FormObject = window.FormObject;

    const loginForm = new FormObject("form-entry", ["email", "password"]);
    loginForm.setAction('registrant/login', responseBody => {
        if (responseBody.error) {
            page.loadingScreen.hide();
            return;
        }
    });
    
    loginForm.setEnterKeyAction();

    language.addTexts([
        {
            id: "message.login.error.invalid",
            content: {
                en: "Invalid login, please make sure you have entered the correct email or password.",
                id: "Kredensial masuk log tidak sah. Pastikan anda telah memasukan email dan kata sandi yang benar."
            }
        },
        {
            id: "message.login.error.unverified",
            content: {
                en: "Please check your email and perform verification first in order to log in.",
                id: "Periksa sural anda dan lakukan langkah verifikasi untuk masuk log."
            }
        }
    ]);

    dom.getById("link-login").onclick = () => {
        dom.getByClass('registration-element').forEach(dom.hide);
        dom.getByClass('login-element').forEach(dom.show);
    };

    dom.getById("link-forgot").onclick = () => page.open('forgot-password');

    dom.getById("button-login").onclick = () => {
        page.loadingScreen.show();
        loginForm.submit();
    };

};