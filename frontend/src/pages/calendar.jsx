import React, { useState, useEffect } from 'react';
import './styles.css';
import './calendarStyles.css';
import moment from 'moment';

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState(moment());

    const [calendar, setCalendar] = useState([]);
    const [value, setValue] = useState(moment());

    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");

    useEffect(() => {
        const day = startDay.clone().subtract(1, "day");
        const a = [];
        while(day.isBefore(endDay, "day")) {
            a.push(
                Array(7)
                .fill(0)
                .map(() => day.add(1, "day").clone())
            )
        }
        setCalendar(a);
    }, [value])

    function isSelected(day) {
        return value.isSame(day, "day")
    }

// function to check whether a student is present or not

    // function isPresent(day) {
    //     return schema[day].isPresent;
    // }

    function beforeYearStart() {
        return  value.month() !=3 ;
    }

    function afterYearEnd() {
        return value.month() != 2 ;
    }

    function beforeToday(day) {
        return day.isBefore(new Date(), "day");
    }

    function isToday(day) {
        return day.isSame(new Date(), "day");
    }

    function dayStyles(day) {
        if (beforeToday(day))   return "before";
        if (isSelected(day))    return "selected";
        if(isToday(day))    return "today";
        return "";
    }

    function currentMonthName() {
        return value.format("MMMM");
    }

    function currentYear() {
        return value.format("YYYY");
    }

    function prevMonth() {
        return value.clone().subtract(1, "month");
    }

    function nextMonth() {
        return value.clone().add(1, "month");
    }

    return (

            <div className="calendar">

                <div>{beforeYearStart()}</div>

                <div className="header">
                    <div className="previous" onClick={() => beforeYearStart() && setValue(prevMonth())} style={{ cursor: 'pointer' }}>{ beforeYearStart() ? String.fromCharCode(171) : null}</div>
                    <div className="current"> { currentMonthName() } { currentYear() } </div>
                    <div className="next" onClick={() => afterYearEnd() && setValue(nextMonth())} style={{ cursor: 'pointer' }}>{ afterYearEnd() ? String.fromCharCode(187) : null }</div>
                </div>
                <div className="body">
                    <div className="day-names">
                        {
                            ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => 
                                <div className="week">{d}</div>
                                )
                        }
                    </div>
                    {
                        calendar.map(week => <div>
                            { 
                                week.map(day => <div className="day" onClick={() => setValue(day)}>
                                    <div className={ dayStyles(day) } style={{ cursor: 'pointer' }}>
                                        {day.format("D")}
                                    </div>
                                </div>)
                            }
                        </div>)
                    }
                </div>
            </div>
        );
}