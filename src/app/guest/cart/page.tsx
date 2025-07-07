'use client'
import { useAppStore } from "@/components/common/app-provider";
import { Button } from "@/components/ui/button";
import { formatCurrency, handleErrorApi } from "@/lib/utils";
import { useGuestOrderMutation } from "@/queries/useGuest";
import { GuestCreateOrdersBodyType } from "@/validations/guest.schema";
import { Trash2 } from 'lucide-react';
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function CartPage() {
    const orders = useAppStore((state) => state.orders);
    const dishes = useAppStore((state) => state.dishes)
    const { mutateAsync } = useGuestOrderMutation()
    const router = useRouter()
    const totalPriceCart = useAppStore((state) => state.totalPriceCart)

    const handleOrder = async () => {
        try {
            console.log(orders)
            await mutateAsync(orders)
            setOrders([])
            router.push(`/guest/orders`)
        } catch (error) {
            handleErrorApi({
                error
            })
        }
    }

    const setOrders = useAppStore((state) => state.setOrders)

    const handleQuantityChange = (dishId: number, quantity: number) => {
        let newOrders: GuestCreateOrdersBodyType
        if (quantity === 0) {
            newOrders = orders.filter(order => order.dishId !== dishId)
        } else {
            const index = orders.findIndex(order => order.dishId === dishId)
            if (index === -1) {
                newOrders = [...orders, { dishId, quantity }]
            } else {
                newOrders = [...orders]
                newOrders[index] = { ...newOrders[index], quantity }
            }
        }
        setOrders(newOrders)
    }


    return (
        <div className="flex flex-col h-[82vh] px-3 py-5">
            {orders.length > 0 ? (
                <>
                    <div className="flex items-center justify-center gap-1 mb-4 text-sm font-semibold text-gray-500">
                        <Image src="/icons/titleIcon.svg" alt="Icon" width={14} height={14} />
                        <span className='text-base uppercase font-extrabold text-[#fc791a]'>Món ăn đã chọn</span>
                        <Image src="/icons/titleIcon.svg" alt="Icon" width={14} height={14} />
                    </div>
                    <div className="flex-1 pr-1 space-y-3 overflow-y-auto">
                        {orders.map((order, index) => {
                            const dish = dishes.find((d: any) => d.id === order.dishId);
                            if (!dish) return null;
                            return (
                                <div key={order.dishId} className="flex items-center gap-[13px] bg-white rounded-md shadow-lg ">
                                    <div className="w-3 pl-3 text-sm font-semibold text-gray-700">{index + 1}.</div>
                                    <div className="flex items-center justify-center p-2">
                                        <Image
                                            src={dish.image}
                                            alt={dish.name}
                                            className="object-cover w-[83px] h-[83px]"
                                        />
                                    </div>
                                    <div className="flex flex-col w-1/3">
                                        <span className="mb-1 text-sm font-medium text-black">{dish.name}</span>
                                        <Image src="/icons/rating.svg" alt="rating" width={68} height={13} />
                                        <span className="mb-3 text-xs text-gray-500">{dish.calories}</span>
                                        <span className="text-sm font-medium text-[#fc791a]">{formatCurrency(dish.price)}</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-between h-full">
                                        <button className="flex items-center justify-center p-3" onClick={() => {
                                            const existing = orders.find((order) => order.dishId === dish.id);
                                            const newQty = existing ? existing.quantity + 1 : 1;
                                            handleQuantityChange(dish.id, newQty);
                                        }}>
                                            <Image src="/icons/counter-plus.svg" alt="Remove from cart" width={21} height={21} />
                                        </button>
                                        <span className="text-xs">{order.quantity}</span>
                                        <button className="flex items-center justify-center p-3"
                                            onClick={() => {
                                                const existing = orders.find((order) => order.dishId === dish.id);
                                                const newQty = existing ? existing.quantity - 1 : 0;
                                                handleQuantityChange(dish.id, newQty);
                                            }}
                                        >
                                            <Image src="/icons/counter-minus.svg" alt="Add to cart" width={21} height={21} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleQuantityChange(dish.id, 0)}
                                        className="rounded-full hover:bg-gray-100"
                                    >
                                        <Trash2 className="w-[18px] h-[18px] text-gray-600" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="border-t flex items-center text-black text-[18px] justify-between border-t-gray-300 mx-[14px] mt-6 py-4 px-1">
                        <span className="text-base " >Tổng tiền:</span>
                        <span className="text-[15px]">{formatCurrency(totalPriceCart)}</span>
                    </div>
                    <Button
                        onClick={handleOrder}
                        className="relative overflow-hidden  mx-[14px] group text-xs  flex items-center justify-center z-10 bg-[#EB0029]"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2 text-white uppercase">
                            Đặt món

                        </span>

                        {/* Top animation */}
                        <span className="absolute top-0 left-[-100%] group-hover:left-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
                        {/* Bottom animation */}
                        <span className="absolute bottom-0 right-[-100%] group-hover:right-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
                    </Button>
                </>
            ) :
                <section className="flex-1 flex flex-col justify-center items-center bg-transparent rounded-[10px] p-2">
                    <Image src="/guest/cart.png" alt="info saved" width={240} height={184} />
                    <h2 className="text-center capitalize text-[18px] font-semibold mb-2">
                        Giỏ hàng trống!
                    </h2>
                    <p className="text-sm text-center text-gray-600 mb-7">
                        Bạn chưa thêm món nào vào giỏ hàng. <br />
                        Hãy khám phá thực đơn và chọn món yêu thích nhé!
                    </p>
                </section>
            }
        </div>
    );
}
