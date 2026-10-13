// sami-toaster-services.js
(function ($) {
    $.fn.cus_toast_auto = function (options) {
        let settings = $.extend(
            {
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
            },
            options
        );

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
                cus_toast_time: 5000,
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


// sami-modal.js
(function ($) {

    const FADE_MS = 250; // match the CSS transition

    const ICONS = {
        trash: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>',
        warning: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        success: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        info: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    $.samiModal = {

        // Valid names for the icon option
        iconNames: Object.keys(ICONS),

        // Create a modal if it doesn't exist. Returns the jQuery element.
        // Modals created here are removed from the DOM when closed.
        ensure: function (id) {
            let $modal = $('#' + id);
            if ($modal.length) return $modal;

            $modal = $(`
                <div class="sami-modal" data-auto-remove>
                    <div class="sami-modal__dialog" aria-modal="true" role="dialog">
                        <div class="sami-modal__content_body"></div>
                    </div>
                </div>
            `).attr('id', id);

            $('body').append($modal);
            return $modal;
        },

        // Builds the button row. Returns a jQuery element; the caller places it.
        // confirmLabel: false/null = no confirm button, only Close
        buildActions: function (options) {
            const o = $.extend({
                confirmLabel: null,
                confirmHref: null,          // set for a link button, otherwise a <button>
                confirmType: 'button',      // 'submit' to submit the surrounding form
                confirmClass: 'btn btn-danger',
                closeLabel: null,           // defaults to 'No, Close' or 'Close'
                showClose: true,
            }, options);

            const $row = $('<div class="d-flex justify-content-center align-items-center gap-2"></div>');
            const hasConfirm = !!o.confirmLabel;

            if (hasConfirm) {
                const $confirm = o.confirmHref
                    ? $('<a></a>').attr('href', o.confirmHref)
                    : $('<button></button>').attr('type', o.confirmType);

                $row.append(
                    $confirm
                        .addClass(o.confirmClass)
                        .attr('data-modal-confirm', '')
                        .text(o.confirmLabel)
                );
            }

            if (o.showClose) {
                const label = o.closeLabel || (hasConfirm ? 'No, Close' : 'Close');
                $row.append(
                    $('<button type="button" class="btn btn-secondary" data-modal-close></button>').text(label)
                );
            }

            return $row;
        },

        confirm: function (options) {
            const o = $.extend({
                id: 'samiConfirmModal',
                msg: 'Are you sure?',
                note: false,
                confirmLabel: 'Yes, Continue',
                closeLabel: 'No, Cancel',
                confirmClass: 'btn btn-primary',
                icon: 'info',
            }, options);

            return new Promise(function (resolve) {
                const $modal = $.samiModal.ensure(o.id);

                let settled = false;
                const done = function (value) {
                    if (settled) return;
                    settled = true;
                    resolve(value);
                };

                const $msg = $('<h5 class="mb-4"></h5>').text(o.msg);
                const $note = o.note
                    ? $('<p class="sami-modal__note mb-4"></p>').text(o.note)
                    : $();

                const $actions = $.samiModal.buildActions({
                    confirmLabel: o.confirmLabel,
                    confirmClass: o.confirmClass,
                    closeLabel: o.closeLabel,
                });

                $actions.find('[data-modal-confirm]').on('click', function () {
                    done(true);
                    $.samiModal.close(o.id);
                });

                $modal.find('.sami-modal__image_prev').remove();
                $modal.find('.sami-modal__content_body').empty().append($msg, $note, $actions);

                // Any other way of closing counts as "no"
                $modal.data('onClose', function () { done(false); });

                $.samiModal.open(o.id, o.icon);
            });
        },

        // name: 'trash' | 'warning' | 'success' | 'info' | false
        open: function (id, name) {
            const $modal = $('#' + id);
            if (!$modal.length) return;

            $modal.data('returnFocus', document.activeElement);

            // Icon: add the div only when there is an icon
            $modal.find('.sami-modal__icon').remove();

            if (name && ICONS[name]) {
                $('<div></div>')
                    .addClass('sami-modal__icon sami-modal__icon--' + name)
                    .html(ICONS[name])
                    .prependTo($modal.find('.sami-modal__dialog'));
            }

            $modal[0].offsetWidth; // force reflow so the fade-in runs
            $modal.addClass('is-open');  // .attr('aria-hidden', 'false');
            $('body').addClass('sami-modal-open');
        },

        close: function (id) {
            const $modal = id ? $('#' + id) : $('.sami-modal.is-open').last();
            if (!$modal.length) return;

            const back = $modal.data('returnFocus');
            if (back && document.contains(back)) $(back).trigger('focus');

            $modal.removeClass('is-open'); //.attr('aria-hidden', 'true');

            if ($('.sami-modal.is-open').length === 0) {
                $('body').removeClass('sami-modal-open');
            }

            // Only remove modals this helper created, not ones from your HTML
            if ($modal.is('[data-auto-remove]')) {
                setTimeout(function () {
                    if (!$modal.hasClass('is-open')) $modal.remove();
                }, FADE_MS);
            }
        }
    };

    // Registered once for all modals: close button, backdrop click, Escape key
    $(document)
        .on('click.samiModal', '.sami-modal [data-modal-close]', function () {
            $.samiModal.close($(this).closest('.sami-modal').attr('id'));
        })
        .on('click.samiModal', '.sami-modal', function (e) {
            if (e.target === this) $.samiModal.close(this.id);
        })
        .on('keydown.samiModal', function (e) {
            if (e.key === 'Escape') $.samiModal.close();
        });

})(jQuery);


// sami-services-validation.js
(function ($) {

    function fail(plugin, msg) {
        throw new Error(`${plugin}: ${msg}`);
    }

    // Small reusable checks
    const check = {

        bool: function (plugin, name, v) {
            if (typeof v !== "boolean") fail(plugin, `${name} must be true or false.`);
        },

        // allowNull: null is accepted. allowFalse: false is accepted (e.g. note: false)
        string: function (plugin, name, v, opts) {
            const o = $.extend({ allowNull: false, allowFalse: false, nonEmpty: false }, opts);
            if (v === null && o.allowNull) return;
            if (v === false && o.allowFalse) return;
            if (typeof v !== "string") fail(plugin, `${name} must be a string${o.allowNull ? ' or null' : ''}${o.allowFalse ? ' or false' : ''}.`);
            if (o.nonEmpty && v.trim() === "") fail(plugin, `${name} must not be empty.`);
        },

        func: function (plugin, name, v) {
            if (v !== null && typeof v !== "function") fail(plugin, `${name} must be a function.`);
        },

        exists: function (plugin, selector, label) {
            if ($(selector).length === 0) fail(plugin, `${label} not found.`);
        },

        oneElement: function (plugin, $el) {
            if ($el.length !== 1) fail(plugin, "Must be called on exactly one element.");
        },

        modalHelper: function (plugin) {
            if (!$.samiModal) fail(plugin, "sami-modal.js is not loaded.");
        }
    };

    $.samiValidate = {

        check: check,

        /*
        |----------------------------------------------------------------------
        | handleDelete
        | Returns { url, csrf }
        |----------------------------------------------------------------------
        */
        delete: function (settings, $el) {
            const P = "handleDelete";

            check.modalHelper(P);
            check.oneElement(P, $el);

            const url = $el.val();
            if (!url || typeof url !== "string") fail(P, "Invalid URL. The element needs a value attribute.");

            check.bool(P, "actionBtn", settings.actionBtn);
            check.bool(P, "method", settings.method);
            check.string(P, "msg", settings.msg, { allowNull: true });
            check.string(P, "note", settings.note, { allowNull: true, allowFalse: true });
            check.string(P, "buttonLabel", settings.buttonLabel, { nonEmpty: true });
            check.string(P, "imagePrevClass", settings.imagePrevClass);

            if (settings.icon !== false && settings.icon !== null && !$.samiModal.iconNames.includes(settings.icon)) {
                fail(P, `Unknown icon '${settings.icon}'. Use ${$.samiModal.iconNames.join(', ')}, or false.`);
            }

            let csrf = '';
            if (settings.actionBtn && settings.method) {
                const meta = document.querySelector('meta[name="csrf-token"]');
                if (!meta || !meta.getAttribute('content')) {
                    fail(P, 'csrf-token meta tag not found. The delete request would be rejected.');
                }
                csrf = meta.getAttribute('content');
            }

            return { url: url, csrf: csrf };
        },

        /*
        |----------------------------------------------------------------------
        | handleGetData
        | Returns { url, confirmOptions }  (confirmOptions is null = no modal)
        |----------------------------------------------------------------------
        */
        getData: function (settings, $el) {
            const P = "handleGetData";

            const url = $el.val();
            if (!url || typeof url !== "string") fail(P, "Invalid URL.");

            if (settings.modalId) check.exists(P, '#' + settings.modalId, `Modal #${settings.modalId}`);

            check.func(P, "successCallback", settings.successCallback);

            if (settings.valuesId != null) {
                if (!settings.returnFromApi) fail(P, "returnFromApi is required for valuesId.");
                if (typeof settings.valuesId !== "object" || Array.isArray(settings.valuesId)) {
                    fail(P, "valuesId must be an object.");
                }
            } else if (typeof settings.successCallback !== "function") {
                fail(P, "successCallback is required when valuesId is null.");
            }

            if (settings.imagePrev === true) {
                if (!settings.returnFromApi) fail(P, "returnFromApi is required for image preview.");
                if (!settings.dbImgColName) fail(P, "dbImgColName is required for image preview.");
                if (typeof settings.imagePath !== "string") fail(P, "imagePath must be a string.");
            }

            if (settings.cloudImagePrev === true) {
                if (!settings.returnFromApi) fail(P, "returnFromApi is required for cloud image preview.");
                if (!settings.dbImgColName) fail(P, "dbImgColName is required for cloud image preview.");
            }

            return { url: url, confirmOptions: $.samiValidate.normalizeConfirm(P, settings.confirm) };
        },

        /*
        |----------------------------------------------------------------------
        | handleSubmit
        | Returns { url, methodType, modalInfo }
        |----------------------------------------------------------------------
        */
        submit: function (settings, $form, formData) {
            const P = "handleSubmit";

            check.oneElement(P, $form);

            const url = $form.attr('action');
            if (!url || typeof url !== "string") fail(P, "Form 'action' URL is missing or invalid.");

            if (!(formData instanceof FormData)) fail(P, "formData must be a FormData object.");

            const methodType = String(settings.methodType).toUpperCase();
            if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(methodType)) {
                fail(P, `Invalid methodType '${settings.methodType}'.`);
            }

            let modalInfo = null;
            if (settings.modalId) {
                check.exists(P, '#' + settings.modalId, `Modal #${settings.modalId}`);
                modalInfo = $('#' + settings.modalId);
            }

            if (settings.listName) check.exists(P, '.' + settings.listName, `List .${settings.listName}`);

            if (typeof settings.samiToastDuration !== "number" || settings.samiToastDuration <= 0) {
                fail(P, "samiToastDuration must be a positive number.");
            }

            ['beforeSendCallback', 'successCallback', 'completeCallBack'].forEach(function (name) {
                check.func(P, name, settings[name]);
            });

            return { url: url, methodType: methodType, modalInfo: modalInfo, confirmOptions: $.samiValidate.normalizeConfirm(P, settings.confirm) };
        },

        /*
        |----------------------------------------------------------------------
        | confirm option (shared)
        | null/false -> null | true -> {} | {msg,...} -> filtered copy | {} -> error
        |----------------------------------------------------------------------
        */
        normalizeConfirm: function (plugin, c) {
            if (c === null || c === false || c === undefined) return null;
            if (c === true) return {};

            if (typeof c !== "object" || Array.isArray(c)) {
                fail(plugin, "confirm must be true, false, null, or an options object.");
            }

            if (Object.keys(c).length === 0) {
                fail(plugin, "confirm is an empty object {}. Use confirm: true for the default modal.");
            }

            const out = {};
            ['msg', 'note', 'confirmLabel', 'closeLabel', 'confirmClass', 'icon'].forEach(function (key) {
                if (c[key] !== undefined && c[key] !== null) out[key] = c[key];
            });
            return out;
        }
    };

})(jQuery);


// sami-ajax-services.js
(function ($) {
    $.fn.handleGetData = function (options) {

        try{

            let settings = $.extend({
                modalId: null,
                valuesId: null,
                returnFromApi: '',
                imagePrev: false,
                cloudImagePrev: false,
                dbImgColName: '',
                imagePath: '',
                imagePrevClass: 'w-100',
                successCallback: null,
                confirm: null,          // true, or { msg, note, confirmLabel, closeLabel, icon, ... }
            }, options);

            /*
            |--------------------------------------------------------------------------
            | Validation
            |--------------------------------------------------------------------------
            */

            const { url, confirmOptions } = $.samiValidate.getData(settings, $(this));

            /*
            |--------------------------------------------------------------------------
            | Ajax Request
            |--------------------------------------------------------------------------
            */

            const run = function () {
                $.ajax({
                    type: "GET",
                    url: url,

                    success: function (response) {

                        // Callback
                        if (typeof settings.successCallback === "function") {
                            settings.successCallback(response);
                        }

                        // Validate API response
                        if (settings.returnFromApi && !response.hasOwnProperty(settings.returnFromApi)) {
                            throw new Error(`handleGetData: API response does not contain '${settings.returnFromApi}'.`);
                        }

                        /*
                        |--------------------------------------------------------------------------
                        | Show Modal
                        |--------------------------------------------------------------------------
                        */

                        if (settings.modalId) {
                            $('#' + settings.modalId).modal('show');
                        }

                        if (settings.imagePrev === true) {

                            $('.prev_image_view')
                                .addClass("text-center")
                                .html("")
                                .append(`
                                <img
                                    src="${settings.imagePath + response[settings.returnFromApi][settings.dbImgColName]}"
                                    alt="prev_image"
                                    class="prev_image ${settings.imagePrevClass}">
                            `);
                        }

                        if (settings.cloudImagePrev === true) {

                            $('.prev_image_view')
                                .addClass("text-center")
                                .html("")
                                .append(`
                                <img
                                    src="${response[settings.returnFromApi][settings.dbImgColName]}"
                                    alt="prev_image"
                                    class="prev_image ${settings.imagePrevClass}">
                            `);
                        }

                        // Set values
                        if (settings.valuesId && Object.keys(settings.valuesId).length > 0) {

                            for (let key in settings.valuesId) {

                                if (settings.valuesId.hasOwnProperty(key) && response[settings.returnFromApi].hasOwnProperty(key)) {
                                    $('#' + settings.valuesId[key]).val(response[settings.returnFromApi][key]);
                                }
                            }
                        }
                    },

                    error: function (xhr, status, error) {

                        $(document).sami_Toast_Append({
                            cus_toast_status: 'error',
                            cus_toast_time: 3000,
                            cus_toast_msg: `${xhr.status} : ${error}`
                        });
                    }
                });
            };

            if (confirmOptions) {
                $.samiModal.confirm(confirmOptions).then(function (ok) {
                    if (ok) run();
                });
            } else {
                run();
            }


        } catch (error) {

            // console.error(error);

            $(document).sami_Toast_Append({
                cus_toast_status: 'alert',
                cus_toast_time: 3000,
                cus_toast_msg: error.message
            });
        }
    };

})(jQuery);

(function ($) {
    $.fn.handleSubmit = function (formData, options) {

        try {

            const settings = $.extend({
                modalId: null,
                listName: null,
                classWithId: null,
                methodType: 'POST',
                samiToastDuration: 3000,
                beforeSendCallback: null,
                successCallback: null,
                completeCallBack: null,
                confirm: null,          // true, or { msg, note, confirmLabel, closeLabel, icon, ... }
            }, options);

            /*
            |--------------------------------------------------------------------------
            | Validation
            |--------------------------------------------------------------------------
            */

            const { url, methodType, modalInfo, confirmOptions } = $.samiValidate.submit(settings, this, formData);

            /*
            |--------------------------------------------------------------------------
            | Ajax Request
            |--------------------------------------------------------------------------
            */

            const run = function () {
                $.ajax({
                    url: url,
                    type: methodType,
                    data: formData,
                    processData: false,
                    contentType: false,
                    cache: false,

                    beforeSend: function () {
                        if (typeof settings.beforeSendCallback === "function") {
                            settings.beforeSendCallback();
                        }
                    },

                    success: function (response) {

                        if (typeof settings.successCallback === "function") {
                            settings.successCallback(response);
                        }

                        if (modalInfo) {
                            modalInfo.modal('hide');
                        }

                        $(document).sami_Toast_Append({
                            cus_toast_status: 'success',
                            cus_toast_time: settings.samiToastDuration,
                            cus_toast_msg: response && response.msg ? response.msg : 'Saved successfully'
                        });

                        if (modalInfo) {
                            modalInfo.load(location.href + " #" + settings.modalId + ">*", "");
                        }

                        if (settings.listName) {
                            $('.' + settings.listName).load(location.href + " ." + settings.listName + ">*", "");
                        }
                    },

                    error: function (xhr, error) {

                        $('.error_message').html('');
                        $('.form-control').removeClass('is-invalid');

                        if (xhr.status === 422 && xhr.responseJSON && xhr.responseJSON.errors) {

                            const errors = xhr.responseJSON.errors;

                            for (const key in errors) {
                                if (errors.hasOwnProperty(key)) {
                                    $(`#${key}`).addClass('is-invalid');
                                    $(`.${key}_error`).html(errors[key][0]);
                                }
                            }

                        } else {

                            $(document).sami_Toast_Append({
                                cus_toast_status: 'error',
                                cus_toast_time: settings.samiToastDuration,
                                cus_toast_msg: `${xhr.status} : ${error}`
                            });
                        }
                    },

                    complete: function () {
                        if (typeof settings.completeCallBack === "function") {
                            settings.completeCallBack();
                        }
                    }
                });
            };

            if (confirmOptions) {
                $.samiModal.confirm(confirmOptions).then(function (ok) {
                    if (ok) run();
                });
            } else {
                run();
            }


        } catch (error) {

            $(document).sami_Toast_Append({
                cus_toast_status: 'alert',
                cus_toast_time: 3000,
                cus_toast_msg: error.message
            });
        }
    };
})(jQuery);

(function ($) {

    const MODAL_ID = 'samiDeleteModal';

    $.fn.handleDelete = function (options) {

        try {

            const settings = $.extend({
                msg: null,
                note: 'This action cannot be undone.', // set to false to hide
                actionBtn: true,
                buttonLabel: 'Yes, Delete',
                imagePrevClass: 'w-100',
                method: false,
                icon: 'warning', // 'trash' | 'warning' | 'success' | 'info' | false
            }, options);

            /*
            |--------------------------------------------------------------------------
            | Validation
            |--------------------------------------------------------------------------
            */

            const { url, csrf } = $.samiValidate.delete(settings, this);

            const showValue = $(this).attr('data-value-name') || '';
            const showImage = $(this).attr('data-value-image') || '';

            const hasAction = settings.actionBtn !== false;
            const asForm = hasAction && settings.method === true;

            const $modal = $.samiModal.ensure(MODAL_ID);

            // Message (text only, so record names can't inject HTML)
            const $msg = $('<h5 class="text-danger mb-3 text-capitalize"></h5>')
                .append(document.createTextNode((settings.msg ?? 'Are You Sure To Delete') + ' '))
                .append($('<span class="text-dark fw-bold"></span>').text(showValue))
                .append(' ?');

            const $note = settings.note
                ? $('<p class="sami-modal__note mb-3"></p>').text(settings.note)
                : $();

            // Buttons
            const $actions = $.samiModal.buildActions({
                confirmLabel: hasAction ? settings.buttonLabel : null,
                confirmHref: hasAction && !asForm ? url : null,
                confirmType: 'submit',
            });

            // Content
            let $content;
            if (asForm) {
                $content = $('<form method="post"></form>')
                    .attr('action', url)
                    .append($('<input type="hidden" name="_token">').val(csrf))
                    .append('<input type="hidden" name="_method" value="DELETE">')
                    .append($msg, $note, $actions);
            } else {
                $content = $msg.add($note).add($actions);
            }

            // Image preview
            $modal.find('.sami-modal__image_prev').remove();
            if (showImage) {
                $('<div class="sami-modal__image_prev mb-3 text-center"></div>')
                    .append(
                        $('<img alt="prev_image">')
                            .attr('src', showImage)
                            .addClass('prev_image image_view_sami ' + settings.imagePrevClass)
                    )
                    .insertBefore($modal.find('.sami-modal__content_body'));
            }

            $modal.find('.sami-modal__content_body').empty().append($content);

            $.samiModal.open(MODAL_ID, settings.icon);

        } catch (error) {

            $(document).sami_Toast_Append({
                cus_toast_status: 'alert',
                cus_toast_time: 3000,
                cus_toast_msg: error.message
            });
        }
    };

})(jQuery);



