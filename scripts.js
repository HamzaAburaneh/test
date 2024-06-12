
    (function ($, window, wb) {
        "use strict";
        var componentName = "gc-pft-prblm",
            selector = "#" + componentName,
            initEvent = "wb-init" + selector,
            $document = wb.doc,
            regex = {
                phoneNumber: /(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/im,
                sin: /(\d{3}\s*\d{3}\s*\d{3}|\d{3}\D*\d{3}\D*\d{3})/im,
                postalCode: /[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d/im,
                email: /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/im
            },
            init = function (event) {
                var elm = wb.init(event, componentName, selector),
                    $elm;
                if (elm) {
                    $elm = $(elm);
                    $elm.trigger("keyup");
                    wb.ready($elm, componentName);
                }
            };

        $document.on("click", selector + " button", function () {
            var $this = $(this);
            if ($this.text().trim() === "No") {
                $(".gc-pft-no").removeClass("nojs-show");
                $(".gc-pft-btns").addClass("hide");
            }
        });

        $document.on("submit", selector + " form", function (event) {
            var elm = event.currentTarget,
                $elm = $(elm);
            event.preventDefault();
            $(".gc-pft-thnk").removeClass("hide");
            $elm.addClass("hide nojs-show");
            $.ajax({
                url: "https://feedback-retroaction.canada.ca/api/QueueProblemForm",
                type: "POST",
                dataType: "text",
                data: $elm.serialize(),
                success: function (data) { },
                error: function (xhr, status, err) {
                    console.log(xhr.responseText);
                }
            });
        });

        $document.on("keyup", selector + " textarea", function (event) {
            var textValue = event.target.value;
            if (textValue.match(regex.phoneNumber) || textValue.match(regex.sin) || textValue.match(regex.postalCode) || textValue.match(regex.email)) {
                $("#warning").removeClass("hidden").animate();
            } else {
                $("#warning").addClass("hidden");
            }
        });

        $document.on("timerpoke.wb " + initEvent, selector, init);
        wb.add(selector);
    })(jQuery, window, wb);
