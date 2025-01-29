import React from "react";
import { format, subDays } from "date-fns";

const AppointmentsSection = () => {
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, index) =>
        subDays(today, 3 - index)
    );

    return (
        <div className="w-full px-4 bg-primary/60 py-4">
            <div className="w-full flex justify-center items-center gap-2">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`w-16 h-20 rounded-full p-1 flex flex-col justify-center items-center gap-0 ${format(day, "dd") === format(today, "dd") ? "bg-primary text-white" : "bg-primary-foreground"
                            }`}
                    >
                        <h1 className="text-2xl font-semibold">{format(day, "d")}</h1>
                        <h2 className="text-xs">{format(day, "EEE").toUpperCase()}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppointmentsSection;
