import { cn } from '@/lib/utils'
import { TrainerLevel } from '@prisma/client'
import React from 'react'

const UiTrainerLevelDisplay = ({ level = "AMATEUR" }: { level?: TrainerLevel | null }) => {
    return (
        <span className={cn("text-xs px-2 py-1 border rounded-full font-medium",
            level == "AMATEUR" && "bg-blue-500 text-white",
            level == "INTERMEDIATE" && "bg-violet-500 text-white",
            level == "PROFESSIONAL" && "bg-green-500 text-white",
        )}>{level}</span>
    )
}

export default UiTrainerLevelDisplay