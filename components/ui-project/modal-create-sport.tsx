"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from "lucide-react"

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from '@/components/ui/form';
import { handleAxios } from '@/lib/utils';
import { FormInput } from '@/components/forms/form-input';
import { ADMIN_ROUTES } from "@/routes/admin.routes"
import { AdminCreateSportSchema } from "@/schemas/sport.schema"
import FormSubmit from "../forms/submit-button"

const URL = ADMIN_ROUTES.SPORTS.CREATE_SPORT.URL
const QUERY_KEY = ADMIN_ROUTES.SPORTS.FETCH_ALL.KEY;
const Schema = AdminCreateSportSchema;

export default function CreateSportModal() {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const queryClient = useQueryClient()
    const router = useRouter()

    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            name: ""
        },
    });

    async function onSubmit(values: z.infer<typeof Schema>) {
        setIsLoading(true);
        await handleAxios({ values, url: URL })
            .then(async () => {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY], exact: false })
                form.reset();
                setIsOpen(false);
            })
            .catch((error) => {
                console.log(error.request.response);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button type='button' size={"sm"}>
                    <PlusIcon />
                    <span>Add Sport</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Sport</DialogTitle>
                    <DialogDescription>
                        Add a new sport category into the system.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <FormInput
                            control={form.control}
                            name="name"
                            label="Name of the sport"
                            placeholder='Enter name'
                            disabled={isLoading}
                        />
                        <FormSubmit disabled={isLoading}>
                            <span>Submit</span>
                        </FormSubmit>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
