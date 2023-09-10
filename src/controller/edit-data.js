(window) => {

    const ajax = window.ajax;
    const dom = window.dom;
    const language = window.language;
    const page = window.page;

    const FormObject = window.FormObject;

    language.addTexts([
        {
            id: "message.editData.success",
            content: {
                id: "Data anda telah berhasil diubah",
                en: "Your data have been succesfully edited"
            }
        }
    ]);

    const editRegistrantForm = new FormObject("form-edit-registrant");
    editRegistrantForm.setAction('registrant/edit', responseBody => {
        if (responseBody.success) {
            getRegistrant();
        }
        if (responseBody.error) {
            page.loadingScreen.hide();
        }
    });

    dom.getById("button-save-data").onclick = () => {
        page.loadingScreen.show();
        editRegistrantForm.submit();
    };

    const getRegistrant = () => ajax.post('registrant/get', setRegistrant);

    const setRegistrant = registrant => {
        editRegistrantForm.setValues(registrant);
        if (registrant.status.id !== 2) {
            editRegistrantForm.disable('ticketTier.id');
            editRegistrantForm.disable('dinner');
        }
        if (registrant.attendee) {
            dom.show(dom.getById("attendee-data"));
            dom.getByClass(`ticket-tier-${registrant.ticketTier.id}`).forEach(dom.show);
        }
        page.loadingScreen.hide();
    };

    getRegistrant();
};