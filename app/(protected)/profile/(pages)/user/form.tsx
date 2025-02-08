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

import { Gender } from '@prisma/client';
import FormSubmit from '@/components/forms/submit-button';
import { UserProfileSchema } from '@/schemas/user.schema';
import { ADMIN_ROUTES } from '@/routes/admin.routes';
import { UserType } from '@/types/lib.type';
import FormTextArea from '@/components/forms/form-textarea';
import { USER_ROUTES } from '@/routes/user.routes';

const URL = USER_ROUTES.PROFILE.USER_CHANGE.URL;
const QUERY_KEY = "";
const Schema = UserProfileSchema;

const UserForm = ({ data }: { data: UserType }) => {
    const [isLoading, setIsLoading] = useState(false)

    const queryClient = useQueryClient()
    const router = useRouter()

    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        values: {
            email: data.email,
            fName: data.role === "TRAINER" ? data.trainer.fName : data.trainee.fName,
            lName: data.role === "TRAINER" ? data.trainer.lName : data.trainee.lName,
            location: data.role === "TRAINER" ? data.trainer.location : data.trainee.location,
            gender: data.role === "TRAINER" ? data.trainer.gender : data.trainee.gender,
            bio: data.role === "TRAINER" ? data.trainer.bio : data.trainee.bio,
            contactNumber: data.role === "TRAINER" ? data.trainer.contactNumber : data.trainee.contactNumber,
            dob: data.role === "TRAINER" ? data.trainer.dob.toISOString().split('T')[0] : data.trainee.dob.toISOString().split('T')[0],
        }
    });

    async function onSubmit(values: z.infer<typeof Schema>) {
        setIsLoading(true);
        await handleAxios({ values, url: URL })
            .then(async () => {
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex gap-6 flex-col justify-start items-center">
                    <div className="w-full">
                        <FormInput
                            control={form.control}
                            name="email"
                            type='email'
                            label="Email Address"
                            placeholder='Enter email'
                            disabled={isLoading}
                            className='flex-1'
                        />
                    </div>
                    <div className="w-full">
                        <FormInput
                            control={form.control}
                            name="password"
                            label="New Password"
                            type='password'
                            placeholder='Enter password'
                            disabled={isLoading}
                            className='w-full'
                        />
                    </div>
                    <div className="w-full">
                        <FormInput
                            control={form.control}
                            name="fName"
                            label="First Name"
                            placeholder='Enter first name'
                            disabled={isLoading}
                            className='w-full'
                        />
                    </div>
                    <div className="w-full">
                        <FormInput
                            control={form.control}
                            name="lName"
                            label="Last Name"
                            placeholder='Enter surname'
                            disabled={isLoading}
                            className='w-full'
                        />
                    </div>
                    <div className="w-full">
                        <FormSelect
                            control={form.control}
                            name="gender"
                            label="Gender"
                            array={Object.keys(Gender).map((d) => ({ id: d, label: d }))}
                            disabled={isLoading}
                            className='w-full'
                            value={form.watch("gender")}
                        />
                    </div>
                    <div className="w-full">
                        <FormInput
                            control={form.control}
                            name="contactNumber"
                            label="Phone Number"
                            placeholder='Enter phone number'
                            description='Please enter an 11 digit phone number 09xxx'
                            disabled={isLoading}
                            className='w-full'
                        />
                    </div>
                    <div className="w-full">
                        <FormInput
                            control={form.control}
                            name="dob"
                            label="Date of Birth"
                            type='date'
                            placeholder='Enter date of birth'
                            disabled={isLoading}
                            className='w-full'
                        />
                    </div>
                    <div className="w-full">
                        <FormInput
                            control={form.control}
                            name="location"
                            label="City"
                            placeholder='Enter city'
                            description='Enter only the city you are residing'
                            disabled={isLoading}
                            className='w-full'
                        />
                    </div>
                    <div className="w-full">
                        <FormTextArea
                            control={form.control}
                            name="bio"
                            label="Bio"
                            placeholder='Enter the bio of the user...'
                            disabled={isLoading}
                        />
                    </div>
                    <div className="w-full flex gap-2 justify-start items-center">
                        <FormSubmit disabled={isLoading}
                            className='w-full'>
                            <span>Save Changes</span>
                        </FormSubmit>
                    </div>
                </form>
            </Form>
        </article >
    )
}

export default UserForm