(window) => {

    const ajax = window.ajax;
    const dom = window.dom;
    const jQuery = window.jQuery;
    const language = window.language;
    const moment = window.moment;
    const page = window.page;

    //Form Object
    const FormObject = window.FormObject;
    const roomReservationForm = new FormObject("form-room-reservation");

    const getRoom = () => ajax.post('room/get', setRoom);
    const setRoom = attendee => {
        const roomReservation = attendee.roomReservation;
        roomReservationForm.setAction("room/reserve", responseBody => {
            if (responseBody.success) {
                getRoom();
            }
            if (responseBody.error) {
                page.loadingScreen.hide();
            }
        });
        if (roomReservation) {
            roomReservationForm.setValues(roomReservation);
            calculatePrice();

            const statusId = roomReservation.status.id;

            if (statusId !== 5) {
                //Not approved
                jQuery("#button-show-room").remove();
                jQuery("#room").remove();
                return;
            }

            roomReservationForm.disable();

            const roomPaymentFormElement = dom.getById("form-room-payment");
            const roomPaymentForm = new FormObject(roomPaymentFormElement);
            jQuery('#transaction-time').datetimepicker('widgetPositioning', widgetPositioning);

            const roomPaymentButton = dom.getById("button-room-pay");

            roomPaymentForm.setValues(attendee.roomPayment);
            roomPaymentForm.disable();
            dom.show(roomPaymentFormElement);

            let stayLength = roomReservation.stayLength;
            if (stayLength === 1) {
                stayLength += " Night";
            } else {
                stayLength += " Nights";
            }

            dom.getById('room-reservation-total').innerText = roomReservation.total / 1000;
            dom.getById('room-reservation-stay-length').innerText = stayLength;
        } else {
            jQuery("#button-show-room").remove();
            jQuery("#room").remove();
        }
        page.loadingScreen.hide();
    };

    const widgetPositioning = {
        horizontal: 'auto',
        vertical: 'top'
    };

    const checkInAtInput = jQuery('#check-in-at');
    const checkOutAtInput = jQuery('#check-out-at');

    const stayLengthInput = dom.getById("stay-length");
    const totalPriceInput = dom.getById("total-price");

    const calculatePrice = () => {
        const checkInAt = checkInAtInput.val().trim();
        const checkOutAt = checkOutAtInput.val().trim();
        if (checkInAt.length === 0 || checkOutAt.length === 0) {
            stayLengthInput.value = "-";
            totalPriceInput.value = "-";
            return;
        }

        let stayLength = moment(checkOutAt).diff(checkInAt, 'days');
        let totalPrice = stayLength * 485000;

        totalPrice = `IDR ${totalPrice}`.replace(/(\d{3}$)/, " $1");

        if (stayLength === 1) {
            stayLength += " night";
        } else {
            stayLength += " nights";
        }

        stayLengthInput.value = stayLength;
        totalPriceInput.value = totalPrice;
    };

    //Start Procedure
    language.addTexts([{
            id: "message.roomReservation.success",
            content: {
                en: "You have sucesfully reserved a room",
                id: "Anda telah berhasil melakukan reservasi kamar"
            }
        },
        {
            id: "message.roomPaymentConfirmation.success",
            content: {
                en: "You have sucesfully confirmed a payment for room. Please wait until we approved your payment.",
                id: "Anda telah berhail mengkonfirmasi pembayaran untuk kamar room, mohon tunggu sampai kami memproses konfirmasi anda."
            }
        }
    ]);

    checkInAtInput.datetimepicker('widgetPositioning', widgetPositioning);
    checkInAtInput.on("change.datetimepicker", () => {
        const checkInAt = checkInAtInput.val();
        const checkOutAtMinDate = moment(checkInAt).add({day: 1});
        checkOutAtInput.datetimepicker('minDate', checkOutAtMinDate);
        calculatePrice();
    });

    checkOutAtInput.datetimepicker('widgetPositioning', widgetPositioning);
    checkOutAtInput.on("change.datetimepicker", () => {
        const checkOutAt = checkOutAtInput.val();
        const checkInAtMaxDate = moment(checkOutAt).add({day: -1});
        checkInAtInput.datetimepicker('maxDate', checkInAtMaxDate);
        calculatePrice();
    });

    getRoom();
};