odoo.define('web.mytime', function (require) {
    "use strict";
    var core = require('web.core');
    //var dom = require('web.dom');
    //var session = require('web.session');
    var time = require('web.time');
    //var utils = require('web.utils');

    var _t = core._t;
    console.info("hi there")
    debugger;

    time._getLangDateFormat = time.getLangDateFormat;
    time.getLangDateFormat = function(){

        console.error('here');
        return "jYYYY/jM/jD"
        return this._getLangDateFormat()
    }
    time._getLangDatetimeFormat = time.getLangDatetimeFormat;
    time.getLangDatetimeFormat = function(){

        console.error('DateTimeFormat');
        return "jYYYY/jM/jD"
        return this._getLangDateFormat()
    }




});