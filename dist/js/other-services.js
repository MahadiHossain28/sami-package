(function ($) {
    $.fn.handleDependentSelect = function (options) {
        let settings = $.extend({
            className: null,
            attributeName: null
        }, options);

        let id = $(this).val();
        let classAttrName = '.' + settings.className + '[' + settings.attributeName + ']';
        let classAttrName2 = '.' + settings.className + '[' + settings.attributeName + '="' + id + '"]';

        $(classAttrName).each(function () {
            $(this).attr('hidden', true);
        });

        $(classAttrName2).removeAttr('hidden');
    };
})(jQuery);
