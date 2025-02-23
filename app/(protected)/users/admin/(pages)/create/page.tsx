'use client'
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from '@/components/ui/form';
import { handleAxios } from '@/lib/utils';
import { FormInput } from '@/components/forms/form-input';

import FormSelect from '@/components/forms/form-select';

import { Gender, UserRole } from '@prisma/client';
import FormSubmit from '@/components/forms/submit-button';
import { toast } from '@/hooks/use-toast';
import { AdminCreateUserSchema } from '@/schemas/user.schema';
import { ADMIN_ROUTES } from '@/routes/admin.routes';
import { Button } from '@/components/ui/button';
import { useSportsOptions } from '@/hooks/trainhub/use-sports';
import FormTextArea from '@/components/forms/form-textarea';

const URL = ADMIN_ROUTES.USERS.CREATE_USER.URL
const QUERY_KEY = ADMIN_ROUTES.USERS.FETCH_ALL.KEY;
const Schema = AdminCreateUserSchema;

const AdminCreateUserPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const sports = useSportsOptions();

    const queryClient = useQueryClient()
    const router = useRouter()

    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            fName: undefined,
            lName: undefined,
            role: "USER",
            sport: undefined,
            location: undefined,
            dob: new Date().toISOString().split('T')[0],
        },
    });

    async function onSubmit(values: z.infer<typeof Schema>) {
        setIsLoading(true);
        await handleAxios({ values, url: URL })
            .then(async () => {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEY], exact: false })
                form.reset();
                router.back();
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-6">
                    <div className="w-full max-w-sm space-y-6">
                        <FormInput
                            control={form.control}
                            name="email"
                            type='email'
                            label="Email Address"
                            placeholder='Enter email'
                            disabled={isLoading}
                        />
                        <FormInput
                            control={form.control}
                            name="password"
                            label="Password"
                            type='password'
                            placeholder='Enter password'
                            disabled={isLoading}
                        />
                        <div className="grid grid-cols-2 gap-2 gap-y-6">
                            <FormInput
                                control={form.control}
                                name="fName"
                                label="First Name"
                                placeholder='Enter first name'
                                disabled={isLoading}
                            />
                            <FormInput
                                control={form.control}
                                name="lName"
                                label="Last Name"
                                placeholder='Enter surname'
                                disabled={isLoading}
                            />
                            <FormSelect
                                control={form.control}
                                name="role"
                                label="Role"
                                array={Object.keys(UserRole).map((d) => ({ id: d, label: d }))}
                                disabled={isLoading}
                                value={form.watch("role")}
                            />
                            <FormSelect
                                control={form.control}
                                name="gender"
                                label="Gender"
                                array={Object.keys(Gender).map((d) => ({ id: d, label: d }))}
                                disabled={isLoading}
                                value={form.watch("gender")}
                            />
                        </div>

                        <div className="flex gap-2 justify-start items-center">
                            <FormSubmit disabled={isLoading}>
                                <span>Create</span>
                            </FormSubmit>
                            <Button disabled={isLoading} type='button' variant={"outline"} onClick={() => router.back()}>
                                Back
                            </Button>
                        </div>
                    </div>
                    <div className="w-full space-y-6 max-w-sm">
                        <FormInput
                            control={form.control}
                            name="contactNumber"
                            label="Phone Number"
                            placeholder='Enter phone number'
                            description='Please enter an 11 digit phone number 09xxx'
                            disabled={isLoading}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <FormInput
                                control={form.control}
                                name="dob"
                                label="Date of Birth"
                                type='date'
                                placeholder='Enter date of birth'
                                disabled={isLoading}
                            />
                            <FormInput
                                control={form.control}
                                name="location"
                                label="City"
                                placeholder='Enter city'
                                description='Enter only the city you are residing'
                                disabled={isLoading}
                            />
                        </div>
                        <FormSelect
                            control={form.control}
                            name="sport"
                            label="Sport"
                            array={sports}
                            disabled={isLoading}
                            value={form.watch("sport")}
                        />
                        <FormTextArea
                            control={form.control}
                            name="bio"
                            label="Bio"
                            placeholder='Enter the bio of the user...'
                            disabled={isLoading}
                        />
                    </div>
                    {form.watch("role") === "TRAINER" && (
                        <div className="w-full space-y-6 max-w-sm">
                            <FormTextArea
                                control={form.control}
                                name="careerPath"
                                label="Career Path"
                                placeholder='Enter the career path of the trainer...'
                                disabled={isLoading}
                            />
                            <FormTextArea
                                control={form.control}
                                name="highlights"
                                label="Highlights"
                                placeholder='Enter the highlights of the trainer...'
                                disabled={isLoading}
                            />
                            <FormTextArea
                                control={form.control}
                                name="focus"
                                label="Focus"
                                placeholder='Enter the focus of the trainer...'
                                disabled={isLoading}
                            />
                            <FormInput
                                control={form.control}
                                name="commission"
                                type='number'
                                label="Commission per training"
                                placeholder='Enter commission'
                                disabled={isLoading}
                            />
                        </div>
                    )}
                </form>
            </Form>
        </article>
    )
}

export default AdminCreateUserPage