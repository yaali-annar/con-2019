(window) => {
    const dom = window.dom;
    const language = window.language;
    const page = window.page;

    const FormObject = window.FormObject;

    language.addTexts([{
            id: "message.changePassword.error.invalid",
            content: {
                id: "Please enter the correct old password",
                en: "Mohon masukan kata sandi lama yang benar"
            }
        },
        {
            id: "message.changePassword.success",
            content: {
                id: "Your password has been succesfully changed",
                en: "Kata sandi anda telah berhasil diperbarui"
            }
        }
    ]);
    
    const changePasswordForm = new FormObject("form-change-password");
    changePasswordForm.setAction("registrant/change-password", () => page.loadingScreen.hide());

    dom.getById("button-change-password").onclick = () => changePasswordForm.submit();

};