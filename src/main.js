window.globalLoader = function () {
    if (window.alreadyLoaded) {
        return;
    } else {
        window.alreadyLoaded = true;
    }

    window.config.styles.forEach(style => {
        let newStyle = window.document.createElement("link");
        newStyle.rel = "stylesheet";
        newStyle.href = `${window.config.libUrl}${style}.css`;
        window.document.head.appendChild(newStyle);
    });

    window.config.scripts.forEach(script => {
        let newScript = window.document.createElement("script");
        newScript.async = false;
        if (script.src) {
            newScript.onload = script.onload;
            newScript.src = `${window.config.libUrl}${script.src}.js`;
        } else {
            newScript.src = `${window.config.libUrl}${script}.js`;
        }
        window.document.head.appendChild(newScript);
    });
};