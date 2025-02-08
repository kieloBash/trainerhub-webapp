import FormBaseSelect from '@/components/forms/form-base-select'
import { Button } from '@/components/ui/button'
import { useSportsOptions } from '@/hooks/trainhub/use-sports';
import React, { useMemo, useState } from 'react'

const SportsSelect = ({ form, name }: { form: any, name: string }) => {
    const selectedSports = form.watch(name);
    const sports = useSportsOptions();
    const [selected, setSelected] = useState<{ id: string; label: string } | undefined>(undefined);

    const formattedSportsOptions = useMemo(() => {
        return sports.filter((d) => (!selectedSports.includes(d.id)))
    }, [sports, selectedSports]);

    const handleAdd = () => {
        if (!selected || selectedSports.length >= 3) return null;

        form.setValue(name, [...selectedSports, selected.id]);
        setSelected(undefined);
    }

    const handleRemove = (x: string) => {
        const newSports = selectedSports.filter((d: any) => d !== x);
        form.setValue(name, [...newSports]);
    }

    return (
        <div className="w-full grid gap-1">
            <label className='font-semibold text-sm'>Sports</label>
            <p className="text-sm text-muted-foreground">Select at most 3 sports/activities you are interested in!</p>
            <div className="flex gap-2 w-full">
                <div className="flex-1">
                    <FormBaseSelect
                        value={selected?.id ?? ""}
                        onChange={(e) => {
                            const x = sports.find((d) => d.id === e);
                            if (x)
                                setSelected(x);
                        }}
                        array={formattedSportsOptions}
                        disabled={selectedSports.length >= 3}
                    />
                </div>
                <Button type='button' onClick={handleAdd} disabled={!selected}>Add</Button>
            </div>
            <ul className="flex flex-wrap gap-1 text-xs border rounded-lg p-2 h-10 mt-1">
                {selectedSports.map((d: any) => {
                    return (
                        <li className="" key={d}>
                            <button type='button' onClick={() => handleRemove(d)} className="text-xs bg-primary text-primary-foreground rounded-full py-1 px-2" >{sports.find((dd) => dd.id === d)?.label}</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SportsSelect