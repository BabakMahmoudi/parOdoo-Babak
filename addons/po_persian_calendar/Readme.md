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

`
<odoo>
    <data>
        <template id="persian_calendar" inherit_id="web.assets_common">
            <xpath expr="//script[@src='/web/static/lib/moment/moment.js']" position="after">
            	<script type="text/javascript" src="/po_persian_calendar/static/src/js/moment-jalaali.js"></script>
            </xpath>
        </template>
    </data>
</odoo>
`




