'use client'
import UiTimeSchedules from '@/components/ui-project/time-schedules-form'
import React, { useEffect, useState } from 'react'

const AvailableTimeOptions = ({ form, name }: { form: any, name: string }) => {
    const [availableTime, setAvailableTime] = useState<{ startTime: string }[]>([])

    useEffect(() => {
        form.setValue(name, availableTime.map((d) => d.startTime))
    }, [availableTime])


    return (
        <div className="grid gap-1 w-full">
            <UiTimeSchedules schedules={availableTime} handleUpdate={(d) => setAvailableTime(d)} />
        </div>
    )
}

export default AvailableTimeOptions