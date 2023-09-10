(window, parameters) => {

    const page = window.page;
    const showAlert = window.showAlert;
    const language = window.language;
    const localStorage = window.localStorage;
    const menu = window.menu;
    const ajax = window.ajax;

    if (!parameters.id || !parameters.token) {
        showAlert({
            textId: "message.error.malformedUrl",
            type: "error"
        });
        page.open('home');
        return;
    }

    language.addTexts([
        {
            id: "message.verification.success",
            content: {
                en: "You are now verified",
                id: "Anda kini telah disahkan."
            }
        }, {
            id: "message.verification.error",
            content: {
                en: "We encountered an error when verifiying you, please contact us at pawai.team@gmail.com",
                id: "Kami mengalami kendala ketika mengesahkan anda, mohon hubungi kami di pawai.team@gmail.com"
            }
        }])

    ajax.post('registrant/verify', () => {
    }, parameters);
};