(window) => {
    const ajax = window.ajax;
    const countdown = window.countdown;
    const dom = window.dom;
    const jQuery = window.jQuery;
    const language = window.language;
    const localStorage = window.localStorage;
    const menu = window.menu;
    const page = window.page;

    const FormObject = window.FormObject;
    const Swal = window.Swal;

    language.addTexts([
        {
            id: "message.payment.question.reservation",
            content: {
                id: "Apakah Anda yakin ingin memulai proses pembayaran?",
                en: "Are you sure you want to start performing payment process?"
            }
        },
        {
            id: "payment.dinner",
            content: {
                yes: {
                    en: "With Afterhours",
                    id: "Dengan Afterhours"
                },
                no: {
                    en: "Without Afterhours",
                    id: "Tanpa Afterhours"
                }
            }
        }
    ]);

    const paymentElements = {
        confirm: dom.getById("payment-confirm"),
        reserveOpen: dom.getById("payment-reserve-open"),
        reserveClosed: dom.getById("payment-reserve-closed"),
        remainingTickets: dom.getById("payment-remaining-tickets"),
        countdownContainer: dom.getById("payment-countdown-container"),
        messagePleaseWait: dom.getById("payment-message-please-wait")
    };

    const displayRegistrantData = registrant => {
        dom.hide(paymentElements.confirm);
        dom.hide(paymentElements.reserveOpen);
        dom.hide(paymentElements.reserveClosed);
        dom.hide(paymentElements.remainingTickets);
        dom.hide(paymentElements.countdownContainer);
        dom.hide(paymentElements.messagePleaseWait);

        const statusId = registrant.status.id;

        // Unverified User
        // User shouldn't be able to arrive here normally
        if (statusId === 1) {
            localStorage.removeItem("token");
            page.open("home");
            menu.load();
            return;
        }

        // Approved User
        // User shouldn't be able to arrive here normally
        if (statusId === 5) {
            page.open('receipt');
            return;
        }

        const registrantDinnerName = registrant.dinner ?
                language.getText("payment.dinner.yes") :
                language.getText("payment.dinner.no");
        const registrantDinnerPrice = registrant.dinner ? "150" : "0";


        dom.getById('payment-preferred-name').innerText = registrant.preferredName;
        dom.getById('payment-ticket-tier-name').innerText = registrant.ticketTier.name;
        dom.getById('payment-ticket-tier-price').innerText = registrant.ticketTier.price / 1000;
        dom.getById('payment-dinner-name').innerText = registrantDinnerName;
        dom.getById('payment-dinner-price').innerText = registrantDinnerPrice;

        registrant.total /= 1000;
        dom.getById('payment-total').innerText = registrant.total;

        // Sold Out
        if (statusId === 2 && registrant.ticketTier.remaining <= 0) {
            dom.remove(paymentElements.confirm);
            dom.remove(paymentElements.reserveOpen);
            dom.show(paymentElements.reserveClosed);
            page.loadingScreen.hide();
            return;
        }

        // Verified but not yet reserved
        if (statusId === 2 && registrant.ticketTier.remaining > 0) {
            dom.show(paymentElements.reserveOpen);
            dom.show(paymentElements.remainingTickets);
            paymentElements.remainingTickets.innerText = registrant.ticketTier.remaining;
            page.loadingScreen.hide();

            dom.getById("button-payment-reserve").onclick = () => {
                let processResult = (result) => {
                    if (result.error) {
                        page.loadingScreen.hide();
                        return;
                    }
                    getPaymentData();
                };
                Swal.fire({
                    text: language.getText("message.payment.question.reservation"),
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: language.getText("answer.yes"),
                    cancelButtonColor: '#d33',
                    cancelButtonText: language.getText("answer.no")
                }).then((result) => {
                    if (result.value) {
                        page.loadingScreen.show();
                        ajax.post('payment/reserve', processResult);
                    }
                });
            };

            return;
        }

        // Reserved
        if (statusId === 3) {
            let currentTime = (new Date()).getTime();
            let deadline = new Date(currentTime + registrant.payment.remainingTime);
            let paymentCountdownElement = dom.getById("payment-countdown");
            countdown(paymentCountdownElement, deadline);
            dom.show(paymentElements.countdownContainer);
        }

        // Reserved or Paid
        if (statusId === 3 || statusId === 4) {
            dom.show(paymentElements.confirm);
            const paymentForm = new FormObject("payment-form");

            jQuery('#transaction-time').datetimepicker('widgetPositioning', {
                horizontal: 'auto',
                vertical: 'top'
            });

            paymentForm.setValues(registrant.payment);
            paymentForm.setAction('payment/confirm', response => {
                if (response.error) {
                    page.loadingScreen.hide();
                    return;
                }
                getPaymentData();
            });
            dom.getById("button-payment-confirm").onclick = () => {
                page.loadingScreen.show();
                paymentForm.submit();
            };
        }

        if (statusId === 4) {
            dom.show(paymentElements.messagePleaseWait);
        }
        page.loadingScreen.hide();
    };

    const getPaymentData = () => ajax.post('payment/get', displayRegistrantData);

    getPaymentData();
};