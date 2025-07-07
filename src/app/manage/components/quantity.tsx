import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus } from 'lucide-react'

export default function Quantity({
    onChange,
    value
}: {
    onChange: (value: number) => void
    value: number
}) {
    return (
        <div className='flex gap-1 items-center'>
            <Button
                className={`h-6 w-6 p-0 ${value > 0 && 'bg-[#465FFF] hover:bg-blue-600'}`}
                disabled={value === 0}
                onClick={() => onChange(value - 1)}
            >
                <Minus className='w-3 h-3' />
            </Button>
            <Input
                type='text'
                inputMode='numeric'
                pattern='[0-9]*'
                className='h-7 px-1 py-2 w-8 text-center'
                value={value}
                onChange={(e) => {
                    let value = e.target.value
                    const numberValue = Number(value)
                    if (isNaN(numberValue)) {
                        return
                    }
                    onChange(numberValue)
                }}
            />
            <Button className='h-6 w-6 p-0 bg-[#465FFF] hover:bg-blue-600' onClick={() => onChange(value + 1)}>
                <Plus className='w-3 h-3' />
            </Button>
        </div >
    )
}