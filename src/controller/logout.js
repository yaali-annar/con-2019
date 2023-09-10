(window) => {
    const localStorage = window.localStorage;
    const ajax = window.ajax;

    if (localStorage.token) {
        ajax.post('registrant/logout');
    }
};