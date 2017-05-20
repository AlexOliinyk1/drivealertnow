 
(function ($) {
    // Init form placeholder (for IE9)
    $(document).on('change', '#videos-select', function () {
        // Does some stuff and logs the event to the console
        if ($(this).val() == 'AndroidInstall') {
            $('#frame-video').attr('src', '//www.youtube.com/embed/ssrFw4VqJzs');
        }
        else if ($(this).val() == 'AndroidDemo') {
            $('#frame-video').attr('src', '//www.youtube.com/embed/TQzGu9RbUQs');
        }
        else if ($(this).val() == 'iOSInstall') {
            $('#frame-video').attr('src', '//www.youtube.com/embed/i9zjivVZP5o');
        }
        else {
            $('#frame-video').attr('src', '//www.youtube.com/embed/o7NS54-Swsc');
        }
    });
    
})(jQuery)


