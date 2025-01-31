import React from 'react'
import { ILayoutProps } from '@/types/global'


const Layout = ({ children }: ILayoutProps) => {
    return (
        <div className="size-full">
            {children}
        </div>
    )
}

export default Layout