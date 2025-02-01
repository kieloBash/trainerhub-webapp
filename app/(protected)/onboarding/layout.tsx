import React from 'react'
import { ILayoutProps } from '@/types/global'

import { Metadata } from 'next';
import { APP_NAME } from '@/lib/utils';

const TITLE = 'Onboarding';
const DESCRIPTION = 'Get started and fill up all the necessary informations.';

export const metadata: Metadata = {
    title: `${TITLE} - ${APP_NAME}`,
    description: DESCRIPTION,
};


const Layout = ({ children }: ILayoutProps) => {
    return (
        <article className="size-full flex-1">
            {children}
        </article>
    )
}

export default Layout