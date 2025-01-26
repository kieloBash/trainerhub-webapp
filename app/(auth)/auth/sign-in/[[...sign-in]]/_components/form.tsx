'use client'
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from '@/schemas/auth.schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { toast } from '@/hooks/use-toast';
import { handleLoginAccount } from '../../../_actions/login';
import { signIn } from 'next-auth/react';
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { APP_EMAIL, APP_NAME, cn } from '@/lib/utils';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/forms/form-input';
import Link from 'next/link';
import LoadingIcon from '@/components/ui/loading-icon';

import emailjs from "emailjs-com";

const domain = process.env.NEXT_PUBLIC_APP_URL;
const template_id = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const service_id = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const public_key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

const LoginForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function handleSocialSignIn(provider: "google" | "github") {
        signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
    }

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        toast({
            title: "Please wait",
            description: "Please wait while we process your request!",
        });
        setIsLoading(true)
        const res = await handleLoginAccount(values)
        if (res.success) {
            await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirectTo: DEFAULT_LOGIN_REDIRECT,
            }).then(() => {
                toast({
                    title: "Success!",
                    description: res.success,
                });
            })
            form.reset();
        } else if (res.error_verify) {
            const confirmLink = `${domain}/auth/new-verification?token=${res.token}`;
            const templateParams = {
                app_name: APP_NAME,
                app_email: APP_EMAIL,
                to_email: values.email,
                to_name: "",
                link: confirmLink
            }
            await emailjs.send(service_id, template_id, templateParams, public_key)
                .then(() => {
                    toast({
                        title: "Verify your Account!",
                        description: res.error_verify,
                    });
                })
                .catch((error: any) => {
                    console.error("Failed to send email:", error);
                    throw new Error("Could not send verification email.");
                })
        }
        else {
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
                        <h1 className="text-2xl font-bold">Login to your account</h1>
                        <p className="text-balance text-sm text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <FormInput
                        control={form.control}
                        name="email"
                        label="Email Address"
                        type="email"
                        required={true}
                        disabled={isLoading}
                        placeholder="Email Address"
                        errorMsgShow={false}
                    />
                    <div className="grid">

                        <FormInput
                            control={form.control}
                            name="password"
                            label="Password"
                            type="password"
                            required={true}
                            disabled={isLoading}
                            placeholder="Password"
                            errorMsgShow={false}
                        />
                        <div className="flex items-center">
                            <Link
                                href="/auth/forgot-password"
                                className="ml-auto text-sm underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                        <span className="">Login</span>
                        {isLoading && <LoadingIcon />}
                    </Button>
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/sign-up" className="underline underline-offset-4">
                            Sign up
                        </Link>
                    </div>
                </div>
            </form>
        </Form>



    )
}

export default LoginForm