'use client'
import React from 'react'

import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { UserType } from '@/types/lib.type'
import { formatDate } from 'date-fns'
import { FORMAT, handleAxios } from '@/lib/utils'
import { DeleteModal } from '@/components/ui/delete-dialog'
import { ADMIN_ROUTES } from '@/routes/admin.routes'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

type IProps = { data: UserType }

const Row = ({ data }: IProps) => {
    const queryClient = useQueryClient();
    async function handleDelete() {
        await handleAxios({ values: { id: data.id }, url: ADMIN_ROUTES.USERS.DELETE_USER.URL })
            .then((res) => {
                queryClient.invalidateQueries({ queryKey: [ADMIN_ROUTES.USERS.FETCH_ALL.KEY], exact: false })
            })
    }

    return (
        <TableRow>
            <TableCell>{data.role}</TableCell>
            <TableCell className="font-medium">{data.name}</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{formatDate(data.createdAt, FORMAT)}</TableCell>
            <TableCell>
                {/* {data.role === "TRAINER" ? "" : data.trainee.sports.map((d: any) => d.sport.name).join(", ")} */}
            </TableCell>
            <TableCell className="flex flex-row justify-end items-center gap-2">
                <Link href={`/users/admin/edit/${data.id}`}>
                    <Button type='button' size={"sm"}>View Details</Button>
                </Link>
                <DeleteModal onSuccess={handleDelete} value={`user, ${data.email}`} />
            </TableCell>
        </TableRow>
    )
}

export default Row