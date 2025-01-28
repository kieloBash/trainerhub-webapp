'use client'
import UiDateRangeFilter from '@/components/ui-filters/date-range-filter'
import UiRoleFilter from '@/components/ui-filters/role-filter'
import UiSportFilter from '@/components/ui-filters/sport-filter'
import { Button } from '@/components/ui/button'
import React from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link'
import { PlusIcon } from 'lucide-react'

const Filters = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    async function handleResetFilters() {
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
        currentParams.set("role", "ALL");
        currentParams.set("sport", "ALL");
        currentParams.set("page", "1");

        router.push(`${pathname}?${currentParams.toString()}`);
    }

    return (
        <div className="w-full justify-between items-center flex py-2">
            <div className="flex justify-start items-center gap-2">
                <UiRoleFilter />
                <UiDateRangeFilter />
                <UiSportFilter />
                <Button type='button' size={"sm"} variant={"secondary"} onClick={handleResetFilters}>
                    Reset Filters
                </Button>
            </div>
            <div className="">
                <Link href={"/users/admin/create"}>
                    <Button type='button' size={"sm"}>
                        <PlusIcon />
                        <span>Add User</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Filters