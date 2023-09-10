(window) => {
    const dom = window.dom;
    const page = window.page;

    dom.remove(dom.getById('navbar-list'));
    page.loadingScreen.hide();
};