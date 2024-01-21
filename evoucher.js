"use strict";
(self["webpackChunksigmasports_web"] = self["webpackChunksigmasports_web"] || []).push([[3955], {
    8355: ((__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{
        var tiny_date_picker_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4858);
        const CURRENCY_REGEX = /^\d{0,4}(?:\.\d{0,2}){0,1}$/;
        class EvoucherWizard {
            minimumValue = -1000;
            maximumValue = 5000;
            deliveryDate = {};
            voucherValues = {};
            submitButton = null;
            delivery = {};
            elements = null;
            constructor(props) {
                this.setProps(props);
                this.setElements();
                this.setupInputsEventListeners();
                this.initDeliveryDatePicker();
                this.setupFormSubmitListeners();
            }
            setProps({minimumValue, maximumValue, deliveryDate, voucherValues}) {
                this.minimumValue = minimumValue;
                this.maximumValue = maximumValue;
                this.deliveryDate = deliveryDate;
                this.voucherValues = voucherValues || {};
            }
            setElements() {
                const voucherWizard = document.querySelector('#js_voucher-wizard');
                const voucherDesignView = voucherWizard.querySelector('#js_voudher_design_view');
                this.elements = {
                    voucherWizard,
                    submitButton: voucherWizard.querySelector('#js_submit'),
                    valueContainer: voucherWizard.querySelector('#js_value_container'),
                    valueError: voucherWizard.querySelector('#js_value_error'),
                    voucherDesignView,
                    voucherDesignWebpImage: voucherDesignView.querySelector('#js_voudher_design_webp_image'),
                    voucherDesignImage: voucherDesignView.querySelector('#js_voudher_design_image'),
                    valueView: voucherWizard.querySelector('#js_value_view'),
                    toNameView: voucherWizard.querySelector('#js_to_name_view'),
                    fromNameView: voucherWizard.querySelector('#js_from_name_view'),
                    messageView: voucherWizard.querySelector('#js_message_view'),
                    customDeliveryDateView: voucherWizard.querySelector('#js_custom_delivery_date'),
                    design: voucherWizard.querySelector('#design'),
                    designId: voucherWizard.querySelector('#design_id'),
                    value: voucherWizard.querySelector('#value'),
                    toName: voucherWizard.querySelector('#to_name'),
                    fromName: voucherWizard.querySelector('#from_name'),
                    message: voucherWizard.querySelector('#message'),
                    deliveryType: voucherWizard.querySelectorAll('input[name="delivery_type"]'),
                    deliveryDate: voucherWizard.querySelector('#delivery_date'),
                    toEmail: voucherWizard.querySelector('#to_email'),
                    toEmailConfirm: voucherWizard.querySelector('#to_email_confirm')
                };
            }
            setupInputsEventListeners() {
                this.elements.design.addEventListener('change', ()=>{
                    this.setFixedValue();
                    this.updatePreview();
                    this.updateDesignPreview();
                }
                );
                this.elements.value.addEventListener('input', this.updatePreview);
                this.elements.toName.addEventListener('keyup', this.updatePreview);
                this.elements.fromName.addEventListener('keyup', this.updatePreview);
                this.elements.message.addEventListener('keyup', this.updatePreview);
                this.elements.deliveryType.forEach(node=>{
                    node.addEventListener('change', e=>{
                        const deliveryOption = e.target.value;
                        this.elements.customDeliveryDateView.style.display = deliveryOption === "1" ? 'none' : 'block';
                    }
                    );
                }
                );
                this.elements.toEmail.addEventListener('paste', e=>e.preventDefault());
                this.elements.toEmailConfirm.addEventListener('paste', e=>e.preventDefault());
            }
            initDeliveryDatePicker() {
                let options = {};
                if (this.deliveryDate) {
                    options = {
                        mode: 'dp-below',
                        min: new Date(),
                        max: new Date(this.deliveryDate * 1000),
                        format(date) {
                            return date.toLocaleDateString('en-GB');
                        },
                        parse(dateString) {
                            const dateParts = dateString.split('/');
                            const date = new Date(dateParts[2],dateParts[1] - 1,dateParts[0]);
                            return isNaN(date) ? new Date() : date;
                        }
                    }
                }
                (0,
                tiny_date_picker_src_index__WEBPACK_IMPORTED_MODULE_0__.Z)(this.elements.deliveryDate, options);
            }
            ;setupFormSubmitListeners() {
                this.submitButtonLoader = new Loader({
                    element: this.elements.submitButton,
                    size: 'small',
                    color: 'white'
                });
                this.elements.voucherWizard.addEventListener('submit', event=>{
                    this.submitButtonLoader.show();
                    let isValid = true;
                    event.currentTarget.querySelectorAll('.val_req').forEach(element=>{
                        if (!element.hidden) {
                            isValid = this.validate(element);
                            if (!isValid) {
                                this.submitButtonLoader.hide();
                                event.preventDefault();
                            }
                        }
                    }
                    );
                }
                );
            }
            updatePreview = ()=>{
                let value = this.elements.value.value;
                const toName = this.elements.toName.value
                  , fromName = this.elements.fromName.value
                  , message = this.elements.message.value;
                if (value.match(CURRENCY_REGEX)) {
                    if (value === "") {
                        value = 0;
                    }
                    if (value >= this.minimumValue && value <= this.maximumValue) {
                        this.elements.valueView.innerText = Number.parseFloat(value).toFixed(2);
                        this.elements.valueContainer.style.display = 'block';
                        this.elements.valueError.style.display = 'none';
                    } else {
                        this.elements.valueContainer.style.display = 'none';
                        this.elements.valueError.style.display = 'block';
                    }
                } else {
                    this.elements.valueContainer.style.display = 'none';
                    this.elements.valueError.style.display = 'block';
                }
                this.elements.toNameView.innerText = toName;
                this.elements.fromNameView.innerText = fromName;
                this.elements.messageView.innerText = message;
            }
            updateDesignPreview = ()=>{
                const selectedDesign = this.elements.design.options[this.elements.design.selectedIndex];
                this.elements.voucherDesignWebpImage.setAttribute('srcset', selectedDesign.getAttribute('data-image-webp'));
                this.elements.voucherDesignImage.setAttribute('srcset', selectedDesign.getAttribute('data-image'));
                this.elements.designId.value = selectedDesign.value;
            }
            setFixedValue = ()=>{
                const voucherHandle = this.elements.design.value;
                if (this.voucherValues.hasOwnProperty(voucherHandle)) {
                    if (!this.voucherValues.custom_value) {
                        this.voucherValues.custom_value = this.elements.value.value;
                    }
                    this.elements.value.value = Number(this.voucherValues[voucherHandle]);
                    this.elements.value.setAttribute('readonly', true);
                } else {
                    if (this.voucherValues.custom_value) {
                        this.elements.value.value = this.voucherValues.custom_value;
                        this.voucherValues.custom_value = null;
                    }
                    this.elements.value.removeAttribute('readonly');
                }
            }
            validate = (field)=>{
                let isFieldValid = true;
                if (isFieldValid && field.classList.contains('val_req')) {
                    if (field.value === '') {
                        isFieldValid = false;
                    }
                }
                if (isFieldValid && field.classList.contains('val_email')) {
                    if (field.value.match("(.+)@(.+)") === null) {
                        isFieldValid = false;
                    }
                }
                if (isFieldValid && field.classList.contains('val_match')) {
                    const toCompareAgainst = document.querySelector('#' + field.getAttribute('rel')).value;
                    if (field.value !== toCompareAgainst) {
                        isFieldValid = false;
                    }
                }
                if (isFieldValid === false) {
                    field.classList.remove('inp_VALID', 'inp_INVALID');
                    this.invalid(field);
                    return 0;
                } else {
                    field.classList.remove('inp_INVALID', 'inp_VALID');
                    this.valid(field);
                    return 1;
                }
            }
            valid(field) {
                if (field.matches('input[type="text"], input[type="number"], input[type="email"], select')) {
                    let parent = field.parentNode;
                    let errorMessage = parent.querySelector('div.error-message');
                    if (errorMessage && errorMessage.parentNode) {
                        errorMessage.parentNode.removeChild(errorMessage);
                    }
                }
            }
            ;invalid(field) {
                let parent = field.parentNode;
                let errorMessage = parent.querySelector('div.error-message');
                if (errorMessage && errorMessage.parentNode) {
                    errorMessage.parentNode.removeChild(errorMessage);
                }
                let errorElement = document.createElement("div");
                errorElement.classList.add('error-message');
                errorElement.innerText = field.getAttribute('data');
                parent.appendChild(errorElement);
            }
        }
        window.EvoucherWizard = EvoucherWizard;
    }
    ),
    3095: (()=>{}
    ),
    4858: ((__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{
        __webpack_require__.d(__webpack_exports__, {
            Z: ()=>(TinyDatePicker)
        });
        ;function now() {
            var dt = new Date();
            dt.setHours(0, 0, 0, 0);
            return dt;
        }
        function datesEq(date1, date2) {
            return (date1 && date1.toDateString()) === (date2 && date2.toDateString());
        }
        function shiftDay(dt, n) {
            dt = new Date(dt);
            dt.setDate(dt.getDate() + n);
            return dt;
        }
        function shiftMonth(dt, n, wrap) {
            dt = new Date(dt);
            var dayOfMonth = dt.getDate();
            var month = dt.getMonth() + n;
            dt.setDate(1);
            dt.setMonth(wrap ? (12 + month) % 12 : month);
            dt.setDate(dayOfMonth);
            if (dt.getDate() < dayOfMonth) {
                dt.setDate(0);
            }
            return dt;
        }
        function shiftYear(dt, n) {
            dt = new Date(dt);
            dt.setFullYear(dt.getFullYear() + n);
            return dt;
        }
        function setYear(dt, year) {
            dt = new Date(dt);
            dt.setFullYear(year);
            return dt;
        }
        function setMonth(dt, month) {
            return shiftMonth(dt, month - dt.getMonth());
        }
        function dateOrParse(parse) {
            return function(dt) {
                return dropTime(typeof dt === 'string' ? parse(dt) : dt);
            }
            ;
        }
        function constrainDate(dt, min, max) {
            return (dt < min) ? min : (dt > max) ? max : dt;
        }
        function dropTime(dt) {
            dt = new Date(dt);
            dt.setHours(0, 0, 0, 0);
            return dt;
        }
        ;function bufferFn(ms, fn) {
            var timeout = undefined;
            return function() {
                clearTimeout(timeout);
                timeout = setTimeout(fn, ms);
            }
            ;
        }
        function noop() {}
        function cp() {
            var args = arguments;
            var o1 = args[0];
            for (var i = 1; i < args.length; ++i) {
                var o2 = args[i] || {};
                for (var key in o2) {
                    o1[key] = o2[key];
                }
            }
            return o1;
        }
        ;var english = {
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ],
            today: 'Today',
            clear: 'Clear',
            close: 'Close',
        };
        function DatePickerOptions(opts) {
            opts = opts || {};
            opts = cp(defaults(), opts);
            var parse = dateOrParse(opts.parse);
            opts.lang = cp(english, opts.lang);
            opts.parse = parse;
            opts.inRange = makeInRangeFn(opts);
            opts.min = parse(opts.min || shiftYear(now(), -100));
            opts.max = parse(opts.max || shiftYear(now(), 100));
            opts.hilightedDate = opts.parse(opts.hilightedDate);
            return opts;
        }
        function defaults() {
            return {
                lang: english,
                mode: 'dp-modal',
                hilightedDate: now(),
                format: function(dt) {
                    return (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
                },
                parse: function(str) {
                    var date = new Date(str);
                    return isNaN(date) ? now() : date;
                },
                dateClass: function() {},
                inRange: function() {
                    return true;
                },
                appendTo: document.body,
            };
        }
        function makeInRangeFn(opts) {
            var inRange = opts.inRange;
            return function(dt, dp) {
                return inRange(dt, dp) && opts.min <= dt && opts.max >= dt;
            }
            ;
        }
        ;var Key = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            enter: 13,
            esc: 27,
        };
        function on(evt, el, handler) {
            el.addEventListener(evt, handler, true);
            return function() {
                el.removeEventListener(evt, handler, true);
            }
            ;
        }
        var CustomEvent = shimCustomEvent();
        function shimCustomEvent() {
            var CustomEvent = window.CustomEvent;
            if (typeof CustomEvent !== 'function') {
                CustomEvent = function(event, params) {
                    params = params || {
                        bubbles: false,
                        cancelable: false,
                        detail: undefined
                    };
                    var evt = document.createEvent('CustomEvent');
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                }
                ;
                CustomEvent.prototype = window.Event.prototype;
            }
            return CustomEvent;
        }
        ;const day_picker = ({
            onKeyDown: keyDown,
            onClick: {
                'dp-day': selectDay,
                'dp-next': gotoNextMonth,
                'dp-prev': gotoPrevMonth,
                'dp-today': selectToday,
                'dp-clear': clear,
                'dp-close': day_picker_close,
                'dp-cal-month': showMonthPicker,
                'dp-cal-year': showYearPicker,
            },
            render: render
        });
        function render(dp) {
            var opts = dp.opts;
            var lang = opts.lang;
            var state = dp.state;
            var dayNames = lang.days;
            var dayOffset = opts.dayOffset || 0;
            var selectedDate = state.selectedDate;
            var hilightedDate = state.hilightedDate;
            var hilightedMonth = hilightedDate.getMonth();
            var today = now().getTime();
            return ('<div class="dp-cal">' + '<header class="dp-cal-header">' + '<button tabindex="-1" type="button" class="dp-prev">Prev</button>' + '<button tabindex="-1" type="button" class="dp-cal-month">' + lang.months[hilightedMonth] + '</button>' + '<button tabindex="-1" type="button" class="dp-cal-year">' + hilightedDate.getFullYear() + '</button>' + '<button tabindex="-1" type="button" class="dp-next">Next</button>' + '</header>' + '<div class="dp-days">' + dayNames.map(function(name, i) {
                return ('<span class="dp-col-header">' + dayNames[(i + dayOffset) % dayNames.length] + '</span>');
            }).join('') + mapDays(hilightedDate, dayOffset, function(date) {
                var isNotInMonth = date.getMonth() !== hilightedMonth;
                var isDisabled = !opts.inRange(date);
                var isToday = date.getTime() === today;
                var className = 'dp-day';
                className += (isNotInMonth ? ' dp-edge-day' : '');
                className += (datesEq(date, hilightedDate) ? ' dp-current' : '');
                className += (datesEq(date, selectedDate) ? ' dp-selected' : '');
                className += (isDisabled ? ' dp-day-disabled' : '');
                className += (isToday ? ' dp-day-today' : '');
                className += ' ' + opts.dateClass(date, dp);
                return ('<button tabindex="-1" type="button" class="' + className + '" data-date="' + date.getTime() + '">' + date.getDate() + '</button>');
            }) + '</div>' + '<footer class="dp-cal-footer">' + '<button tabindex="-1" type="button" class="dp-today">' + lang.today + '</button>' + '<button tabindex="-1" type="button" class="dp-clear">' + lang.clear + '</button>' + '<button tabindex="-1" type="button" class="dp-close">' + lang.close + '</button>' + '</footer>' + '</div>');
        }
        function keyDown(e, dp) {
            var key = e.keyCode;
            var shiftBy = (key === Key.left) ? -1 : (key === Key.right) ? 1 : (key === Key.up) ? -7 : (key === Key.down) ? 7 : 0;
            if (key === Key.esc) {
                dp.close();
            } else if (shiftBy) {
                e.preventDefault();
                dp.setState({
                    hilightedDate: shiftDay(dp.state.hilightedDate, shiftBy)
                });
            }
        }
        function selectToday(e, dp) {
            dp.setState({
                selectedDate: now(),
            });
        }
        function clear(e, dp) {
            dp.setState({
                selectedDate: null,
            });
        }
        function day_picker_close(e, dp) {
            dp.close();
        }
        function showMonthPicker(e, dp) {
            dp.setState({
                view: 'month'
            });
        }
        function showYearPicker(e, dp) {
            dp.setState({
                view: 'year'
            });
        }
        function gotoNextMonth(e, dp) {
            var hilightedDate = dp.state.hilightedDate;
            dp.setState({
                hilightedDate: shiftMonth(hilightedDate, 1)
            });
        }
        function gotoPrevMonth(e, dp) {
            var hilightedDate = dp.state.hilightedDate;
            dp.setState({
                hilightedDate: shiftMonth(hilightedDate, -1)
            });
        }
        function selectDay(e, dp) {
            dp.setState({
                selectedDate: new Date(parseInt(e.target.getAttribute('data-date'))),
            });
        }
        function mapDays(currentDate, dayOffset, fn) {
            var result = '';
            var iter = new Date(currentDate);
            iter.setDate(1);
            iter.setDate(1 - iter.getDay() + dayOffset);
            if (dayOffset && iter.getDate() === dayOffset + 1) {
                iter.setDate(dayOffset - 6);
            }
            for (var day = 0; day < (6 * 7); ++day) {
                result += fn(iter);
                iter.setDate(iter.getDate() + 1);
            }
            return result;
        }
        ;const month_picker = ({
            onKeyDown: month_picker_keyDown,
            onClick: {
                'dp-month': onChooseMonth
            },
            render: month_picker_render
        });
        function onChooseMonth(e, dp) {
            dp.setState({
                hilightedDate: setMonth(dp.state.hilightedDate, parseInt(e.target.getAttribute('data-month'))),
                view: 'day',
            });
        }
        function month_picker_render(dp) {
            var opts = dp.opts;
            var lang = opts.lang;
            var months = lang.months;
            var currentDate = dp.state.hilightedDate;
            var currentMonth = currentDate.getMonth();
            return ('<div class="dp-months">' + months.map(function(month, i) {
                var className = 'dp-month';
                className += (currentMonth === i ? ' dp-current' : '');
                return ('<button tabindex="-1" type="button" class="' + className + '" data-month="' + i + '">' + month + '</button>');
            }).join('') + '</div>');
        }
        function month_picker_keyDown(e, dp) {
            var key = e.keyCode;
            var shiftBy = (key === Key.left) ? -1 : (key === Key.right) ? 1 : (key === Key.up) ? -3 : (key === Key.down) ? 3 : 0;
            if (key === Key.esc) {
                dp.setState({
                    view: 'day',
                });
            } else if (shiftBy) {
                e.preventDefault();
                dp.setState({
                    hilightedDate: shiftMonth(dp.state.hilightedDate, shiftBy, true)
                });
            }
        }
        ;const year_picker = ({
            render: year_picker_render,
            onKeyDown: year_picker_keyDown,
            onClick: {
                'dp-year': onChooseYear
            },
        });
        function year_picker_render(dp) {
            var state = dp.state;
            var currentYear = state.hilightedDate.getFullYear();
            var selectedYear = state.selectedDate.getFullYear();
            return ('<div class="dp-years">' + mapYears(dp, function(year) {
                var className = 'dp-year';
                className += (year === currentYear ? ' dp-current' : '');
                className += (year === selectedYear ? ' dp-selected' : '');
                return ('<button tabindex="-1" type="button" class="' + className + '" data-year="' + year + '">' + year + '</button>');
            }) + '</div>');
        }
        function onChooseYear(e, dp) {
            dp.setState({
                hilightedDate: setYear(dp.state.hilightedDate, parseInt(e.target.getAttribute('data-year'))),
                view: 'day',
            });
        }
        function year_picker_keyDown(e, dp) {
            var key = e.keyCode;
            var opts = dp.opts;
            var shiftBy = (key === Key.left || key === Key.up) ? 1 : (key === Key.right || key === Key.down) ? -1 : 0;
            if (key === Key.esc) {
                dp.setState({
                    view: 'day',
                });
            } else if (shiftBy) {
                e.preventDefault();
                var shiftedYear = shiftYear(dp.state.hilightedDate, shiftBy);
                dp.setState({
                    hilightedDate: constrainDate(shiftedYear, opts.min, opts.max),
                });
            }
        }
        function mapYears(dp, fn) {
            var result = '';
            var max = dp.opts.max.getFullYear();
            for (var i = max; i >= dp.opts.min.getFullYear(); --i) {
                result += fn(i);
            }
            return result;
        }
        ;var views = {
            day: day_picker,
            year: year_picker,
            month: month_picker
        };
        function BaseMode(input, emit, opts) {
            var detatchInputEvents;
            var closing = false;
            var selectedDate;
            var dp = {
                el: undefined,
                opts: opts,
                shouldFocusOnBlur: true,
                shouldFocusOnRender: true,
                state: initialState(),
                adjustPosition: noop,
                containerHTML: '<div class="dp"></div>',
                attachToDom: function() {
                    opts.appendTo.appendChild(dp.el);
                },
                updateInput: function(selectedDate) {
                    var e = new CustomEvent('change',{
                        bubbles: true
                    });
                    e.simulated = true;
                    input.value = selectedDate ? opts.format(selectedDate) : '';
                    input.dispatchEvent(e);
                },
                computeSelectedDate: function() {
                    return opts.parse(input.value);
                },
                currentView: function() {
                    return views[dp.state.view];
                },
                open: function() {
                    if (closing) {
                        return;
                    }
                    if (!dp.el) {
                        dp.el = createContainerElement(opts, dp.containerHTML);
                        attachContainerEvents(dp);
                    }
                    selectedDate = constrainDate(dp.computeSelectedDate(), opts.min, opts.max);
                    dp.state.hilightedDate = selectedDate || opts.hilightedDate;
                    dp.state.view = 'day';
                    dp.attachToDom();
                    dp.render();
                    emit('open');
                },
                isVisible: function() {
                    return !!dp.el && !!dp.el.parentNode;
                },
                hasFocus: function() {
                    var focused = document.activeElement;
                    return dp.el && dp.el.contains(focused) && focused.className.indexOf('dp-focuser') < 0;
                },
                shouldHide: function() {
                    return dp.isVisible();
                },
                close: function(becauseOfBlur) {
                    var el = dp.el;
                    if (!dp.isVisible()) {
                        return;
                    }
                    if (el) {
                        var parent = el.parentNode;
                        parent && parent.removeChild(el);
                    }
                    closing = true;
                    if (becauseOfBlur && dp.shouldFocusOnBlur) {
                        focusInput(input);
                    }
                    setTimeout(function() {
                        closing = false;
                    }, 100);
                    emit('close');
                },
                destroy: function() {
                    dp.close();
                    detatchInputEvents();
                },
                render: function() {
                    if (!dp.el) {
                        return;
                    }
                    var hadFocus = dp.hasFocus();
                    var html = dp.currentView().render(dp);
                    html && (dp.el.firstChild.innerHTML = html);
                    dp.adjustPosition();
                    if (hadFocus || dp.shouldFocusOnRender) {
                        focusCurrent(dp);
                    }
                },
                setState: function(state) {
                    for (var key in state) {
                        dp.state[key] = state[key];
                    }
                    emit('statechange');
                    dp.render();
                },
            };
            detatchInputEvents = attachInputEvents(input, dp);
            function initialState() {
                return {
                    get selectedDate() {
                        return selectedDate;
                    },
                    set selectedDate(dt) {
                        if (dt && !opts.inRange(dt)) {
                            return;
                        }
                        if (dt) {
                            selectedDate = new Date(dt);
                            dp.state.hilightedDate = selectedDate;
                        } else {
                            selectedDate = dt;
                        }
                        dp.updateInput(selectedDate);
                        emit('select');
                        dp.close();
                    },
                    view: 'day',
                };
            }
            return dp;
        }
        function createContainerElement(opts, containerHTML) {
            var el = document.createElement('div');
            el.className = opts.mode;
            el.innerHTML = containerHTML;
            return el;
        }
        function attachInputEvents(input, dp) {
            var bufferShow = bufferFn(5, function() {
                if (dp.shouldHide()) {
                    dp.close();
                } else {
                    dp.open();
                }
            });
            var off = [on('blur', input, bufferFn(150, function() {
                if (!dp.hasFocus()) {
                    dp.close(true);
                }
            })), on('mousedown', input, function() {
                if (input === document.activeElement) {
                    bufferShow();
                }
            }), on('focus', input, bufferShow), on('input', input, function(e) {
                var date = dp.opts.parse(e.target.value);
                isNaN(date) || dp.setState({
                    hilightedDate: date
                });
            }), ];
            return function() {
                off.forEach(function(f) {
                    f();
                });
            }
            ;
        }
        function focusCurrent(dp) {
            var current = dp.el.querySelector('.dp-current');
            return current && current.focus();
        }
        function attachContainerEvents(dp) {
            var el = dp.el;
            var calEl = el.querySelector('.dp');
            el.ontouchstart = noop;
            function onClick(e) {
                e.target.className.split(' ').forEach(function(evt) {
                    var handler = dp.currentView().onClick[evt];
                    handler && handler(e, dp);
                });
            }
            on('blur', calEl, bufferFn(150, function() {
                if (!dp.hasFocus()) {
                    dp.close(true);
                }
            }));
            on('keydown', el, function(e) {
                if (e.keyCode === Key.enter) {
                    onClick(e);
                } else {
                    dp.currentView().onKeyDown(e, dp);
                }
            });
            on('mousedown', calEl, function(e) {
                e.target.focus && e.target.focus();
                if (document.activeElement !== e.target) {
                    e.preventDefault();
                    focusCurrent(dp);
                }
            });
            on('click', el, onClick);
        }
        function focusInput(input) {
            input.focus();
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                input.blur();
            }
        }
        ;function ModalMode(input, emit, opts) {
            var dp = BaseMode(input, emit, opts);
            input.readonly = true;
            dp.containerHTML += '<a href="#" class="dp-focuser">.</a>';
            return dp;
        }
        ;function DropdownMode(input, emit, opts) {
            var dp = BaseMode(input, emit, opts);
            dp.shouldFocusOnBlur = false;
            Object.defineProperty(dp, 'shouldFocusOnRender', {
                get: function() {
                    return input !== document.activeElement;
                }
            });
            dp.adjustPosition = function() {
                autoPosition(input, dp);
            }
            ;
            return dp;
        }
        function autoPosition(input, dp) {
            var inputPos = input.getBoundingClientRect();
            var win = window;
            adjustCalY(dp, inputPos, win);
            adjustCalX(dp, inputPos, win);
            dp.el.style.visibility = '';
        }
        function adjustCalX(dp, inputPos, win) {
            var cal = dp.el;
            var scrollLeft = win.pageXOffset;
            var inputLeft = inputPos.left + scrollLeft;
            var maxRight = win.innerWidth + scrollLeft;
            var offsetWidth = cal.offsetWidth;
            var calRight = inputLeft + offsetWidth;
            var shiftedLeft = maxRight - offsetWidth;
            var left = calRight > maxRight && shiftedLeft > 0 ? shiftedLeft : inputLeft;
            cal.style.left = left + 'px';
        }
        function adjustCalY(dp, inputPos, win) {
            var cal = dp.el;
            var scrollTop = win.pageYOffset;
            var inputTop = scrollTop + inputPos.top;
            var calHeight = cal.offsetHeight;
            var belowTop = inputTop + inputPos.height + 8;
            var aboveTop = inputTop - calHeight - 8;
            var isAbove = (aboveTop > 0 && belowTop + calHeight > scrollTop + win.innerHeight);
            var top = isAbove ? aboveTop : belowTop;
            if (cal.classList) {
                cal.classList.toggle('dp-is-above', isAbove);
                cal.classList.toggle('dp-is-below', !isAbove);
            }
            cal.style.top = top + 'px';
        }
        ;function PermanentMode(root, emit, opts) {
            var dp = BaseMode(root, emit, opts);
            dp.close = noop;
            dp.updateInput = noop;
            dp.shouldFocusOnRender = opts.shouldFocusOnRender;
            dp.computeSelectedDate = function() {
                return opts.hilightedDate;
            }
            ;
            dp.attachToDom = function() {
                root.appendChild(dp.el);
            }
            ;
            dp.open();
            return dp;
        }
        ;function Mode(input, emit, opts) {
            input = input && input.tagName ? input : document.querySelector(input);
            if (opts.mode === 'dp-modal') {
                return ModalMode(input, emit, opts);
            }
            if (opts.mode === 'dp-below') {
                return DropdownMode(input, emit, opts);
            }
            if (opts.mode === 'dp-permanent') {
                return PermanentMode(input, emit, opts);
            }
        }
        ;function Emitter() {
            var handlers = {};
            function onOne(name, handler) {
                (handlers[name] = (handlers[name] || [])).push(handler);
            }
            function onMany(fns) {
                for (var name in fns) {
                    onOne(name, fns[name]);
                }
            }
            return {
                on: function(name, handler) {
                    if (handler) {
                        onOne(name, handler);
                    } else {
                        onMany(name);
                    }
                    return this;
                },
                emit: function(name, arg) {
                    (handlers[name] || []).forEach(function(handler) {
                        handler(name, arg);
                    });
                },
                off: function(name, handler) {
                    if (!name) {
                        handlers = {};
                    } else if (!handler) {
                        handlers[name] = [];
                    } else {
                        handlers[name] = (handlers[name] || []).filter(function(h) {
                            return h !== handler;
                        });
                    }
                    return this;
                }
            };
        }
        ;function TinyDatePicker(input, opts) {
            var emitter = Emitter();
            var options = DatePickerOptions(opts);
            var mode = Mode(input, emit, options);
            var me = {
                get state() {
                    return mode.state;
                },
                on: emitter.on,
                off: emitter.off,
                setState: mode.setState,
                open: mode.open,
                close: mode.close,
                destroy: mode.destroy,
            };
            function emit(evt) {
                emitter.emit(evt, me);
            }
            return me;
        }
    }
    )
}, __webpack_require__=>{
    var __webpack_exec__ = (moduleId)=>(__webpack_require__(__webpack_require__.s = moduleId))
    var __webpack_exports__ = (__webpack_exec__(8355),
    __webpack_exec__(3095));
}
]);
