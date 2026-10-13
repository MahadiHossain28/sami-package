(function ($) {
    $.fn.image_preview = function () {
        $("body,html").append(
            '\
            <div id="FullImageView">\
                <img id="FullImage" alt="preview_image"/>\
                <span id="FullImageViewCloseBtn">&times;</span>\
            </div>\
        '
        );
        let img_src = $(this).attr("src");
        let img_alt = $(this).attr("alt") || "preview_image";
        $("#FullImage").attr({ src: img_src, alt: img_alt });
        $("#FullImageView").css("display", "flex");

        $(document).on("click", "#FullImageViewCloseBtn",function () {
            $("#FullImageView").css("display", "none");
        });
    };
})(jQuery);
