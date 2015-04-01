package time;

import java.security.InvalidParameterException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeImpl implements TimeNow {
    private int year;
    private int month;
    private int day;
    private int hours;
    private int minutes;
    private int seconds;

    public TimeImpl(int year, int month, int day, int hours, int minutes, int seconds) {
        this.setYear(year);
        this.setMonth(month);
        this.setDay(day);
        this.setHours(hours);
        this.setMinutes(minutes);
        this.setSeconds(seconds);
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        if (month <= 0 || month > 12) {
            throw new InvalidParameterException("Month must be a number between 1 - 12.");
        }

        this.month = month;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        if (day <= 0 || day > 31) {
            throw new InvalidParameterException("Day must be a number between 1 - 31.");
        }

        this.day = day;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        if (hours < 0 || hours > 24) {
            throw new InvalidParameterException("Hours must be a number between 0 - 24.");
        }

        this.hours = hours;
    }

    public int getMinutes() {
        return minutes;
    }

    public void setMinutes(int minutes) {
        if (minutes < 0 || minutes > 60) {
            throw new InvalidParameterException("Minutes must be a number between 0 - 60.");
        }

        this.minutes = minutes;
    }

    public int getSeconds() {
        return seconds;
    }

    public void setSeconds(int seconds) {
        if (seconds < 0 || seconds > 60) {
            throw new InvalidParameterException("Seconds must be a number between 0 - 60.");
        }

        this.seconds = seconds;
    }

    public String now() {
        return (new SimpleDateFormat("hh:mm:ss dd.MM.YY").format(new Date()));
    }

    @Override
    public String toString() {
        return String.format("%d:%d:%d %d.%d.%d", this.getHours(), this.getMinutes(), this.getSeconds(), this.getDay(),
                this.getMonth(), this.getYear());
    }
}
