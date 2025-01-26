import React from 'react'
import { currentUser } from '@/lib/auth';
import { ILayoutProps } from '@/types/global'
import { redirect } from 'next/navigation';
import { SidebarProvider } from '../ui/sidebar';
import AdminLayout from './AdminLayout';



const AuthenticatedLayout = async ({ children }: ILayoutProps) => {
    const user = await currentUser();

    if (!user) redirect(`/auth/error?message=Unauthenticated User`);

    if (!user.isOnboarded) return (
        <>{children}</>
    );

    if (user.role === "ADMIN") {
        return (
            <SidebarProvider>
                <AdminLayout>
                    {children}
                </AdminLayout>
            </SidebarProvider>
        )
    }

    return (
        <section className="w-screen min-h-screen flex justify-center items-center">
            <h1 className="text-lg font-bold">Authentication Error: No role</h1>
        </section>
    )
}

export default AuthenticatedLayout