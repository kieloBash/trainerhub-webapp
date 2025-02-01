'use client'
import { Button } from '@/components/ui/button'
import { DayOfWeek } from '@prisma/client'
import React, { useEffect, useState } from 'react'

const AvailableDaysOptions = ({ form, name }: { form: any, name: string }) => {
    const [availableDays, setAvailableDays] = useState<string[]>(form.getValues(name))

    useEffect(() => {
        form.setValue(name, availableDays)
    }, [availableDays])


    return (
        <div className="grid gap-1 w-full">
            <label htmlFor="availableDays" className="text-sm font-medium">Work Days</label>
            <p className='text-sm text-muted-foreground mb-1'>Please add at least 1 work day.</p>
            <div className="flex flex-wrap gap-2 text-xs">
                {Object.keys(DayOfWeek).map((d) => {
                    const active = availableDays.includes(d);
                    return (
                        <Button type='button' variant={active ? "default" : "secondary"} size={"sm"} key={d} onClick={() => {
                            if (active) {
                                setAvailableDays(prev => prev.filter(p => p !== d))
                            } else {
                                setAvailableDays(prev => [...prev, d])
                            }
                        }}>{d}</Button>
                    )
                })}
            </div>
        </div>
    )
}

export default AvailableDaysOptions