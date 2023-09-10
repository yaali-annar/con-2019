(window) => {
    const page = window.page;
    const jQuery = window.jQuery;

    const slickOptions = {
        adaptiveHeight: true,
        slidesToShow: 1,
        infinite: true,
        autoplay: true, 
        dots:true
    };

    const activityContainer = jQuery('#activities');
    activityContainer.slick(slickOptions);
    page.loadingScreen.hide();
};