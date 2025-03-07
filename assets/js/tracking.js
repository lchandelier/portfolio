var _paq = _paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
  var u="//www.lena-chandelier.me/stats/";
  _paq.push(['setTrackerUrl', u+'piwik.php']);
  _paq.push(['setSiteId', '1']);
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
})();

(function ($) {
    $(document).ready(function () {
        
        if($('#social').length > 0) {
            $('#social').find('a').each(function(i, e){
                $(e).click(function(){
                    if($('html').attr('lang') == 'fr') {
                        _paq.push(['trackEvent', 'Home', 'Click', $(e).attr('href')]);
                    }
                    else {
                        _paq.push(['trackEvent', 'Home EN', 'Click', $(e).attr('href')]);
                    }
                });
            });
        }
    });
});
