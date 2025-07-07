'use client';

import { useEffect, useState } from 'react';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
    BsGeoAltFill,
    BsAlarm,
    BsFacebook,
    BsTwitter,
    BsLinkedin,
    BsInstagram,
} from 'react-icons/bs';
import { useAppStore } from '@/components/common/app-provider';
import { useLogoutMutation } from '@/queries/useAuth';
import { cn, handleErrorApi } from '@/lib/utils';
import { Role } from '@/constants/type';
import { RoleType } from '@/types/jwt.types';
import { useRouter } from 'next/navigation';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';

const menuItems: {
    title: string;
    href: string;
    role?: RoleType[];
    hideWhenLogin?: boolean;
}[] = [
        {
            title: 'Trang chủ',
            href: '/',
        },
        // {
        //     title: 'Menu',
        //     href: '/guest/menu',
        //     role: [Role.Guest],
        // },
        {
            title: 'Menu',
            href: '/#menu'
        },
        {
            title: 'Về chúng tôi',
            href: '/#about-us',
        },
        {
            title: 'Liên hệ',
            href: '/#contact',
        },
        {
            title: 'Bài viết',
            href: '/blog',
        },
        // {
        //     title: 'Orders',
        //     href: '/guest/orders',
        //     role: [Role.Guest],
        // },
        {
            title: 'Quản lý',
            href: '/manage/dashboard',
            role: [Role.Owner, Role.Employee],
        },
    ];

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const role = useAppStore((state) => state.role);
    const setRole = useAppStore((state) => state.setRole);
    const disconnectSocket = useAppStore((state) => state.disconnectSocket);
    const logoutMutation = useLogoutMutation();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const logout = async () => {
        if (logoutMutation.isPending) return;
        try {
            await logoutMutation.mutateAsync();
            setRole();
            disconnectSocket();
            router.push('/');
        } catch (error) {
            handleErrorApi({ error });
        }
    };

    return (
        <div
            className={`bg-[#161819] text-white fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            {/* Top Info Bar */}
            <div className="text-[15px] bg-[#EB0029]">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col items-center justify-between py-2 md:flex-row">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-1">
                                <BsGeoAltFill />
                                <span>Trương Định - 546 Trương Định, Hai Bà Trưng, Hà Nội</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <BsAlarm />
                                <span>9.00 sáng - 9.00 tối</span>
                            </div>
                        </div>
                        <div className="items-center hidden gap-2 mt-2 md:mt-0 md:flex">
                            <span className='mt-[2px]'>Theo dõi chúng tôi:</span>
                            <ul className="flex gap-2">
                                <li><a href="#" className="hover:text-blue-500"><BsFacebook /></a></li>
                                <li><a href="#" className="hover:text-blue-400"><BsTwitter /></a></li>
                                <li><a href="#" className="hover:text-blue-600"><BsLinkedin /></a></li>
                                <li><a href="#" className="hover:text-pink-500"><BsInstagram /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="container px-4 mx-auto">
                <div className="flex items-center justify-between py-4">
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src="/logo/logoWhite.svg"
                            alt="Logo"
                            width={167}
                            height={58}
                            className="w-auto h-auto"
                        />
                    </Link>

                    <nav className="hidden gap-10 mr-12 font-medium md:flex">
                        {menuItems.map((item) => {
                            const isAuth = item.role?.includes(role as RoleType);
                            const isHiddenWhenLoggedIn = role && item.hideWhenLogin;
                            const isVisibleForGuest = !role && item.hideWhenLogin;
                            const isGeneral = !item.role && !item.hideWhenLogin;
                            const canShow = isGeneral || isVisibleForGuest;

                            if (isAuth || canShow) {
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="transition hover:text-yellow-400"
                                    >
                                        {item.title}
                                    </Link>
                                );
                            }
                            return null;
                        })}
                    </nav>
                    {role && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    className="hidden relative overflow-hidden group px-4 py-3 md:flex gap-2 items-center z-10 bg-[#EB0029]"
                                >
                                    <span className="relative z-10 flex items-center gap-2 text-sm text-white">
                                        ĐĂNG XUẤT
                                        <MoveRight className="w-5 h-[18px] bg-white p-[2px] text-[#EB0029] mb-[3px]" />
                                    </span>
                                    <span className="absolute top-0 left-[-100%] group-hover:left-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
                                    <span className="absolute bottom-0 right-[-100%] group-hover:right-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
                                </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Bạn có chắc chắc muốn đăng xuất?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Đăng xuất có thể dẫn đến mất đơn hàng của bạn
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className='mt-2'>
                                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                                    <AlertDialogAction onClick={logout} className='bg-[#EB0029] text-white hover:bg-[#fc791a]'>Đồng ý</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                    {!role && (
                        <Link
                            href="/login"
                            className="relative overflow-hidden group px-4 py-3  gap-2 items-center z-10 bg-[#EB0029] hidden md:flex"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-sm text-white">
                                ĐĂNG NHẬP
                                <MoveRight className="w-5 h-[18px] bg-white p-[2px] text-[#EB0029] mb-[3px]" />
                            </span>
                            <span className="absolute top-0 left-[-100%] group-hover:left-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
                            <span className="absolute bottom-0 right-[-100%] group-hover:right-0 w-full h-1/2 bg-[#fc791a] transition-all duration-300 ease-in-out z-0" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
