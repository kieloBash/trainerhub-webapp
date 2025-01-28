'use client'
import React from 'react'

import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { UserType } from '@/types/lib.type'
import { formatDate } from 'date-fns'
import { FORMAT } from '@/lib/utils'

type IProps = { data: UserType }

const Row = ({ data }: IProps) => {
    return (
        <TableRow>
            <TableCell>{data.role}</TableCell>
            <TableCell className="font-medium">{data.name}</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{formatDate(data.createdAt, FORMAT)}</TableCell>
            <TableCell>{data?.sportId}</TableCell>
            <TableCell className="flex flex-row justify-end items-center">
                <Button type='button' size={"sm"}>View Details</Button>
            </TableCell>
        </TableRow>
    )
}

export default Row