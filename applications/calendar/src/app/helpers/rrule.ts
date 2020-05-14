import { getOccurrences } from 'proton-shared/lib/calendar/recurring';
import { getDaysInMonth } from 'proton-shared/lib/date-fns-utc';
import { toLocalDate, toUTCDate } from 'proton-shared/lib/date/timezone';
import {
    VcalDateOrDateTimeValue,
    VcalDateTimeValue,
    VcalDaysKeys,
    VcalRrulePropertyValue,
    VcalVeventComponent
} from 'proton-shared/lib/interfaces/calendar/VcalModel';
import { FREQUENCY, FREQUENCY_COUNT_MAX, FREQUENCY_INTERVALS_MAX, MAXIMUM_DATE, MAXIMUM_DATE_UTC } from '../constants';

export const getPositiveSetpos = (date: Date) => {
    const shiftedMonthDay = date.getDate() - 1;
    return Math.floor(shiftedMonthDay / 7) + 1;
};

export const getNegativeSetpos = (date: Date) => {
    const monthDay = date.getDate();
    const daysInMonth = getDaysInMonth(date);

    // return -1 if it's the last occurrence in the month
    return Math.ceil((monthDay - daysInMonth) / 7) - 1;
};

export const getIsDateTimeValue = (value: VcalDateOrDateTimeValue): value is VcalDateTimeValue => {
    return (value as VcalDateTimeValue).isUTC !== undefined;
};

export const getIsStandardByday = (byday = ''): byday is VcalDaysKeys => {
    return /^(SU|MO|TU|WE|TH|FR|SA)$/.test(byday);
};

export const getIsStandardBydayArray = (byday: (string | undefined)[]): byday is VcalDaysKeys[] => {
    return !byday.some((day) => !getIsStandardByday(day));
};

export const getDayAndSetpos = (byday?: string, bysetpos?: number) => {
    if (byday) {
        const alternativeBydayMatch = /^([-+]?\d{1})(SU|MO|TU|WE|TH|FR|SA$)/.exec(byday);
        if (alternativeBydayMatch) {
            const [, pos, day] = alternativeBydayMatch;
            return { day, setpos: +pos };
        }
    }
    return { day: byday, setpos: bysetpos };
};

export const SUPPORTED_RRULE_PROPERTIES: (keyof VcalRrulePropertyValue)[] = [
    'freq',
    'count',
    'interval',
    'until',
    'wkst',
    'bysetpos',
    'byday',
    'bymonthday',
    'bymonth',
    'byyearday'
];
export const SUPPORTED_RRULE_PROPERTIES_DAILY: (keyof VcalRrulePropertyValue)[] = [
    'freq',
    'count',
    'interval',
    'until'
];
export const SUPPORTED_RRULE_PROPERTIES_WEEKLY: (keyof VcalRrulePropertyValue)[] = [
    'freq',
    'count',
    'interval',
    'until',
    'wkst',
    'byday'
];
export const SUPPORTED_RRULE_PROPERTIES_MONTHLY: (keyof VcalRrulePropertyValue)[] = [
    'freq',
    'count',
    'interval',
    'until',
    'wkst',
    'bymonthday',
    'byday',
    'bysetpos'
];
export const SUPPORTED_RRULE_PROPERTIES_YEARLY: (keyof VcalRrulePropertyValue)[] = [
    'freq',
    'count',
    'interval',
    'until',
    'wkst',
    'bymonthday',
    'bymonth',
    'byyearday'
];
const ALLOWED_BYSETPOS = [-1, 1, 2, 3, 4];

export const getIsSupportedSetpos = (setpos: number) => {
    return ALLOWED_BYSETPOS.includes(setpos);
};

/**
 * Given an rrule property, return true if it's one of our custom rules.
 * If the event is not recurring or the rrule is not supported, return false.
 */
export const getIsRruleCustom = (rrule: Partial<VcalRrulePropertyValue>): boolean => {
    const nonEmptyFields = Object.entries(rrule)
        .filter(([, value]) => value !== undefined)
        .map(([field]) => field) as (keyof VcalRrulePropertyValue)[];
    const { freq, count, interval, until, bysetpos, byday, bymonth, bymonthday, byyearday } = rrule;
    const hasUnsupportedFields = nonEmptyFields.some((field) => !SUPPORTED_RRULE_PROPERTIES.includes(field));
    if (!freq || count === 1 || hasUnsupportedFields) {
        return false;
    }
    const isBasicCustom = (interval && interval > 1) || (count && count > 1) || !!until;
    if (freq === FREQUENCY.DAILY) {
        if (nonEmptyFields.some((field) => !SUPPORTED_RRULE_PROPERTIES_DAILY.includes(field))) {
            return false;
        }
        return isBasicCustom;
    }
    if (freq === FREQUENCY.WEEKLY) {
        if (nonEmptyFields.some((field) => !SUPPORTED_RRULE_PROPERTIES_WEEKLY.includes(field))) {
            return false;
        }
        return Array.isArray(byday) || isBasicCustom;
    }
    if (freq === FREQUENCY.MONTHLY) {
        if (nonEmptyFields.some((field) => !SUPPORTED_RRULE_PROPERTIES_MONTHLY.includes(field))) {
            return false;
        }
        if (Array.isArray(byday) || Array.isArray(bymonthday) || Array.isArray(bysetpos)) {
            return false;
        }
        const { setpos } = getDayAndSetpos(byday, bysetpos);
        return (setpos && !!byday) || isBasicCustom;
    }
    if (freq === FREQUENCY.YEARLY) {
        if (nonEmptyFields.some((field) => !SUPPORTED_RRULE_PROPERTIES_YEARLY.includes(field))) {
            return false;
        }
        if (Array.isArray(bymonthday) || Array.isArray(bymonth) || Array.isArray(byyearday)) {
            return false;
        }
        return isBasicCustom;
    }
    return false;
};

export const getIsRruleConsistent = (vevent: VcalVeventComponent) => {
    // UNTIL and DTSTART must have the same value type
    const { dtstart, rrule } = vevent;
    if (rrule?.value.until) {
        const isDtstartDateTime = getIsDateTimeValue(dtstart.value);
        const isUntilDateTime = getIsDateTimeValue(rrule.value.until);
        return !(+isDtstartDateTime ^ +isUntilDateTime);
    }
    // DTSTART must match the pattern of the recurring series
    const [first] = getOccurrences({ component: vevent, maxCount: 1 });
    if (!first) {
        return false;
    }
    if (+first.localStart !== +toUTCDate(vevent.dtstart.value)) {
        return false;
    }
    return true;
};

export const getIsRruleValid = (rruleProperty: VcalRrulePropertyValue) => {
    const rruleProperties = Object.keys(rruleProperty) as (keyof VcalRrulePropertyValue)[];
    if (rruleProperties.some((property) => !SUPPORTED_RRULE_PROPERTIES.includes(property))) {
        return false;
    }
    const { freq, interval = 1, count, until, byday, bysetpos, bymonthday, bymonth, byyearday } = rruleProperty;
    if (count) {
        if (count > FREQUENCY_COUNT_MAX) {
            return false;
        }
        if (count === 1) {
            return true;
        }
    }
    if (until) {
        if ('isUTC' in until && until.isUTC) {
            if (+toUTCDate(until) > +MAXIMUM_DATE_UTC) {
                return false;
            }
        }
        if (+toLocalDate(until) > +MAXIMUM_DATE) {
            return false;
        }
    }
    if (freq === 'DAILY') {
        if (interval > FREQUENCY_INTERVALS_MAX[freq]) {
            return false;
        }
        if (rruleProperties.some((property) => !SUPPORTED_RRULE_PROPERTIES_DAILY.includes(property))) {
            return false;
        }
        return true;
    }
    if (freq === 'WEEKLY') {
        if (interval > FREQUENCY_INTERVALS_MAX[freq]) {
            return false;
        }
        if (rruleProperties.some((property) => !SUPPORTED_RRULE_PROPERTIES_WEEKLY.includes(property))) {
            return false;
        }
        return true;
    }
    if (freq === 'MONTHLY') {
        if (interval > FREQUENCY_INTERVALS_MAX[freq]) {
            return false;
        }
        if (rruleProperties.some((property) => !SUPPORTED_RRULE_PROPERTIES_MONTHLY.includes(property))) {
            return false;
        }
        if (Array.isArray(byday) || Array.isArray(bysetpos) || Array.isArray(bymonthday)) {
            return false;
        }
        // byday and bysetpos must both be absent or both present. If they are present, bymonthday should not be present
        const { setpos, day } = getDayAndSetpos(byday, bysetpos);
        if (!!day && !!setpos) {
            return getIsStandardByday(day) && getIsSupportedSetpos(setpos) && !bymonthday;
        }
        if (+!!day ^ +!!setpos) {
            return false;
        }
        return true;
    }
    if (freq === 'YEARLY') {
        if (interval > FREQUENCY_INTERVALS_MAX[freq]) {
            return false;
        }
        if (rruleProperties.some((property) => !SUPPORTED_RRULE_PROPERTIES_YEARLY.includes(property))) {
            return false;
        }
        if (Array.isArray(bymonthday) || Array.isArray(bymonth) || Array.isArray(byyearday)) {
            return false;
        }
        return true;
    }
    return false;
};
