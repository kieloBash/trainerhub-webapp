'use client'
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from '@/components/ui/form';
import { handleAxios } from '@/lib/utils';
import { FormInput } from '@/components/forms/form-input';

import FormSelect from '@/components/forms/form-select';

import FormSubmit from '@/components/forms/submit-button';
import { toast } from '@/hooks/use-toast';
import { AdminEditUserSchema, TrainerOnboardingSchema } from '@/schemas/user.schema';
import { ADMIN_ROUTES } from '@/routes/admin.routes';
import { UserType } from '@/types/lib.type';
import { useSportsOptions } from '@/hooks/trainhub/use-sports';
import AvailableDaysOptions from './components/days-form';
import { AUTH_ROUTES } from '@/routes/auth.routes';
import SpecializationOptions from './components/specialization-form';

const URL = AUTH_ROUTES.ONBOARDING.URL;
const QUERY_KEY = ADMIN_ROUTES.USERS.FETCH_ALL.KEY;
const Schema = TrainerOnboardingSchema;

const OnboardingForm = ({ data }: { data: UserType }) => {
    const [isLoading, setIsLoading] = useState(false)
    const sports = useSportsOptions();

    const queryClient = useQueryClient()
    const router = useRouter()

    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            workDays: [],
            yearsOfExperience: 0,
            specializations: [],
            level: "AMATEUR",
        }
    });

    async function onSubmit(values: z.infer<typeof Schema>) {
        // console.log(values);
        setIsLoading(true);
        await handleAxios({ values, url: URL })
            .then(async () => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error.request.response);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <article className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-center items-center flex-col w-full h-full gap-6">
                    <AvailableDaysOptions
                        form={form}
                        name={"workDays"}
                    />
                    <div className="grid gap-2">
                        <label htmlFor="schedule" className="text-sm font-medium">Time Schedule</label>
                        <p className='text-sm text-muted-foreground'>Please add at your work hours on each work day</p>
                        <div className="flex justify-between items-center gap-4">
                            <FormInput
                                control={form.control}
                                name="startTime"
                                label="Start Time"
                                type='time'
                                disabled={isLoading}
                            />
                            <span className="text-2xl font-bold">-</span>
                            <FormInput
                                control={form.control}
                                name="endTime"
                                label="End Time"
                                type='time'
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <FormInput
                            control={form.control}
                            name="yearsOfExperience"
                            label="Years of Experience"
                            type='number'
                            disabled={isLoading}
                        />
                    </div>
                    <div className="w-full">
                        <FormSelect
                            control={form.control}
                            name="level"
                            value={form.watch("level")}
                            label="Trainer Level"
                            array={["AMATEUR", "INTERMEDIATE", "PROFESSIONAL"].map((d) => ({ id: d, label: d }))}
                            disabled={isLoading}
                            description='500php (Amateur) | 1000php (Intermediate) | 1500php (Professional)'
                        />
                    </div>
                    <SpecializationOptions form={form} name='specializations' />
                    <div className="w-full">
                        <FormSubmit className='w-full' disabled={isLoading}>
                            <span>Submit</span>
                        </FormSubmit>
                    </div>
                </form>
            </Form>
        </article>
    )
}

export default OnboardingForm