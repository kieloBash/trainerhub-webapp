'use client'
import React, { useState } from 'react'
import { XIcon } from 'lucide-react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface IProps {
    schedules: { startTime: string }[];
    handleUpdate: (e: { startTime: string }[]) => void;
}
const UiTimeSchedules = ({ schedules, handleUpdate }: IProps) => {
    const [startTime, setStartTime] = useState<string>('')

    const addSchedule = () => { 
        if (startTime) {
            const prev = [...schedules]
            if (prev.some(schedule => schedule.startTime === startTime)) {
                return;
            }
            const updatedSchedules = [...prev, { startTime }].sort((a, b) => a.startTime.localeCompare(b.startTime))
            handleUpdate(updatedSchedules)
            setStartTime('')
        }
    }

    const removeSchedule = (index: number) => {
        const prev = [...schedules]
        const updatedSchedules = prev.filter((_, i) => i !== index)
        handleUpdate(updatedSchedules)
    }

    return (
        <div className="grid gap-1 w-full">
            <label htmlFor="schedule" className="text-sm font-medium">Time Schedule</label>
            <p className='text-sm text-muted-foreground'>Please add at least 1 available time you are available for patients to book</p>
            <div className="flex gap-2 justify-between items-center">
                <Input
                    type='time'
                    className='w-full'
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <Button type='button' onClick={addSchedule}>Add</Button>
            </div>
            <ul className="mt-2 flex flex-wrap justify-start items-start gap-2 p-4 min-h-24 border border-input rounded-lg">
                {schedules.length === 0 ? <div className='w-full text-sm'>
                    <p className="text-left text-muted-foreground">Please add at least 1 available time</p>
                </div> : <>
                    {schedules.map((sched, idx) => (
                        <li
                            className="flex justify-center items-center gap-1 px-2 py-1 rounded-full border border-primary text-sm text-primary"
                            key={`${idx}-schedule`}
                        >
                            <span>{sched.startTime}</span>
                            <button
                                onClick={() => removeSchedule(idx)}
                                type='button'
                                className="size-4"
                            >
                                <XIcon className='size-full' />
                            </button>
                        </li>
                    ))}
                </>}
            </ul>
        </div>
    )
}

export default UiTimeSchedules
