'use client'
import React, { useEffect, useState } from 'react'
import { UploadIcon } from 'lucide-react'
import { CldUploadButton } from 'next-cloudinary'
import { useSportsOptions } from '@/hooks/trainhub/use-sports'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from 'next/image'

const SpecializationOptions = ({ form, name }: { form: any, name: string }) => {
    const [image, setImage] = useState("");
    const [sportName, setSportName] = useState("");
    const [sportId, setSportId] = useState("");

    const sports = useSportsOptions();

    useEffect(() => {
        form.setValue(name, [{ image, sportName: "", sportId }])
    }, [sportId, image])

    function handleUpload(data: any) {
        console.log(data.info.secure_url);
        setImage(data.info.secure_url)
    }

    return (
        <div className="grid gap-1 w-full">
            <label htmlFor="availableDays" className="text-sm font-medium">Specialization</label>
            <p className='text-sm text-muted-foreground mb-1'>You can add a specialization for better prices for your training sessions. Certificate and sport of specialization.</p>
            <div className="flex flex-col w-full gap-2 text-xs">
                <div className="w-full relative border rounded-lg p-2 flex justify-between items-center gap-2">
                    <CldUploadButton
                        options={{ maxFiles: 1, clientAllowedFormats: ["png", "jpeg"] }}
                        onSuccess={handleUpload}
                        uploadPreset={"sandbox"}
                        className={"rounded-lg size-16 aspect-square overflow-hidden border flex justify-center items-center"}
                    >
                        {image ? <div className="size-full aspect-square rounded-lg border relative">
                            <Image src={image} fill alt="" />
                        </div> :
                            <UploadIcon className='text-primary-foreground size-8' />
                        }
                    </CldUploadButton>
                    <div className="flex-1 flex flex-col justify-start items-center gap-1">
                        <Select value={sportId} onValueChange={(e) => setSportId(e)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a sport" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Sports</SelectLabel>
                                    {sports.map((d) => {
                                        return (
                                            <SelectItem value={d.id} key={d.id}>{d.label}</SelectItem>
                                        )
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            {form.formState.errors?.specializations && (
                <p className="text-center text-xs text-red-500">
                    Please add an image of certificate and sport of specialization*
                </p>
            )}
        </div>
    )
}

export default SpecializationOptions