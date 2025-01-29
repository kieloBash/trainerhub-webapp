'use client'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Gender, UserRole } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { handleRegisterAccount } from '../../../_actions/register';
import Link from 'next/link';
import { FormInput } from '@/components/forms/form-input';
import { APP_EMAIL, APP_NAME, cn } from '@/lib/utils';
import { Form } from '@/components/ui/form';
import LoadingIcon from '@/components/ui/loading-icon';
import { useRouter, useSearchParams } from 'next/navigation';

import emailjs from "emailjs-com";
import { DumbbellIcon, User2Icon } from 'lucide-react';
import { RegisterUserSchema } from '@/schemas/user.schema';
import FormSelect from '@/components/forms/form-select';
import { useSportsOptions } from '@/hooks/trainhub/use-sports';

const domain = process.env.NEXT_PUBLIC_APP_URL;
const template_id = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const service_id = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const public_key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

const Schema = RegisterUserSchema;

const RegisterForm = () => {
    const sports = useSportsOptions();

    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            fName: "",
            lName: "",
            location: "",
            contactNumber: "",
            dob: new Date().toISOString().split('T')[0],
            email: "",
            password: "",
            confirmPassword: "",
            role: UserRole.USER,
            sport: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof Schema>) => {
        console.log(values)
        toast({
            title: "Please wait",
            description: "Please wait while we process your request!",
        });
        setIsLoading(true)
        const res = await handleRegisterAccount(values)
        if (res.success) {
            const confirmLink = `${domain}/auth/new-verification?token=${res.token}`;
            const templateParams = {
                app_name: APP_NAME,
                app_email: APP_EMAIL,
                to_email: values.email,
                to_name: values.fName,
                link: confirmLink
            }

            await emailjs.send(service_id, template_id, templateParams, public_key)
                .then(() => {
                    toast({
                        title: "Success!",
                        description: res.success,
                    });
                    form.reset();
                    router.push("/auth/sign-in");
                    // setOpenModal(true);
                })
                .catch((error) => {
                    console.error("Failed to send email:", error);
                    throw new Error("Could not send verification email.");
                })

        } else {
            toast({
                title: "An error occured!",
                variant: "destructive",
                description: res.error,
            });
        }
        setIsLoading(false)
    };

    async function onChangeRole(role: any) {
        form.setValue("role", role);
    }


    return (
        <Form {...form}>
            <form className={cn("flex flex-col gap-4")} onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Join Us!</h1>
                        <p className="text-balance text-sm text-muted-foreground">
                            Enter your email below to register your account
                        </p>
                    </div>
                    <div className="w-full grid grid-cols-2 gap-2">
                        <Button type='button' onClick={() => onChangeRole("USER")} disabled={isLoading} variant={form.watch("role") === "USER" ? "default" : "outline"} size={"sm"}>
                            <User2Icon />
                            <span>Trainee</span>
                        </Button>
                        <Button type='button' onClick={() => onChangeRole("TRAINER")} disabled={isLoading} variant={form.watch("role") === "TRAINER" ? "default" : "outline"} size={"sm"}>
                            <DumbbellIcon />
                            <span>Trainer</span>
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>
                    <FormInput
                        control={form.control}
                        name="email"
                        label={"Email Address"}
                        type="email"
                        required={true}
                        disabled={isLoading}
                        placeholder="Email Address"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormSelect
                            control={form.control}
                            name="gender"
                            label="Gender"
                            array={Object.keys(Gender).map((d) => ({ id: d, label: d }))}
                            disabled={isLoading}
                            value={form.watch("gender")}
                        />
                        <FormInput
                            control={form.control}
                            name="contactNumber"
                            label="Phone Number"
                            placeholder='09xxxxxxxxx'
                            disabled={isLoading}
                        />
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
                    <FormInput
                        control={form.control}
                        name="password"
                        label="Password"
                        type="password"
                        required={true}
                        disabled={isLoading}
                        placeholder="Password"
                    />
                    <FormInput
                        control={form.control}
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        required={true}
                        disabled={isLoading}
                        placeholder="Password"
                    />
                    <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                        <span className="">Register</span>
                        {isLoading && <LoadingIcon />}
                    </Button>
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href={"/auth/sign-in"} className="underline underline-offset-4">
                            Sign in
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default RegisterForm