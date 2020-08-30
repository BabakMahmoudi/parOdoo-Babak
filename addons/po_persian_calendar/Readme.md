Persian Calendar
================
Provides Persian Calendar support in Odoo.
This is part of parOdoo. ParOdoo is meant to be a place for Odoo localization for Iran.

Usage:
=====

Technical Notes
===============
Odoo mainpulation of DateTime data relies on Moment. Unfortunatly Moment lacks the concept of "Calendar", that is often used in other frameworks and its completely clueless to support calendars other than Gregorian, such as the Persian Calendar (also known as Jalali), that's being used in Iran.
It seems that introducing the concept of 'Calendar', so that a user can select it as her preference, reuires low-level changes in Odoo that may be considered to be out of the scope of our efforts here.

## Implementation
First of all we need to bring 'Persian Calendar' support to Moment. We will use [moment-jalali](https://github.com/jalaali/moment-jalaali) which is the Jalaali (Jalali, Persian, Khorshidi, Shamsi) calendar system plugin for moment.js. The plugin will be inserted in web assets with a template like this:

```xml
<odoo>
    <data>
        <template id="persian_calendar" inherit_id="web.assets_common">
            <xpath expr="//script[@src='/web/static/lib/moment/moment.js']" position="after">
            	<script type="text/javascript" src="/po_persian_calendar/static/src/js/moment-jalaali.js"></script>
            </xpath>
        </template>
    </data>
</odoo>
```


## 'moment-jalai' Bugs
Unfortunatly we dicovered some bugs and issues in momen-jalali which should be fixed so that it can work in Odoo date-picker.
The first issue is in this 'makeDateFromStringAndArray' function. The 'fields_utils.parse' method will send a set of formats to moment, while trying to format date, as can be noted in the code snippet below one of them is actually a function, namely 'moment.ISO_8601'
```js
function parseDate(value, field, options) {
    if (!value) {
        return false;
    }
    var datePattern = time.getLangDateFormat();
    var datePatternWoZero = datePattern.replace('MM','M').replace('DD','D');
    var date;
    if (options && options.isUTC) {
        date = moment.utc(value);
    } else {
        date = moment.utc(value, [datePattern, datePatternWoZero, moment.ISO_8601]);
    }
    if (date.isValid()) {
        if (date.year() === 0) {
            date.year(moment.utc().year());
        }
        if (date.year() >= 1900) {
            date.toJSON = function () {
                return this.clone().locale('en').format('YYYY-MM-DD');
            };
            return date;
        }
    }
    throw new Error(_.str.sprintf(core._t("'%s' is not a correct date"), value));
}

```

This has not been considered in 

```js
      for (i = 0; i < len; i += 1) {
        /// Babak
        /// format can be a function!
        /// format = config._f[i]
        format = typeof config._f[i]=='function'? config._f[i]():config._f[i];
        currentScore = 0
        tempMoment = makeMoment(config._i, format, config._l, config._strict, utc)

```

We also changed code in 'makeDateFromStringAndFormat' for the same issue.

```js
    function makeDateFromStringAndFormat(config) {

        var __f = typeof config._f ==='function'?config._f():config._f;
        var tokens = __f.match(formattingTokens)
            , string = config._i + ''
            , len = tokens.length
            , i
            , token
            , parsedInput
```

Also at the end of 'makeMoment' function, the date is checked against a max value. Because Odoo date-picker uses a maxDate above this value (9999/11/30). This will result of an invalid maxDate which causes an unexpected issue. We just simply removed this:

```js
 if (m._d.getTime() > maxTimestamp) {
        //jm._isValid = false
      }
```
