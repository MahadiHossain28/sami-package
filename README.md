# samipack — JavaScript Functions Documentation

A collection of jQuery functions for server-rendered web applications: toast notifications, image preview, loading data into a form, submitting a form with AJAX, a delete confirmation modal, and dependent selects.

## Requirements

Load these on the page before samipack:

- **jQuery** — from [jsDelivr](https://www.jsdelivr.com/package/npm/jquery) or [cdnjs](https://cdnjs.com/libraries/jquery).
- **Bootstrap** (CSS and JS) — used for buttons, utility classes, and the modals you pass as `modalId`. Load jQuery before Bootstrap's JS so that `$('#id').modal('show')` is available.
- **Font Awesome 6** — only for the toast HTML you write yourself for `cus_toast_auto`. Toasts created by `sami_Toast_Append`, including those from the AJAX functions, use built-in SVG icons and do not need it.

The AJAX functions follow Laravel conventions: a `<meta name="csrf-token">` tag, and validation errors returned with status 422 as `{ "errors": { "field": ["message"] } }`.

## How to Add

1. Add the CSS:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/MahadiHossain28/sami-package/dist/css/samipack.min.css">
```

2. Add the JS, after jQuery. For everything:

```html
<script src="https://cdn.jsdelivr.net/gh/MahadiHossain28/sami-package/dist/js/sami-all.min.js"></script>
```

Or include only the services you need:

| You want | File in `dist/js/` |
|---|---|
| Everything | `sami-all.js` |
| Toasts only (`cus_toast_auto`, `sami_Toast_Append`, `$.samiToast.config`) | `sami-toaster-services.js` |
| Image preview only (`image_preview`) | `sami-image-preview-service.js` |
| Submit button loading only (`samiBtnLoading`) | `sami-btn-loading.js` |
| AJAX (`handleGetData`, `handleSubmit`, `handleDelete`) — toasts and `samiBtnLoading` are included | `sami-ajax-services.js` |
| Dependent select only (`handleDependentSelect`) | `other-services.js` |

jsDelivr serves a minified copy of any file when you add `.min` before the extension, as in the URLs above.

## Functions List

1. [cus_toast_auto(options)](#1-cus_toast_autooptions)
2. [sami_Toast_Append(options)](#2-sami_toast_appendoptions)
3. [image_preview()](#3-image_preview)
4. [handleGetData(options)](#4-handlegetdataoptions)
5. [handleSubmit(formData, options)](#5-handlesubmitformdata-options)
6. [handleDelete(options)](#6-handledeleteoptions)
7. [handleDependentSelect(options)](#7-handledependentselectoptions)
8. [The `confirm` option](#the-confirm-option)
9. [Toast settings](#toast-settings) — `$.samiToast.config(options)`
10. [Submit button loading](#submit-button-loading) — `samiBtnLoading(loading)`, `$.samiBtnLoading.config(options)`

---

### 1. cus_toast_auto(options)

**Description:** Animates a toast that is already in the page's HTML, such as a flash message rendered by the server. It shows the toast, runs the progress bar, and removes it when the time is up. Hovering pauses the timer.

**Parameters:** the same options as [Toast settings](#toast-settings), all optional. `$.samiToast.config` must have been called first. An option you leave out takes the value from `$.samiToast.config`. `cus_toast_time` applies to this toast only; the colours and position apply to the whole page.

**Required HTML for Blade:** an element with the class `cus_toast`. Copy this html code into a blade file like `massage.blade.php`. Then call this file using `@include('massage')` on your master blade. there are two option select any one from below.

**Option 1.** Copy this code. 

```html
@if(Session::has('success'))
    <!-- Custom Toast For Success Start-->
    <div class="cus_toast">
        <div class="cus_toast-content">
            <span class="success">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>
            </span>

            <div class="message">
                <span class="cus_success">Success</span>
                <span class="text text-2">{{ Session::get('success') }}</span>
            </div>
        </div>
        <span class="sami_close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </span>

        <div class="progress"></div>
    </div>
    <!-- Custom Toast For Success End -->
@endif

@if(Session::has('alert'))
    <!-- Custom Toast For Alert Start-->
    <div class="cus_toast">
        <div class="cus_toast-content">
            <span class="success">

            </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" fill="currentColor"><path fill-rule="evenodd" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM11 9h2v5h-2zM12 15.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z"/></svg>

            <div class="message">
                <span class="cus_alert">Alert</span>
                <span class="text text-2">{{ Session::get('alert') }}</span>
            </div>
        </div>
        <span class="sami_close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </span>

        <div class="progress"></div>
    </div>
    <!-- Custom Toast For Alert End -->
@endif

@if(Session::has('error'))
    <!-- Custom Toast For Error Start-->
    <div class="cus_toast">
        <div class="cus_toast-content">
            <span class="error">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
            </span>

            <div class="message">
                <span class="cus_error">Error</span>
                <span class="text">{{ Session::get('error') }}</span>
            </div>
        </div>
        <span class="sami_close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </span>

        <div class="progress"></div>
    </div>
    <!-- Custom Toast For Error End -->
@endif
```

**Option 2.** Copy this code. 

```html
@php
    $types = [
        'success' => ['label' => 'Success', 'text' => 'text text-2'],
        'alert'   => ['label' => 'Alert',   'text' => 'text text-2'],
        'error'   => ['label' => 'Error',   'text' => 'text'],
    ];

    $stroke = 'fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"';

    $icons = [
        'success' => '<path d="M4 12.5l5 5L20 6.5"/>',
        'error'   => '<path d="M6 6l12 12M18 6L6 18"/>',
        'alert'   => '<path fill-rule="evenodd" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM11 9h2v5h-2zM12 15.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z"/>',
    ];
@endphp

@foreach($types as $type => $config)
    @if(Session::has($type))
        <div class="cus_toast">
            <div class="cus_toast-content">
                <span class="{{ $type }}">
                    @if($type === 'alert')
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" fill="currentColor">{!! $icons['alert'] !!}</svg>
                    @else
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {!! $stroke !!}>{!! $icons[$type] !!}</svg>
                    @endif
                </span>

                <div class="message">
                    <span class="cus_{{ $type }}">{{ $config['label'] }}</span>
                    <span class="{{ $config['text'] }}">{{ Session::get($type) }}</span>
                </div>
            </div>

            <span class="sami_close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {!! $stroke !!}>{!! $icons['error'] !!}</svg>
            </span>

            <div class="progress"></div>
        </div>
    @endif
@endforeach
```

**Usage Example:**

```javascript
$(document).ready(function () {
    $(document).cus_toast_auto({
        cus_toast_time: 3000,
        cus_toast_top: "50px",
        cus_toast_bg: "#fff",
        cus_toast_border: "#008080",
        cus_toast_text: "#333"
    });
});
```

---

### 2. sami_Toast_Append(options)

**Description:** Creates a toast from JavaScript and shows it. No HTML is needed. The AJAX functions below use it for their own messages.

**Parameters:**

| Option | Type | Default | Description |
|---|---|---|---|
| `cus_toast_status` | string | `'success'` | `'success'`, `'alert'`, or `'error'`. Any other value shows nothing. |
| `cus_toast_time` | number | `5000`, or the value from `$.samiToast.config` | How long the toast stays visible, in milliseconds. |
| `cus_toast_msg` | string | `"Hello"` | The message. It is inserted as HTML, so do not pass unescaped user input. |

**Usage Example:**

```javascript
$(document).sami_Toast_Append({
    cus_toast_status: 'success',
    cus_toast_time: 3000,
    cus_toast_msg: 'Operation successful!'
});
```

The toast gets its colours and position from [Toast settings](#toast-settings). Call `$.samiToast.config` once before showing a toast; without it, an alert toast with an error message is shown instead of yours.

---

### Toast settings

**`$.samiToast.config(options)`**

**Description:** Sets the values that both toast functions share. Call it once, any time after samipack has loaded; it does not need to wait for the page to be ready. It is required: until it has been called with valid options, `cus_toast_auto` and `sami_Toast_Append` show an alert toast with an error message instead of doing their work. That includes the toasts the AJAX functions show.

**Parameters:** pass only the options you want to change; the rest keep their defaults. To use every default, pass an empty object: `$.samiToast.config({})`. Calling it with no argument is an error.

**Invalid input:** a missing options argument, options that are not an object, an unknown option name, a `cus_toast_time` that is not a positive number, or any other option that is not a non-empty string is reported and ignored, and the current settings stay as they were. The message goes to the browser console and, once the page body exists, to an alert toast.

| Option | Type | Default | Description |
|---|---|---|---|
| `cus_toast_time` | number | `5000` | How long the toast stays visible, in milliseconds. |
| `cus_toast_top` | string | `"25px"` | Distance from the top of the viewport. |
| `cus_toast_bg` | string | `"#f2f2f2"` | Background colour of the toast. |
| `cus_toast_border` | string | `"#008080"` | Border and progress bar colour. |
| `cus_toast_success_bg` | string | `"#198754"` | Icon background and title colour for success. |
| `cus_toast_success_icon` | string | `"#ffffff"` | Icon colour for success. |
| `cus_toast_alert_bg` | string | `"#b3a022"` | Icon background and title colour for alert. |
| `cus_toast_alert_icon` | string | `"#1b1b1b"` | Icon colour for alert. |
| `cus_toast_error_bg` | string | `"#dc3545"` | Icon background and title colour for error. |
| `cus_toast_error_icon` | string | `"#ffffff"` | Icon colour for error. |
| `cus_toast_text` | string | `"#666666"` | Message text colour. |

`cus_toast_time` becomes the default for `cus_toast_auto` and `sami_Toast_Append` when they are called without their own `cus_toast_time`. The AJAX functions set their own toast times, so it does not change those.

**Returns:** an object with the current values. To read them without changing anything, call `$.samiToast.settings()`.

**Usage Example:**

```javascript
$.samiToast.config({
    cus_toast_time: 3000,
    cus_toast_top: "50px",
    cus_toast_border: "#008080"
});

$(document).sami_Toast_Append({ cus_toast_msg: 'Saved' }); // uses these values
$(document).cus_toast_auto();                              // and so does this
```

---

### 3. image_preview()

**Description:** Opens a full-screen preview of an image, with a close button. Call it on the `<img>` element; it reads the image from the element's `src`. It takes no options.

The stylesheet provides two helper classes for thumbnails: `image_view` (100 × 100 px with a pointer cursor) and `image_view_pointer` (pointer cursor only).

**Usage Example:**

```html
<img src="/uploads/photo.jpg" class="image_view" alt="photo">
```

```javascript
$(document).on('click', '.image_view', function () {
    $(this).image_preview();
});
```

---

### 4. handleGetData(options)

**Description:** Sends a GET request and uses the response to fill form fields, show an image, and open a modal. It is typically used for an "Edit" button. The URL is read from the **`value` attribute** of the element you call it on.

**Parameters:**

| Option | Type | Default | Description |
|---|---|---|---|
| `returnFromApi` | string | `''` | The key in the JSON response that holds the record, e.g. `'data'` for `{ "data": { ... } }`. Required with `valuesId`, `imagePrev`, or `cloudImagePrev`. |
| `valuesId` | object | `null` | Maps response fields to input IDs: `{ responseField: 'inputId' }`. Each input's value is set from the record. |
| `modalId` | string | `null` | ID of a Bootstrap modal to show after the data arrives. |
| `successCallback` | function | `null` | Called with the full response. Required when `valuesId` is not given. |
| `imagePrev` | boolean | `false` | Show an image stored on your server. The `src` is `imagePath` + the value of `dbImgColName`. |
| `cloudImagePrev` | boolean | `false` | Show an image whose full URL is stored in `dbImgColName`. |
| `dbImgColName` | string | `''` | The response field that holds the image file name or URL. |
| `imagePath` | string | `''` | Folder prefix for `imagePrev`, e.g. `'/storage/products/'`. |
| `imagePrevClass` | string | `'w-100'` | CSS class added to the preview image. |
| `confirm` | boolean / object | `null` | Ask before sending the request. See [The `confirm` option](#the-confirm-option). |

The image preview is placed inside the element with the class `prev_image_view`.

**Usage Example:**

```html
<button type="button" class="editButton" value="{{ route('products.edit', $product->id) }}">Edit</button>

<div class="modal fade" id="editModal">
    <div class="modal-dialog"><div class="modal-content"><div class="modal-body">
        <form id="updateForm" action="{{ route('products.update') }}">
            <input type="hidden" id="edit_id" name="id">
            <input type="text" id="edit_name" name="name" class="form-control">
            <div class="prev_image_view"></div>
            <button type="submit" class="btn btn-primary">Update</button>
        </form>
    </div></div></div>
</div>
```

```javascript
$(document).on('click', '.editButton', function () {
    $(this).handleGetData({
        modalId: 'editModal',
        returnFromApi: 'data',
        valuesId: {
            id: 'edit_id',       // response.data.id   -> #edit_id
            name: 'edit_name',   // response.data.name -> #edit_name
        },
        imagePrev: true,
        dbImgColName: 'image',
        imagePath: '/storage/products/',
    });
});
```

The server responds with:

```json
{ "data": { "id": 5, "name": "Widget", "image": "widget.jpg" } }
```

To handle the response yourself, leave out `valuesId` and pass a callback:

```javascript
$(this).handleGetData({
    successCallback: function (response) {
        console.log(response);
    }
});
```

Invalid options are reported as an alert toast, and a failed request as an error toast.

---

### 5. handleSubmit(formData, options)

**Description:** Submits a form with AJAX. On success it shows a success toast, closes the modal, and refreshes part of the page. On a validation error it marks the invalid fields. The URL is read from the form's **`action` attribute**.

**Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `formData` | FormData | — | The data to send. Required. |
| `options.methodType` | string | `'POST'` | `'POST'`, `'PUT'`, `'PATCH'`, or `'DELETE'`. |
| `options.modalId` | string | `null` | ID of the Bootstrap modal that contains the form. It is closed and its content reloaded after success. |
| `options.listName` | string | `null` | Class name of the list or table to reload after success. |
| `options.samiToastDuration` | number | `3000` | How long the result toast stays visible, in milliseconds. |
| `options.beforeSendCallback` | function | `null` | Called before the request is sent. With `loadingButton`, the submit button is already in its loading state. |
| `options.successCallback` | function | `null` | Called with the response on success. |
| `options.completeCallBack` | function | `null` | Called when the request finishes, whether it succeeded or failed. With `loadingButton`, the submit button has already been restored. |
| `options.confirm` | boolean / object | `null` | Ask before submitting. See [The `confirm` option](#the-confirm-option). |
| `options.loadingButton` | boolean | `false` | `true` disables the form's submit button and shows its loader while the request runs. Requires a `$.samiBtnLoading.config(...)` call first; see [Submit button loading](#submit-button-loading). |

**What the server should return:**

- **Success:** JSON with an optional `msg`, shown in the toast. Without it the toast reads "Saved successfully".
- **Validation error:** status 422 with `{ "errors": { "name": ["The name field is required."] } }`. For each field, the element with the ID `name` gets the class `is-invalid`, and the element with the class `name_error` shows the first message.
- **Any other error:** shown as an error toast with the status code.

**How the refresh works:** `modalId` and `listName` are refreshed by fetching the current page again and replacing only that element's content. They must therefore be rendered by the server at the current URL.

**Usage Example:**

```html
<table class="productList"> ... </table>

<form id="createForm" action="{{ route('products.store') }}">
    @csrf
    <input type="text" id="name" name="name" class="form-control">
    <span class="text-danger error_message name_error"></span>
    <button type="submit" class="btn btn-primary">
        <span class="submitBtnDetails">Save</span>
        <span class="submitBtnLoading" style="display: none;">Saving...</span>
    </button>
</form>
```

```javascript
$(document).on('submit', '#createForm', function (e) {
    e.preventDefault();
    let formData = new FormData(this);

    $(this).handleSubmit(formData, {
        modalId: 'createModal',
        listName: 'productList',
    });
});
```

**Updating with Laravel:** PHP does not read `FormData` sent as a real `PUT` or `PATCH` request. Keep `methodType: 'POST'` and add `@method('PUT')` inside the form instead.

---

### Submit button loading

**`samiBtnLoading(loading)`**

**Description:** Puts a form's submit button into its loading state, or takes it out again. Call it on the form. `handleSubmit` calls it for you when you pass `loadingButton: true`: on before the request is sent, off when the request completes. For every other form, either turn on `setAsGlobal` (below) or call it yourself.

**Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `loading` | boolean | `true` | `true` disables the button and shows the loader. `false` enables the button and hides the loader. |

**HTML it works on,** all inside the form:

- `button[type="submit"]` — disabled while loading.
- `.submitBtnLoading` — optional. Shown while loading. Hide it at first with `style="display: none;"`.
- `.submitBtnDetails` — the normal button label. Hidden while loading, but only when the form has a `.submitBtnLoading` element.

**Settings:** call `$.samiBtnLoading.config(options)` once, any time after samipack has loaded. Pass at least one option; the ones you leave out keep their defaults. It returns the current values. `handleSubmit` with `loadingButton: true` shows an alert toast instead of submitting if this call was never made, or was made only with invalid options.

**Invalid input:** a missing or empty options object, an unknown option, an empty or invalid selector, or a `setAsGlobal` or `loading` value that is not `true` or `false` is reported and ignored, and the current settings stay as they were. The message appears as an alert toast when the toast functions are loaded, otherwise in the browser console.

| Option | Type | Default | Description |
|---|---|---|---|
| `btnLoading` | string | `'.submitBtnLoading'` | jQuery selector of the loader element. A class name needs its leading dot. |
| `btnDetails` | string | `'.submitBtnDetails'` | jQuery selector of the normal button label. |
| `setAsGlobal` | boolean | `false` | `true` shows the loader automatically when any form on the page is submitted. |

```javascript
$.samiBtnLoading.config({
    btnLoading: '.submitBtnLoading',
    btnDetails: '.submitBtnDetails',
    setAsGlobal: true
});
```

**With `setAsGlobal: true`** you write no submit handler for the loader. A normal form keeps its loader until the next page loads. A form whose submit is cancelled by a script, such as an AJAX form, has its button reset straight away; for those, use `loadingButton: true` in `handleSubmit` or call `samiBtnLoading` yourself.

**Usage Example:**

```javascript
// One form, without setAsGlobal.
$(document).on('submit', '#myForm', function () {
    $(this).samiBtnLoading(true);
});

// Your own AJAX call.
$.ajax({
    url: url,
    beforeSend: function () { $('#myForm').samiBtnLoading(true); },
    complete: function () { $('#myForm').samiBtnLoading(false); }
});
```

---

### 6. handleDelete(options)

**Description:** Opens a confirmation modal before deleting a record. The modal is created automatically; you do not write any HTML for it. The delete URL is read from the **`value` attribute** of the element you call it on.

**Attributes on the trigger element:**

| Attribute | Description |
|---|---|
| `value` | The delete URL. Required. |
| `data-value-name` | Name of the record, shown in the message: "Are You Sure To Delete **Widget** ?" |
| `data-value-image` | Image URL to preview in the modal. Optional. |

**Parameters:**

| Option | Type | Default | Description |
|---|---|---|---|
| `method` | boolean | `false` | `false`: the confirm button is a link, so the URL is opened with GET. `true`: the confirm button submits a form with `_method=DELETE` and the CSRF token, for a Laravel `DELETE` route. |
| `msg` | string | `null` | Text before the record name. Defaults to "Are You Sure To Delete". |
| `note` | string / false | `'This action cannot be undone.'` | Small text under the message. `false` hides it. |
| `buttonLabel` | string | `'Yes, Delete'` | Label of the confirm button. |
| `actionBtn` | boolean | `true` | `false` hides the confirm button and leaves only Close. |
| `icon` | string / false | `'warning'` | `'trash'`, `'warning'`, `'success'`, `'info'`, or `false` for no icon. |
| `imagePrevClass` | string | `'w-100'` | CSS class added to the preview image. |

With `method: true` the page must contain `<meta name="csrf-token" content="{{ csrf_token() }}">`.

**Usage Example:**

```html
<button type="button" class="deleteButton"
        value="{{ route('products.destroy', $product->id) }}"
        data-value-name="{{ $product->name }}"
        data-value-image="{{ asset('storage/products/' . $product->image) }}">
    Delete
</button>
```

```javascript
$(document).on('click', '.deleteButton', function () {
    $(this).handleDelete({
        method: true,
        icon: 'trash',
    });
});
```

Invalid options are reported as an alert toast.

---

### 7. handleDependentSelect(options)

**Description:** Shows only the elements that belong to the value selected in a parent `<select>`, and hides the rest. Typical use: pick a country, then see only its cities. Call it on the parent select.

**Parameters:**

| Option | Type | Default | Description |
|---|---|---|---|
| `className` | string | `null` | Class shared by all the dependent elements. |
| `attributeName` | string | `null` | Attribute on each dependent element that holds its parent's value. |

Every element with that class and attribute gets the `hidden` attribute; those whose attribute equals the selected value have it removed.

**Usage Example:**

```html
<select id="country">
    <option value="">Select country</option>
    <option value="1">Bangladesh</option>
    <option value="2">Japan</option>
</select>

<select id="city">
    <option value="">Select city</option>
    <option class="cityOption" data-country="1" value="10" hidden>Dhaka</option>
    <option class="cityOption" data-country="1" value="11" hidden>Chattogram</option>
    <option class="cityOption" data-country="2" value="20" hidden>Tokyo</option>
</select>
```

```javascript
$(document).on('change', '#country', function () {
    $('#city').val('');
    $(this).handleDependentSelect({
        className: 'cityOption',
        attributeName: 'data-country'
    });
});
```

---

### The `confirm` option

`handleGetData` and `handleSubmit` accept a `confirm` option. When it is set, a confirmation modal opens first and the request is sent only if the user confirms.

Use `confirm: true` for the default modal, or pass an object to customise it:

| Key | Type | Default | Description |
|---|---|---|---|
| `msg` | string | `'Are you sure?'` | The question. |
| `note` | string | none | Small text under the question. |
| `confirmLabel` | string | `'Yes, Continue'` | Label of the confirm button. |
| `closeLabel` | string | `'No, Cancel'` | Label of the cancel button. |
| `confirmClass` | string | `'btn btn-primary'` | CSS classes of the confirm button. |
| `icon` | string / false | `'info'` | `'trash'`, `'warning'`, `'success'`, `'info'`, or `false`. |

An empty object (`confirm: {}`) is rejected; use `confirm: true` instead.

**Usage Example:**

```javascript
$(this).handleSubmit(formData, {
    listName: 'productList',
    confirm: {
        msg: 'Publish this product?',
        note: 'Customers will see it immediately.',
        confirmLabel: 'Yes, Publish',
        icon: 'warning',
    },
});
```

---
