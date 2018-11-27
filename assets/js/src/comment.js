 (function ($) {
    if ($('#commentForm').length > 0) {
		var pageTitle = document.title;

        if($('#language').val() == 'fr') {
            $.extend(jQuery.validator.messages, {
                required: "Veuillez remplir ce champ",
                email: "Veuillez saisir un e-mail valide",
            });
        }

        $("#commentForm").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                name: {
                    required: true
                },
                comment: {
                    required: true
                }
            },
            highlight: function (element, errorClass) {
                $(element).parent().addClass(errorClass);
                $(element).attr('aria-invalid', true);
				
				if($('#language').val() == 'fr') {
					document.title = 'Erreur sur le formulaire - '+ pageTitle;
				}
				else {
					document.title = 'Error on the form - '+ pageTitle;
				}

            },
            unhighlight: function (element, errorClass) {
                $(element).parent().removeClass(errorClass);
                $(element).attr('aria-invalid', false);
            },
            errorElement: 'p',
            errorPlacement: function (error, element) {
                error.insertAfter(element);
            }
        });

        $('#submit').click(function() {
            $("#commentForm").validate();
        });
    }
})(jQuery);
