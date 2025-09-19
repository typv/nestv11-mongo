import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import minMax from 'dayjs/plugin/minMax';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import ms, { StringValue } from 'ms';
import { APP_DEFAULTS } from 'src/common/constants';

// dayjs plugin for advanced functions
dayjs.extend(utc);
dayjs.extend(minMax);
dayjs.extend(isoWeek);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

export interface TimeRangeHour {
  start: string;
  end: string;
}

/**
 * Normalize TTL for JWT and Redis
 */
export function getTtlValue(rawTtl: string | number): number {
  if (typeof rawTtl === 'string') {
    return Math.floor(ms(rawTtl as StringValue) / 1000);
  }

  return rawTtl;
}

export function doTimesOverlap(
  firstStart: Date | string,
  firstEnd: Date | string,
  secondStart: Date | string,
  secondEnd: Date | string,
): boolean {
  const firstStartTime = dayjs(firstStart);
  const firstEndTime = dayjs(firstEnd);
  const secondStartTime = dayjs(secondStart);
  const secondEndTime = dayjs(secondEnd);

  return firstStartTime.isBefore(secondEndTime) && secondStartTime.isBefore(firstEndTime);
}

/**
 * Format date to DDMMYY string for creating booking id
 * @returns Formatted date string (e.g., "060725")
 * @param dateInput
 */
export function formatDateToDdMMyy(dateInput: Date | string): string {
  return dayjs(dateInput).format('DDMMYY');
}

/**
 * Get the start and end date based on the current date and mode.
 *
 * Modes supported:
 * - 'Day': Returns start and end of today.
 * - 'Week': Returns start and end of the current ISO week (Monday to Sunday).
 * - 'Month': Returns start and end of the current month.
 */
export function getDateRangeForCurrentPeriod(mode: 'Day' | 'Week' | 'Month'): {
  startDate: Date;
  endDate: Date;
} {
  const now = dayjs().utc();

  let startDate: dayjs.Dayjs;
  let endDate: dayjs.Dayjs;

  switch (mode) {
    case 'Day':
      startDate = now.startOf('day');
      endDate = now.endOf('day');
      break;
    case 'Week':
      startDate = now.startOf('isoWeek');
      endDate = now.endOf('isoWeek');
      break;
    case 'Month':
      startDate = now.startOf('month');
      endDate = now.endOf('month');
      break;
  }

  return {
    startDate: startDate.toDate(),
    endDate: endDate.toDate(),
  };
}

/**
 * Get the difference from now to a future time in a specific unit
 * @param futureDate Date or string representing future date
 * @param unit Unit to return ('minute' | 'hour' | 'day' etc.)
 * @returns Number of units (e.g., hours or minutes)
 */
export function getTimeDiffFromNow(
  futureDate: Date | string,
  unit: dayjs.OpUnitType = 'hour',
): number {
  const now = dayjs();
  const future = dayjs(futureDate);

  return Math.abs(future.diff(now, unit));
}

/**
 * Format date to Weekday, Month Day, Year string
 * @returns Formatted date string (e.g., "Monday, May 13, 2025")
 * @param dateInput
 */
export function formatDateToLongDate(dateInput: Date | string): string {
  return dayjs(dateInput).format('dddd, MMMM D, YYYY');
}

/**
 * Format utc date to local time string
 * @returns Formatted date string (e.g., "7:00 AM")
 * @param utcDateTime
 * @param targetTimezone
 */
export function formatDateTimeToLocalTime(
  utcDateTime: Date | string,
  targetTimezone = 'Asia/Ho_Chi_Minh',
): string {
  return dayjs.utc(utcDateTime).tz(targetTimezone).format('h:mm A');
}

/**
 * Check if a time range overlaps with another time range
 * @param start1 - Start time of first range
 * @param end1 - End time of first range
 * @param start2 - Start time of second range
 * @param end2 - End time of second range
 * @returns True if ranges overlap
 */
export function isTimeRangeOverlap(
  start1: Date | string,
  end1: Date | string,
  start2: Date | string,
  end2: Date | string,
): boolean {
  const start1Time = dayjs(start1);
  const end1Time = dayjs(end1);
  const start2Time = dayjs(start2);
  const end2Time = dayjs(end2);

  return start1Time.isBefore(end2Time) && start2Time.isBefore(end1Time);
}

export function addDays(date: Dayjs | Date | String, days: number): Dayjs {
  let dayjsDate: Dayjs;
  if (date instanceof Date || typeof date === 'string') {
    dayjsDate = dayjs(date);
  } else {
    dayjsDate = date as Dayjs;
  }

  return dayjsDate.add(days, 'day');
}

export function isValidFormat(input: number | string, format: string): boolean {
  const yearDayjs = dayjs(input, format, true);

  return yearDayjs.isValid();
}

export function getDayOfWeek(date: Date): number {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
}

export function getWeekStartDate(date: Date) {
  const diff = getDayOfWeek(date);
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - diff);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

/**
 * Determines if a list of time-of-day options represents a full 24-hour period.
 *
 * This function checks for a full day in two ways:
 * 1. If the `TimeOfDay.AllDay` option is explicitly included.
 * 2. If the combination of all four distinct time periods (`Overnight`, `Morning`, `Afternoon`, `Night`) is selected.
 *
 * @param {TimeOfDay[]} timesOfDay - An array of TimeOfDay enum values to check.
 * @returns {boolean} True if the selected options cover a full day, otherwise false.
 */

export function setTime(dayjsObject: Dayjs, timeString: string): Dayjs {
  const [hour, minute] = timeString.split(':').map(Number);
  return dayjsObject.hour(hour).minute(minute);
}

export interface LocalDateToUtc {
  localDate: Dayjs;
  utcStart: Dayjs;
  utcEnd: Dayjs;
  originalTimezone: string;
  localDayOfWeek: number;
  utcDaysOfWeek: number[];
}

export function mapLocalDateToUtc(
  localDate: Date | string | Dayjs,
  originalTimezone: string = APP_DEFAULTS.UTC_TZ,
): LocalDateToUtc {
  const localDateDayjs = dayjs(localDate).tz(originalTimezone, true);

  const utcStart = dayjs(localDate).tz(originalTimezone, true).startOf('day').utc();
  const utcEnd = dayjs(localDate).tz(originalTimezone, true).endOf('day').utc();

  const utcDaysOfWeek: number[] = [];
  if (utcStart.isSame(utcEnd, 'day')) {
    utcDaysOfWeek.push(utcStart.day());
  } else {
    utcDaysOfWeek.push(utcStart.day());
    utcDaysOfWeek.push(utcEnd.day());
  }

  return {
    localDate: localDateDayjs,
    utcStart,
    utcEnd,
    originalTimezone,
    localDayOfWeek: localDateDayjs.day(),
    utcDaysOfWeek,
  };
}

export function minuteToMs(minutes: number) {
  return minutes * 60 * 1000;
}
