window.config = {
    apiUrl: 'http://localhost:8000/',
    libUrl: 'http://localhost:88/',
    // Site Name
    defaultPage: "home",
    siteName: 'PAWAI 2019',
    // Language
    availableLanguages: ['id', 'en'],
    defaultLanguage: 'en',
    // 
    recaptchaSiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    styles: [
        "bootstrap/bootstrap",
        "tempusdominus/tempusdominus"
    ],
    scripts: [
        "polyfill",
        "base/jquery",
        "base/popper",
        "base/moment",
        "bootstrap/bootstrap",
        "tempusdominus/tempusdominus",
        "sweetalert2/sweetalert2",
        "slick/slick",
        "helper/dom",
        "helper/object-util",
        "helper/ajax",
        "helper/texts",
        "helper/language",
        "element/menu",
        {
            src: "element/page",
            onload: function () {
                window.page.open();
            }
        },
        "element/modal",
        "element/form",
        "element/countdown"
    ]
};
