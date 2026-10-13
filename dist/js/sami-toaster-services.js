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

    const P = "samiToast";

    // Set once config() has accepted a set of options.
    let configured = false;

    function fail(msg) {
        throw new Error(`${P}: ${msg}`);
    }

    // config() usually runs before <body> exists, when a toast cannot be shown, so the console gets it too.
    function report(error) {
        alert(error.message);
    }

    function validateConfig(options) {
        if (options === undefined) {
            fail("config needs an options object. Use $.samiToast.config({}) for the defaults.");
        }

        if (options === null || typeof options !== "object" || Array.isArray(options)) {
            fail("config options must be an object.");
        }

        $.each(options, function (key, value) {
            if (!Object.prototype.hasOwnProperty.call(defaults, key)) {
                fail(`Unknown config option '${key}'. Use ${Object.keys(defaults).join(', ')}.`);
            }

            if (key === "cus_toast_time") {
                if (typeof value !== "number" || !isFinite(value) || value <= 0) {
                    fail("cus_toast_time must be a positive number of milliseconds.");
                }
            } else if (typeof value !== "string" || value.trim() === "") {
                fail(`${key} must be a non-empty string, e.g. '${defaults[key]}'.`);
            }
        });
    }

    $.samiToast = {
        config: function (options) {
            // Invalid options change nothing: the current settings stay in place.
            try {
                validateConfig(options);
            } catch (error) {
                report(error);
                return $.extend({}, defaults);
            }

            $.each(defaults, function (key) {
                if (Object.prototype.hasOwnProperty.call(options, key)) {
                    defaults[key] = options[key];
                }
            });
            configured = true;

            return $.extend({}, defaults);
        },

        // Current values, without changing anything.
        settings: function () {
            return $.extend({}, defaults);
        },

        isConfigured: function () {
            return configured;
        },

        // Used by the toast plugins: false, with an alert toast, until config() has been called.
        requireConfig: function (plugin) {
            if (configured) return true;
            report(new Error(`${plugin}: call $.samiToast.config({...}) before showing a toast.`));
            return false;
        },
    };
})(jQuery);

(function ($) {
    $.fn.cus_toast_auto = function (options) {
        if (!$.samiToast.requireConfig("cus_toast_auto")) return;

        let settings = $.extend({}, $.samiToast.settings(), options);

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

    // Inline SVG, sized by the parent's font-size and coloured by its text colour, like an icon font.
    const SVG_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"';
    const STROKE = ' fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">';

    const ICONS = {
        check: SVG_OPEN + STROKE + '<path d="M4 12.5l5 5L20 6.5"/></svg>',
        xmark: SVG_OPEN + STROKE + '<path d="M6 6l12 12M18 6L6 18"/></svg>',
        triangle: SVG_OPEN + ' fill="currentColor"><path fill-rule="evenodd" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM11 9h2v5h-2zM12 15.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z"/></svg>',
    };

    $.fn.sami_Toast_Append = function (options) {
        if (!$.samiToast.requireConfig("sami_Toast_Append")) return;

        $.samiToast.show(options);
    };

    // Renders the toast with no config check, so the config error itself can be shown.
    $.samiToast.show = function (options) {
        let settings = $.extend(
            {
                cus_toast_status: 'success',
                cus_toast_time: $.samiToast.settings().cus_toast_time,
                cus_toast_msg: "Hello",
            },
            options
        );
        // Icon and title for each status. Any other status shows nothing.
        const statuses = {
            success: { icon: ICONS.check, title: 'Success' },
            alert: { icon: ICONS.triangle, title: 'Alert' },
            error: { icon: ICONS.xmark, title: 'Error' },
        };
        const status = settings.cus_toast_status;

        if (Object.prototype.hasOwnProperty.call(statuses, status)) {
            $("body").prepend(`
                <div class="cus_toast1">
                    <div class="cus_toast-content">
                        <span class="${status}">${statuses[status].icon}</span>
                        <div class="message">
                            <span class="cus_${status}">${statuses[status].title}</span>
                            <span class="text text-2">${settings.cus_toast_msg}</span>
                        </div>
                    </div>
                    <span class="sami_close1">${ICONS.xmark}</span>
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
