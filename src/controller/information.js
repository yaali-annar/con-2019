(window, parameters) => {
    
    const dom = window.dom;
    const localStorage = window.localStorage;
    const page = window.page;
    const language = window.language;
    const showAlert = window.showAlert;
    const ajax = window.ajax;

    language.addTexts([
        {
            id: "message.information.payFirst",
            content: {
                en: "You must have paid for the PAWAI ticket before you can reserve a room",
                id: "Anda perlu membayar tiket PAWAI dahulu sebelum dapat memesan kamar"
            }
        }
    ]);

    dom.getById('button-reserve-room').onclick = () => {
        if (!localStorage.token) {
            showAlert({type: "Information", textId: "message.information.payFirst"});
            return;
        }
        page.loadingScreen.show();
        ajax.post('registrant/get', registrant => {
            if (registrant.status.id === 5) {
                page.open('receipt', {goto: 'room-reservation'});
            } else {
                showAlert({type: "Information", textId: "message.information.payFirst"});
                page.loadingScreen.hide();
            }
        });
    };

    page.loadingScreen.hide();
};
