"use client"
import React from 'react'

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Row from './components/row'
import Filters from './components/filters'
import useAdminUsers from '@/hooks/admin/use-users'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { subDays } from 'date-fns'
import UiDataLoader from '@/components/ui/data-loader'
import UiPaginatedButtons from '@/components/ui/paginated-btns'

const AdminUsersPage = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = parseInt(searchParams.get("page") || "1", 10);
    const role = searchParams.get("role") || "ALL";
    const sport = searchParams.get("sport") || "ALL";
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");
    const startDate = startDateParam ? new Date(startDateParam) : subDays(new Date(), 7);
    const endDate = endDateParam ? new Date(endDateParam) : new Date();

    const data = useAdminUsers({ role, sport, startDate, endDate, page });
    return (
        <article className="size-full">
            <Filters />
            <Card>
                <CardContent className='pt-2'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[90px]">Role</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Joined Date</TableHead>
                                <TableHead>Sport</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <UiDataLoader
                                isLoading={data.isLoading || data.isFetching}
                                isError={data.isError}
                                length={data.payload?.length}
                                type='table'
                                columns={6}
                                message={{ no_items: "No users found!" }}
                            >
                                {
                                    data.payload?.map((d) => {
                                        return <Row key={d.id} data={d} />
                                    })
                                }
                            </UiDataLoader>
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <UiPaginatedButtons hasNext={page < (data?.totalPages ?? 0)} hasPrev={page > 1} />
                </CardFooter>
            </Card>
        </article>
    )
}

export default AdminUsersPage