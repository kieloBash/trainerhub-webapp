import React from 'react'
import RoleGateLayout from '@/components/layouts/RoleGateLayout'
import { ILayoutProps } from '@/types/global'
import { UserRole } from '@prisma/client'

import { Metadata } from 'next';
import { APP_NAME } from '@/lib/utils';
import HeaderLayout from '@/components/layouts/HeaderLayout';

const TITLE = 'Dashboard';
const DESCRIPTION = 'View and manage analytics in the system';
const LIST = [
    {
        type: "page",
        href: "",
        label: "Dashboard"
    },
]

export const metadata: Metadata = {
    title: `${TITLE} - ${APP_NAME}`,
    description: DESCRIPTION,
};


const Layout = ({ children }: ILayoutProps) => {
    return (
        <RoleGateLayout roles={[UserRole.USER]}>
            <HeaderLayout list={LIST} title={TITLE} description={DESCRIPTION}>
                {children}
            </HeaderLayout>
        </RoleGateLayout>
    )
}

export default Layout