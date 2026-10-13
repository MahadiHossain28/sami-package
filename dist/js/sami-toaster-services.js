(function ($) {
    let defaults = {
        cus_toast_time: 5000,
        cus_toast_top: "25px",
        cus_toast_bg: "#f2f2f2",
        cus_toast_border: "#008080",
        cus_toast_success_bg: "#198754",
        cus_toast_success_icon: "#ffffff",
        cus_toast_alert_bg: "#b3a022",
        cus_toast_alert_icon: "#1b1b1b",
        cus_toast_error_bg: "#dc3545",
        cus_toast_error_icon: "#ffffff",
        cus_toast_text: "#666666",
    };

    $.samiToast = {
        config: function (options) {
            if (options) {
                let css = {};
                $.each(defaults, function (key, defaultValue) {
                    if (Object.prototype.hasOwnProperty.call(options, key)) {
                        defaults[key] = options[key];
                    }
                    if (key !== "cus_toast_time") {
                        css["--" + key] = defaults[key];
                    }
                });
                $(":root").css(css);
            }
            return $.extend({}, defaults);
        },
    };
})(jQuery);

(function ($) {
    $.fn.cus_toast_auto = function (options) {
        let settings = $.extend({}, $.samiToast.config(), options);

        let progress_time = 300;
        let end_time = settings.cus_toast_time + progress_time;
        let progress_css_time = settings.cus_toast_time / 1000;

        let action_class = $(".cus_toast");
        let progress_class = $(".progress");
        let sami_close_class = $(".sami_close");
        let timer1, timer2;

        action_class.toggleClass("active");
        progress_class.toggleClass("active");

        $(":root").css({
            "--cus_toast_time": progress_css_time + "s",
            "--cus_toast_top": settings.cus_toast_top,
            "--cus_toast_bg": settings.cus_toast_bg,
            "--cus_toast_border": settings.cus_toast_border,
            "--cus_toast_success_bg": settings.cus_toast_success_bg,
            "--cus_toast_success_icon": settings.cus_toast_success_icon,
            "--cus_toast_alert_bg": settings.cus_toast_alert_bg,
            "--cus_toast_alert_icon": settings.cus_toast_alert_icon,
            "--cus_toast_error_bg": settings.cus_toast_error_bg,
            "--cus_toast_error_icon": settings.cus_toast_error_icon,
            "--cus_toast_text": settings.cus_toast_text,
        });

        timer1 = setTimeout(() => {
            action_class.removeClass("active");
        }, settings.cus_toast_time); //1s = 1000 milliseconds

        timer2 = setTimeout(() => {
            progress_class.removeClass("active");
            progress_class.remove();
            action_class.remove();
        }, end_time);

        action_class.mouseover(function () {
            clearTimeout(timer1);
            clearTimeout(timer2);
            progress_class.removeClass("active");

        });

        action_class.mouseout(function () {
            progress_class.addClass("active");
            timer1 = setTimeout(() => {
                action_class.removeClass("active");
            }, settings.cus_toast_time); //1s = 1000 milliseconds

            timer2 = setTimeout(() => {
                progress_class.removeClass("active");
                progress_class.remove();
                action_class.remove();
            }, end_time);
        });

        $(document).on("click", sami_close_class, function () {
            action_class.removeClass("active");
            setTimeout(() => {
                progress_class.removeClass("active");
                progress_class.remove();
                action_class.remove();
            }, progress_time);

            clearTimeout(timer1);
            clearTimeout(timer2);
        });
    };
})(jQuery);

(function ($) {
    $.fn.sami_Toast_Append = function (options) {
        let settings = $.extend(
            {
                cus_toast_status: 'success',
                cus_toast_time: $.samiToast.config().cus_toast_time,
                cus_toast_msg: "Hello",
            },
            options
        );
        if (settings.cus_toast_status === 'success') {
            $("body").prepend(`
                <div class="cus_toast1">
                    <div class="cus_toast-content">
                        <i class="fa-solid fa-check success"></i>
                        <div class="message">
                            <span class="cus_success">Success</span>
                            <span class="text text-2">${settings.cus_toast_msg}</span>
                        </div>
                    </div>
                    <i class="fa-solid fa-xmark sami_close1"></i>
                    <div class="progress"></div>
                </div>
            `);
        }

        if(settings.cus_toast_status === 'alert') {
            $("body").prepend(`
                <div class="cus_toast1">
                    <div class="cus_toast-content">
                        <i class="fa-solid fa-triangle-exclamation alert"></i>
                        <div class="message">
                            <span class="cus_alert">Alert</span>
                            <span class="text text-2">${settings.cus_toast_msg}</span>
                        </div>
                    </div>
                    <i class="fa-solid fa-xmark sami_close1"></i>
                    <div class="progress"></div>
                </div>
            `);
        }

        if(settings.cus_toast_status === 'error') {
            $("body").prepend(`
                <div class="cus_toast1">
                    <div class="cus_toast-content">
                        <i class="fa-solid fa-xmark error"></i>
                        <div class="message">
                            <span class="cus_error">Error</span>
                            <span class="text text-2">${settings.cus_toast_msg}</span>
                        </div>
                    </div>
                    <i class="fa-solid fa-xmark sami_close1"></i>
                    <div class="progress"></div>
                </div>
            `);
        }

        let t_timer1, t_timer2;
        let action1_class = $(".cus_toast1");
        let progress1_class = $(".progress");
        let sami_close1_class = $(".sami_close1");

        action1_class.toggleClass("active");
        progress1_class.toggleClass("active");

        let progress_time = 300;
        let end_time = settings.cus_toast_time + progress_time;
        let progress_css_time = settings.cus_toast_time / 1000;

        $(":root").css({
            "--cus_toast_time": progress_css_time + "s",
        });

        t_timer1 = setTimeout(() => {
            action1_class.removeClass("active");
            action1_class.remove();
        }, settings.cus_toast_time); //1s = 1000 milliseconds

        t_timer2 = setTimeout(() => {
            progress1_class.removeClass("active");
            progress1_class.remove();
            action1_class.remove();
        }, end_time);

        action1_class.mouseover(function () {
            clearTimeout(t_timer1);
            clearTimeout(t_timer2);
            progress1_class.removeClass("active");
        });

        action1_class.mouseout(function () {
            progress1_class.addClass("active");
            t_timer1 = setTimeout(() => {
                action1_class.removeClass("active");
                action1_class.remove();
            }, settings.cus_toast_time); //1s = 1000 milliseconds

            t_timer2 = setTimeout(() => {
                progress1_class.removeClass("active");
                progress1_class.remove();
                action1_class.remove();
            }, end_time);
        });

        $(document).on("click", sami_close1_class, function () {
            action1_class.removeClass("active");
            action1_class.remove();
            setTimeout(() => {
                progress1_class.removeClass("active");
                progress1_class.remove();
                action1_class.remove();
            }, progress_time);

            clearTimeout(t_timer1);
            clearTimeout(t_timer2);
        });
    };
})(jQuery);
