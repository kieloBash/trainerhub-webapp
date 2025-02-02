import React from 'react'

const DisplayMessages = () => {
    return (
        <div className="w-full p-4 h-[calc(100vh-14rem)] overflow-hidden bg-muted flex flex-col-reverse justify-start items-center">
            <ul className="space-y-2 w-full">
                <li className="w-full flex justify-end items-center">
                    <div className="py-2 px-3 bg-primary rounded-xl">
                        <p className="">Hello World!</p>
                    </div>
                </li>
                <li className="w-full flex justify-start items-center">
                    <div className="py-2 px-3 bg-white rounded-xl">
                        <p className="">Hi</p>
                    </div>
                </li>
                <li className="w-full flex justify-start items-center">
                    <div className="py-2 px-3 bg-white rounded-xl">
                        <p className="">Hi</p>
                    </div>
                </li>
                <li className="w-full flex justify-start items-center">
                    <div className="py-2 px-3 bg-white rounded-xl">
                        <p className="">Hi</p>
                    </div>
                </li>
                <li className="w-full flex justify-start items-center">
                    <div className="py-2 px-3 bg-white rounded-xl">
                        <p className="">Hi</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default DisplayMessages