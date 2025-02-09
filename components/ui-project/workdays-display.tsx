import React from 'react';

interface IProps {
    workDays: string[];
    startTime?: string | null;
    endTime?: string | null;
}

const dayShortcuts: { [key: string]: string } = {
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
    Sunday: 'Sun',
};

const UiWorkDaysDisplay = ({ workDays, startTime, endTime }: IProps) => {
    const shortDays = workDays.map(day => dayShortcuts[day] || day).join(", ");

    return (
        <div className="px-2 py-1 bg-primary text-primary-foreground text-sm rounded-full">
            <span>{shortDays} | {startTime}-{endTime}</span>
        </div>
    );
}

export default UiWorkDaysDisplay;
