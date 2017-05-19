(function ($) {
    $(document).ready(function () {
        
        if($("#about").length) {
            $(document).scroll(function () {
                var docScroll = $(document).scrollTop(),
                    aboutOffset = ($("#about").offset().top - $("#about").offset().top* 0.50);

                if (docScroll >= aboutOffset) {
                    $("#about").find('img').addClass('display');
                }

                if ($('#xp').length) {
                    $('#xp > div').each(function () {
                        var item = $(this);

                        if (docScroll >= (item.offset().top - item.offset().top * 0.30)) {
                            item.addClass('display');
                        }
                    });
                }
            });
        }
    });
})(jQuery);