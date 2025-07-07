import Image from "next/image";
import Link from "next/link";

interface BreadcrumbProps {
  title: string;
}

export default function Breadcrumb({ title }: BreadcrumbProps) {
  return (
    <div className="relative w-full h-64 md:h-96 lg:h-[453px]">
      <Image
        src="/breadcumb.jpg"
        alt="Breadcrumb Background"
        fill
        className="z-0 object-cover"
        priority
      />
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container px-4 mx-auto">
          <div className="text-white">
            <h1 className="md:text-[64px] text-4xl text-center font-bold uppercase mb-10">
              {title}
            </h1>
            <ul className="flex items-center justify-center space-x-2 text-base font-semibold text-white">
              <li>
                <Link href="/" className="text-white hover:underline">
                  Trang chủ
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#eb0029] text-[18px] mt-1">{title}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
