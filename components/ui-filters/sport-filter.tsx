'use client'
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DumbbellIcon } from 'lucide-react';


interface IProps {
    searchName?: string
    className?: string
}

const UiSportFilter = ({ className, searchName = "sport" }: IProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const sport = searchParams.get(searchName) || "ALL";

    const onChange = (val: string) => {
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
        currentParams.set(searchName, val);
        currentParams.set("page", "1");

        router.push(`${pathname}?${currentParams.toString()}`);
    }

    return (
        <Select value={sport} onValueChange={onChange}>
            <SelectTrigger className="w-[120px]">
                <div className="flex gap-2 justify-start items-center">
                    <DumbbellIcon className='size-4 text-muted-foreground' />
                    <SelectValue placeholder="Select a sport" />
                </div>
            </SelectTrigger>
            <SelectContent className={className}>
                <SelectGroup>
                    <SelectLabel>Sport</SelectLabel>
                    <SelectItem value="ALL">All</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default UiSportFilter
