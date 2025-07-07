'use client';

import { MoveRight } from 'lucide-react';
import Image from 'next/image';

export default function ContactSection() {

    return (
        <section className="relative py-20 overflow-hidden bg-orange-50" id="contact">
            {/* Background Shapes */}
            <div className="absolute left-0 z-20 top-1/3">
                <Image
                    src="/images/contact/contactShape.png"
                    alt="Shape"
                    width={225}
                    height={401}
                />
            </div>
            <div className="absolute top-0 left-0 z-10">
                <Image
                    src="/images/contact/contactThumb1.png"
                    alt="Shape"
                    width={929}
                    height={811}
                />
            </div>
            <div className="absolute bottom-0 right-0 z-0">
                <Image
                    src="/images/contact/contactThumb2.png"
                    alt="Shape"
                    width={1447}
                    height={811}
                />
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 mx-auto">
                <div className="flex flex-col items-center gap-10 xl:flex-row">
                    {/* Left: Form */}
                    <div className="order-2 w-full p-8 xl:w-5/12 xl:order-1 rounded-xl ">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 py-1 text-base font-extrabold text-white rounded-full w-fit">
                                <Image
                                    src="/icons/titleIconWhite.svg"
                                    alt="icon"
                                    width={20}
                                    height={20}
                                />
                                <span className='uppercase'>Liên hệ đặt bàn</span>
                                <Image
                                    src="/icons/titleIconWhite.svg"
                                    alt="icon"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <h2 className="text-4xl font-bold text-white">Đặt bàn ngay hôm nay</h2>
                        </div>

                        <form className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
                            <div>
                                <label htmlFor="date" className="block text-base font-medium text-white">
                                    Chọn ngày*
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    required
                                    className="block w-full p-3 mt-1 border border-gray-300 shadow-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="time" className="block text-base font-medium text-white">
                                    Chọn giờ*
                                </label>
                                <input
                                    type="time"
                                    id="time"
                                    required
                                    className="block w-full p-3 mt-1 border border-gray-300 shadow-sm"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="service" className="block text-base font-medium text-white">
                                    Số lượng người*
                                </label>
                                <input
                                    type="text"
                                    id="service"
                                    required
                                    placeholder="Total Guests"
                                    className="block w-full p-3 mt-1 border border-gray-300 shadow-sm"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="message" className="block text-base font-medium text-white">
                                    Thông tin thêm*
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="Write your message here..."
                                    className="block w-full p-3 mt-1 border border-gray-300"
                                ></textarea>
                            </div>
                            <button
                                className="relative overflow-hidden w-[176px] group text-sm py-[13px] px-[22px]  flex gap-2 items-center z-10 bg-[#fc791a]"
                            >
                                <span className="relative z-10 flex items-center gap-2 text-white">
                                    ĐẶT BÀN NGAY
                                    <MoveRight
                                        className="w-6 h-[22px] mb-[2px]  text-white"
                                    />
                                </span>

                                {/* Top half animation */}
                                <span className="absolute top-0 left-[-100%] group-hover:left-0 w-full h-1/2 bg-black transition-all duration-300 ease-in-out z-0" />

                                {/* Bottom half animation */}
                                <span className="absolute bottom-0 right-[-100%] group-hover:right-0 w-full h-1/2 bg-black transition-all duration-300 ease-in-out z-0" />
                            </button>
                        </form>
                    </div>

                    {/* Right: Video Button */}
                    <div className="flex justify-center order-1 w-full xl:w-7/12 xl:order-2">
                        <button className="relative">
                            <Image
                                src="/icons/player.svg"
                                alt="Play"
                                width={152}
                                height={152}
                                className="animate-spin-slow"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
