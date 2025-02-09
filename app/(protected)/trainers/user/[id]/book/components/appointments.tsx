"use client";
import React, { useState } from "react";
import { format, subDays, addDays, parse, addHours, isBefore, isAfter, startOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, handleAxios } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea"

interface IProps {
    startTime: string; // e.g., "14:30"
    endTime: string;   // e.g., "20:30"
}

const generateTimeSlots = (startTime: string, endTime: string) => {
    const slots: string[] = [];
    let current = parse(startTime, "HH:mm", new Date());
    const end = parse(endTime, "HH:mm", new Date());

    while (isBefore(current, end)) {
        slots.push(format(current, "h:mm a")); // Convert to 12-hour format
        current = addHours(current, 1);
    }

    return slots;
};

const AppointmentsSection = ({ startTime, endTime }: IProps) => {
    const [startDate, setStartDate] = useState(new Date());

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
    const [notes, setNotes] = useState("")

    const handlePrev = () => setStartDate((prev) => subDays(prev, 6));
    const handleNext = () => setStartDate((prev) => addDays(prev, 6));

    const days = Array.from({ length: 6 }, (_, index) => subDays(startDate, 3 - index));
    const availableTimes = generateTimeSlots(startTime, endTime);

    const handleSubmitBooking = async () => {
        await handleAxios({ values: { selectedDate, selectedTime, notes }, url: "" })
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col justify-start items-center gap-3 bg-primary/40 py-2 pb-4">
                <h2 className="text-left px-2 font-bold text-primary text-2xl">
                    {format(startDate, "MMMM")}
                </h2>
                <div className="w-full gap-1 flex justify-between items-center px-2">
                    <Button size="icon" type="button" variant="outline" onClick={handlePrev}>
                        <ChevronLeft />
                    </Button>
                    <div className="flex-1 flex justify-center items-center gap-2">
                        {days.map((day, index) => {
                            const disabled = isAfter(startOfDay(new Date()), day);
                            const className = cn("w-12 h-20 rounded-full p-1 flex flex-col justify-center items-center gap-0",
                                format(day, "mm-dd-yyyy") === format(selectedDate, "mm-dd-yyyy") ? "bg-primary text-white" : "bg-primary-foreground",
                                disabled && "bg-muted text-muted-foreground"
                            )
                            return (
                                <button
                                    disabled={disabled}
                                    type="button"
                                    onClick={() => setSelectedDate(day)}
                                    key={index}
                                    className={className}
                                >
                                    <h1 className="text-xl font-semibold">{format(day, "d")}</h1>
                                    <h2 className="text-xs">{format(day, "EEE").toUpperCase()}</h2>
                                </button>
                            )
                        })}
                    </div>
                    <Button size="icon" type="button" variant="outline" onClick={handleNext}>
                        <ChevronRight />
                    </Button>
                </div>
            </div>

            <div className="px-4">
                <div className="flex flex-col w-full gap-0 text-sm">
                    <h4 className="text-left w-full text-primary font-bold">Available Time</h4>
                    <ul className="w-full mt-2 grid grid-cols-5 gap-2">
                        {availableTimes.map((time, index) => {
                            const parsedTime = parse(time, "h:mm a", selectedDate);
                            const isDisabled = isBefore(parsedTime, new Date());
                            const className = cn("text-center py-1 px-1 w-full text-xs rounded-full text-primary-foreground",
                                time === selectedTime ? "bg-primary" : "bg-primary/60",
                                isDisabled && "bg-muted text-muted-foreground",
                            )
                            return (
                                <li key={index} className="w-full">
                                    <button
                                        disabled={isDisabled}
                                        onClick={() => setSelectedTime(time)}
                                        className={className}
                                        type="button">
                                        {time}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

            <div className="flex w-full px-4 min-h-32">
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="text-sm" placeholder="Any specific requests regarding your booking or any medical conditions you would like to share to the trainer?" />
            </div>

            <div className="w-full px-4">
                <Button
                    onClick={handleSubmitBooking}
                    disabled={
                        !selectedDate || !selectedTime
                    }
                    className="w-full"
                    type="button"
                    size={"lg"}
                >
                    Confirm Booking
                </Button>
            </div>
        </div>
    );
};

export default AppointmentsSection;
