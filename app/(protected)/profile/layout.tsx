import React from 'react'
import OnboardedLayout from '@/components/layouts/OnboardedLayout'
import { ILayoutProps } from '@/types/global'

import { Metadata } from 'next';
import { APP_NAME } from '@/lib/utils';
import RoleGateLayout from '@/components/layouts/RoleGateLayout';
import HeaderLayout from '@/components/layouts/HeaderLayout';

const TITLE = 'Profile';
const DESCRIPTION = 'View and manage your profile';
const LIST = [
    {
        type: "page",
        href: "",
        label: "Profile"
    },
]

export const metadata: Metadata = {
    title: `${TITLE} - ${APP_NAME}`,
    description: DESCRIPTION,
};


const Layout = ({ children }: ILayoutProps) => {
    return (
        <RoleGateLayout roles={["ANY"]}>
            {children}
        </RoleGateLayout>
    )
}

export default Layout