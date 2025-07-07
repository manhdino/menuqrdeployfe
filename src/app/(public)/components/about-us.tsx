'use client'

import Image from 'next/image'

export default function AboutSection() {
    return (
        <section className="relative w-full" id="about-us">
            <div className="hidden 2xl:block absolute top-[20%] right-0 z-0">
                <Image
                    src="/images/about-us/thumbRight.png"
                    alt="Shape"
                    width={225}
                    height={401}
                />
            </div>

            <div className="py-12">
                <div className="flex flex-col items-center gap-10 lg:flex-row">
                    <div className="relative flex justify-center mb-8 lg:w-1/2 lg:justify-start lg:mb-0">
                        <Image
                            src="/images/about-us/thumbLeft.png"
                            alt="About Thumbnail"
                            width={875}
                            height={536}
                            className="rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                                src="/icons/player.svg"
                                alt="Play Video"
                                width={152}
                                height={152}
                                className="animate-spin-slow"
                            />

                        </div>
                    </div>

                    {/* Nội dung */}
                    <div className="space-y-6 lg:w-1/3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                            <Image
                                src="/icons/titleIcon.svg"
                                alt="Icon"
                                width={20}
                                height={20}
                            />
                            <span className='text-base uppercase font-extrabold text-[#fc791a]'>Về chúng tôi</span>
                            <Image
                                src="/icons/titleIcon.svg"
                                alt="Icon"
                                width={20}
                                height={20}
                            />
                        </div>

                        <h2 className="text-4xl lg:text-[40px] font-bold text-gray-900">
                            Tinh Hoa Ẩm Thực Việt
                        </h2>

                        <p className="text-base leading-relaxed text-gray-700">
                            Mỗi món ăn tại đây không chỉ được chế biến – mà được chăm chút tỉ mỉ như một tác phẩm nghệ thuật, dưới đôi tay tài hoa và am hiểu sâu sắc về sự hòa quyện hương vị của các đầu bếp giàu kinh nghiệm.
                        </p>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="flex items-start gap-4">
                                <Image
                                    src="/images/about-us/food.svg"
                                    alt="Quality Food"
                                    width={36}
                                    height={36}
                                />
                                <div>
                                    <h6 className="text-lg font-semibold">Đồ Ngon Chuẩn Vị </h6>
                                    <p className="text-sm text-gray-600">
                                        Thưởng thức món ngon đậm đà, phục vụ tận tâm bởi đội ngũ nhân viên thân thiện.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Image
                                    src="/images/about-us/hat.svg"
                                    alt="Qualified Chef"
                                    width={36}
                                    height={36}
                                />
                                <div>
                                    <h6 className="text-lg font-semibold">Đầu Bếp Chuyên Nghiệp</h6>
                                    <p className="text-sm text-gray-600">
                                        Ẩm thực phong phú và tinh tế, sáng tạo bởi những đầu bếp chuyên nghiệp với nhiều năm trong nghề
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
