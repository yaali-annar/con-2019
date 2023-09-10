(window, parameters) => {
    const ajax = window.ajax;
    const dom = window.dom;
    const page = window.page;

    //Page Objects
    const receiptDiv = dom.getById("receipt");
    const roomDiv = dom.getById("room");

    const getAttendee = () => ajax.post('attendee/get', setAttendee);
    const setAttendee = attendee => {
        const registrant = attendee.registrant;
        const ticketTierId = registrant.ticketTier.id;
        dom.getById('receipt-preferred-name').innerText = registrant.preferredName;
        dom.getById('receipt-legal-name').innerText = registrant.legalName;
        dom.getById('receipt-birth-date').innerText = registrant.birthDate;
        dom.getById('receipt-dinner').innerHTML = registrant.dinner ? '<i class="fas fa-check-square"></i>' : '<i class="fas fa-times-circle"></i>';

        if (ticketTierId === 2 || ticketTierId === 3) {
            dom.show(dom.getById('shirt-size'));
            let shirtSizeName = "-";
            if (attendee.shirtSize) {
                shirtSizeName = attendee.shirtSize.name;
            }
            dom.getById('receipt-shirt-size').innerText = shirtSizeName;
        }

        dom.getById('receipt-attendee-id').innerText = attendee.id;
        dom.show(dom.getById(`receipt-image-${ticketTierId}`));
        page.loadingScreen.hide();
    };

    const showRoomButton = dom.getById("button-show-room");
    showRoomButton.onclick = () => {
        dom.show(roomDiv);
        dom.hide(receiptDiv);
    };

    dom.getById("button-show-receipt").onclick = () => {
        dom.hide(roomDiv);
        dom.show(receiptDiv);
    };

    if (parameters) {
        if (parameters.goto === "room-reservation") {
            showRoomButton.click();
        }
    }
    getAttendee();
};