(function ($) {
    // Selectors samiBtnLoading looks for inside the form.
    let defaults = {
        btnLoading: '.submitBtnLoading',
        btnDetails: '.submitBtnDetails',
        setAsGlobal: false, // true: show the loader on every form submit
    };

    const P = "samiBtnLoading";

    // Set once config() has accepted a set of options.
    let configured = false;

    function fail(msg) {
        throw new Error(`${P}: ${msg}`);
    }

    // This file also ships on its own, so it cannot rely on $.samiValidate or on the toaster being loaded.
    function report(error) {
        if ($.fn.sami_Toast_Append) {
            $(document).sami_Toast_Append({
                cus_toast_status: 'alert',
                cus_toast_time: 3000,
                cus_toast_msg: error.message
            });
        } else {
            console.error(error.message);
        }
    }

    function validateConfig(options) {
        if (options === null || typeof options !== "object" || Object.keys(options).length == 0 || Array.isArray(options)) {
            fail("config options must be an object.");
        }

        $.each(options, function (key) {
            if (!Object.prototype.hasOwnProperty.call(defaults, key)) {
                fail(`Unknown config option '${key}'. Use ${Object.keys(defaults).join(', ')}.`);
            }
        });

        ['btnLoading', 'btnDetails'].forEach(function (name) {
            if (!Object.prototype.hasOwnProperty.call(options, name)) return;

            const selector = options[name];
            if (typeof selector !== "string" || selector.trim() === "") {
                fail(`${name} must be a non-empty selector string, e.g. '${defaults[name]}'.`);
            }
            try {
                $('<div>').find(selector);
            } catch (e) {
                fail(`${name} '${selector}' is not a valid selector.`);
            }
        });

        if (Object.prototype.hasOwnProperty.call(options, 'setAsGlobal') && typeof options.setAsGlobal !== "boolean") {
            fail("setAsGlobal must be true or false.");
        }
    }

    $.samiBtnLoading = {
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

            $(document).off('submit.samiBtnLoading');
            if (defaults.setAsGlobal === true) {
                $(document).on('submit.samiBtnLoading', 'form', function (e) {
                    // Already cancelled by another script: no page load will follow to reset the button.
                    let form = $(this);
                    setTimeout(function() {
                        if (e.isDefaultPrevented()){
                            form.samiBtnLoading(false);
                        }else{
                            console.log("test")
                            form.samiBtnLoading(true);
                        };
                    },0);
                });
            }
            return $.extend({}, defaults);
        },

        isConfigured: function () {
            return configured;
        },
    };

    // Puts a form's submit button into (true) or out of (false) its loading state.
    $.fn.samiBtnLoading = function (loading) {
        if (loading !== undefined && typeof loading !== "boolean") {
            report(new Error(`${P}: loading must be true or false.`));
            return this;
        }

        loading = loading !== false;

        return this.each(function () {
            const form = $(this);
            const btnLoading = form.find(defaults.btnLoading);
            let btnDetails = $(this).find(defaults.btnDetails);

            form.find('button[type="submit"]').prop('disabled', loading);

            if (btnLoading.length) {
                btnLoading.toggle(loading);
                btnDetails.toggle(!loading);
            }
        });
    };
})(jQuery);
