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
import { User2Icon } from 'lucide-react';


interface IProps {
    searchName?: string
    className?: string
}

const UiRoleFilter = ({ className, searchName = "role" }: IProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const role = searchParams.get(searchName) || "ALL";

    const onChange = (val: string) => {
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
        currentParams.set(searchName, val);
        currentParams.set("page", "1");

        router.push(`${pathname}?${currentParams.toString()}`);
    }

    return (
        <Select value={role} onValueChange={onChange}>
            <SelectTrigger className="w-[120px]">
                <div className="flex gap-2 justify-start items-center">
                    <User2Icon className='size-4 text-muted-foreground' />
                    <SelectValue placeholder="Select a role" />
                </div>
            </SelectTrigger>
            <SelectContent className={className}>
                <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="ALL">All</SelectItem>
                    <SelectItem value="USER">Trainee</SelectItem>
                    <SelectItem value="TRAINER">Trainer</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default UiRoleFilter
