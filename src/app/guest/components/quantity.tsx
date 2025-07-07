import { Minus, Plus } from 'lucide-react'
export default function Quantity({
  quantity,
  onIncrease,
  onDecrease
}: {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}) {
  return (
    <>
      <button onClick={onDecrease}>
        <div className='bg-[#fb923c] w-[18px] h-[18px] flex items-center justify-center rounded-[2px]'>
          <Minus className='w-[13px] h-[13px] text-white' />
        </div>
      </button>
      <span className='text-xs font-bold text-gray-700'>{quantity}</span>
      <button onClick={onIncrease}>
        <div className='bg-[#fb923c] w-[18px] h-[18px] flex items-center justify-center rounded-[2px]'>
          <Plus className='w-[13px] h-[13px] text-white' />
        </div>
      </button>
    </>
  )
}
