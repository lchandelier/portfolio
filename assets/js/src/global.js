(function ($) {
    $(document).ready(function () {
        
        //display current language in title
        var currentLanguage = $('#lang').find('a.' + $('html').attr('lang'));
        currentLanguage.attr('title', currentLanguage.attr('title') + ' ' + $('#currentLanguage').html());
        
        if (getCookie('dyslexia') && getCookie('dyslexia') == 'true') {
            $('body').addClass('dyslexia');
        }
        if (getCookie('contrast') && getCookie('contrast') == 'true') {
            $('body').addClass('contrast');
        }

        $('#dyslexia').click(function () {
            manageA11yTools('dyslexia', $('body'), 'dyslexia');
        });

        $('#contrast').click(function () {
            manageA11yTools('contrast', $('body'), 'contrast');
        });

        // a11y tools menu
        openMenu($('#a11yTools').find('button'), $('#a11yTools').find('ul'), $('#displayMenu'), $('#displayMenu + ul') );
        closeAfterLastTab($('#a11yTools').find('ul'));
        closeClickOutside($('#a11yTools'));
        
        //main menu
        openMenu($('#displayMenu'), $('#displayMenu + ul'), $('#a11yTools').find('button'), $('#a11yTools').find('ul'));
        closeAfterLastTab($('#displayMenu + ul'));
        closeClickOutside($('#mainMenu'));
    

        //back top page
        if ($('#top').length > 0)
        {
            var offset = 220;
            var duration = 600;
            $(window).scroll(function () {
                if ($(this).scrollTop() > offset) {
                    $('#go_top').addClass('visible');
                } else {
                    $('#go_top').removeClass('visible');
                }
            });

            $('#go_top').focus(function () {
                $('#go_top').addClass('visible');
            }).focusout(function () {
                $('#go_top').removeClass('visible');
            }).click(function () {
                $('html, body').animate({scrollTop: 0}, duration);
                return false;
            });
        }

        //cookie banner
        var sMessage = {
            message: $('#cookieMsg').html(),
            accept: $('#acceptMsg').html(),
            refuse: $('#refuseMsg').html(),
            know: $('#knowMoreMsg').html(),
            url: $('#policyURL').html()
        };

        $.sbCookieConsentBar({
            message: sMessage.message,
            acceptButton: true,
            acceptText: sMessage.accept,
            declineButton: true,
            declineText: sMessage.refuse,
            policyButton: true,
            policyText: sMessage.know,
            policyURL: sMessage.url,
            acceptOnContinue: false,
            effect: 'slide',
            element: 'body',
            fixed: false
        });
        
        removeHoverCSSRule();
    });

    //store cookie for contrast color dyslexia font or font-size preferences
    function manageA11yTools(cookieName, targetClass, cssClass) {
        if (getCookie('cookies-consent-bar-enabled') == 'accepted') {
            if (getCookie(cookieName) == 'false' || !getCookie(cookieName)) {

                createCookie(cookieName, 'true', 365);
                targetClass.addClass(cssClass);
            } else {
                createCookie(cookieName, 'false', 365);
                targetClass.removeClass(cssClass);
            }
        } else {
            targetClass.toggleClass(cssClass);
        }
    }

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else
            var expires = "";

        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function openMenu(trigger, target, triggerToClose, targetToClose) {
        trigger.click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (target.is(':visible')) {
                target.fadeOut();
                trigger.attr('aria-expanded', 'false').removeClass('active');
            }
            else {
                target.fadeIn();
                trigger.attr('aria-expanded', 'true').addClass('active');
                target.find('a').first().focus();
            }
            
            if(triggerToClose.is(':visible')) {
                targetToClose.fadeOut();
                triggerToClose.attr('aria-expanded', 'false').removeClass('active');
            }
        });
    }

    function closeAfterLastTab(selector) {
        selector.keydown(function (e) {
            
            if (e.keyCode === 9) {
                var focusedElement = $(':focus');
                
                if (e.shiftKey === false && focusedElement.is($(this).find(':tabbable').last())) {
                    $(this).prev().trigger('click');
                    $(this).prev().parent().next().find(':tabbable').first().focus();
                    e.preventDefault();
                }
            }
            else if(focusedElement.is($(this).find(':tabbable').first())) {
                $(this).prev().trigger('click');
                $(this).prev().parent().prev().find(':tabbable').first().focus();
                e.preventDefault();
            }
        });
    }

    function closeClickOutside(selector) {
        $(document).click(function () {
            if(selector.is(':visible')) {
                selector.find('ul').fadeOut();
                selector.find('button').removeClass('active').attr('aria-expanded', 'false');
            }
        });
    }

    // avoid double tap
    function removeHoverCSSRule() {
        var dragging = false;
        $("a").on("touchmove", function () {
            dragging = true;
        });

        $("a").on("touchend", function (e) {
            if (dragging) {
                e.preventDefault();
            } else {
                var el = $(this);
                var link = el.attr('href');
                window.location = link;
            }
        });

        $("a").on("touchstart", function () {
            dragging = false;
        });
    }
})(jQuery);