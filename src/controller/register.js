(window, parameters) => {

    const ajax = window.ajax;
    const dom = window.dom;
    const buttonEntrySwitcher = dom.getById("button-entry-switcher");
    const page = window.page;

    ajax.get('ticket/availability', ticketTiers => {
        if (ticketTiers.unavailable) {
            page.loadingScreen.hide();
            dom.remove(buttonEntrySwitcher);
            dom.getByClass('registration-element').forEach(dom.remove);
            return;
        }

        const jQuery = window.jQuery;
        const language = window.language;
        const showAlert = window.showAlert;
        const FormObject = window.FormObject;

        dom.show(buttonEntrySwitcher);

        const registerForm = new FormObject("form-entry");
        registerForm.useRecaptcha();
        registerForm.setAction('registrant/register', () => {
            page.loadingScreen.hide();
            dom.getByClass('registration-element').forEach(dom.hide);
            dom.getByClass('login-element').forEach(dom.show);
        });

        const slickOptions = {
            adaptiveHeight: true,
            slidesToShow: 3,
            infinite: true,
            responsive: [{
                    breakpoint: 1104,
                    settings: {
                        slidesToShow: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 736,
                    settings: {
                        slidesToShow: 1,
                        infinite: true,
                        dots: true
                    }
                }
            ]
        };

        const ticketTiersContainer = jQuery('#ticket-tiers');
        ticketTiersContainer.slick(slickOptions);

        const ticketTierElements = dom.getByClass('ticket-tier');
        ticketTierElements.forEach(ticketTierElement => {
            ticketTierElement.onclick = () => {
                ticketTierElement.parentElement.blur();
                const selectedTicketTierId = ticketTierElement.dataset.ticketTierId;
               
                ticketTierElements.forEach(ticketTierElement => {
                    let selectedImage = ticketTierElement.getElementsByClassName('selected')[0];
                    let unselectedImage = ticketTierElement.getElementsByClassName('unselected')[0];

                    if (ticketTierElement.dataset.ticketTierId === selectedTicketTierId) {
                        dom.show(selectedImage);
                        dom.hide(unselectedImage);
                    } else {
                        dom.hide(selectedImage);
                        dom.show(unselectedImage);  
                    }
                });

                registerForm.setValue('ticketTierId', selectedTicketTierId);
            };
        });

        language.addTexts([
            {
                id: "message.register.error.birthDateAfter",
                content: {
                    en: "This event is for people aged 14 years and up.",
                    id: "Acara ini hanya untuk merek ayang berumur 14 tahun keatas"
                }
            },
            {
                id: "message.register.error.emailUnique",
                content: {
                    en: "Your email has been registered in our system.",
                    id: "Surel Anda telah terdaftar di dalam sistem kami."
                }
            },
            {
                id: "message.register.error.ticketTierEmpty",
                content: {
                    en: "Please select your ticket tier.",
                    id: "Mohon pilih jenjang tiket anda."
                }
            },
            {
                id: "message.register.error.shortPassword",
                content: {
                    en: "Your password must be at least 8 characters long.",
                    id: "Kata sandi Anda harus lebih sepanjang 8 karakter atau lebih."
                }
            },
            {
                id: "message.register.success",
                content: {
                    en: "You have been successfully registered. Please check your email and follow the steps to verify your account.",
                    id: "Surel Anda telah berhasil didaftarkan dalam sistem kami. Periksa surel anda dan ikuti langkah yang dibutuhkan untuk mengesahkan akun anda."
                }
            }
        ]);


        //Buttons and links
        dom.getById("link-register").onclick = () => {
            dom.getByClass('login-element').forEach(dom.hide);
            dom.getByClass('registration-element').forEach(dom.show);
            ticketTiersContainer.slick("setPosition");
        };

        dom.getById("button-register").onclick = () => {
            try {
                page.loadingScreen.show();
                let fields = registerForm.getValues();

                if (!fields.ticketTierId) {
                    throw new Error("message.register.error.ticketTierEmpty");
                }
                registerForm.submit();
            } catch (error) {
                showAlert({
                    textId: error.message,
                    type: "error"
                });
                page.loadingScreen.hide();
            }
        };

        const dinnerCheckBox = dom.getById("dinner");
        const afterhoursSelectedImage = dom.getById("afterhours-selected");
        const afterhoursUnselectedImage = dom.getById("afterhours-unselected");

        dinnerCheckBox.onchange = () => {
            if (dinnerCheckBox.checked) {
                dom.show(afterhoursSelectedImage);
                dom.hide(afterhoursUnselectedImage);
            } else {
                dom.hide(afterhoursSelectedImage);
                dom.show(afterhoursUnselectedImage);
            }
        };

        page.loadingScreen.hide();
    });
};