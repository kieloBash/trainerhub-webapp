'use client'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from '@/schemas/auth.schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { handleRegisterAccount } from '../../../_actions/register';
import Link from 'next/link';
import { FormInput } from '@/components/forms/form-input';
import { APP_EMAIL, APP_NAME, cn } from '@/lib/utils';
import { Form } from '@/components/ui/form';
import LoadingIcon from '@/components/ui/loading-icon';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

import emailjs from "emailjs-com";
import { AlertModal } from './modal';

const domain = process.env.NEXT_PUBLIC_APP_URL;
const template_id = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const service_id = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const public_key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

const RegisterForm = () => {

    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: UserRole.USER
        },
    });

    function handleSocialSignIn(provider: "google" | "github") {
        signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
    }

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
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
                to_name: values.fullName,
                link: confirmLink
            }

            await emailjs.send(service_id, template_id, templateParams, public_key)
                .then(() => {
                    toast({
                        title: "Success!",
                        description: res.success,
                    });
                    form.reset();
                    setOpenModal(true);
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


    return (
        <Form {...form}>
            <form className={cn("flex flex-col gap-6")} onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">Join Us!</h1>
                        <p className="text-balance text-sm text-muted-foreground">
                            Enter your email below to register your account
                        </p>
                    </div>
                    <FormInput
                        control={form.control}
                        name="fullName"
                        label={"Full Name"}
                        type="text"
                        required={true}
                        disabled={isLoading}
                        placeholder="Full Name"
                    />
                    <FormInput
                        control={form.control}
                        name="email"
                        label={"Email Address"}
                        type="email"
                        required={true}
                        disabled={isLoading}
                        placeholder="Email Address"
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