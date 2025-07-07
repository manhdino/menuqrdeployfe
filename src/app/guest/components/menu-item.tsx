import { Plus } from "lucide-react";
import { RiHeartLine } from "react-icons/ri";
import Image from 'next/image'

interface MenuItemProps {
    image: string;
    title: string;
    description: string;
    calories: string;
    price: string;
    badge?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ image, title, description, calories, price, badge }) => {
    return (
        <li className="w-full grid grid-cols-[34%_1fr] gap-3 items-center bg-white rounded-md shadow-sm pl-1 pt-1.5 pb-1.5 relative">
            <div className="relative w-full h-full">
                <Image
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded-xl cursor-pointer"
                />
                {badge && (
                    <Image
                        src={badge}
                        alt="badge"
                        className="absolute left-2 top-2 w-5 h-auto"
                    />
                )}
            </div>
            <div className="mr-4 flex flex-col">
                <span className="text-sm font-semibold text-primary mb-1">{title}</span>
                <p className="text-xs text-gray-500 mb-1 max-w-[166px] line-clamp-2">{description}</p>
                <span className="text-xs text-gray-400 mb-1">{calories}</span>
                <span className="text-sm font-semibold text-primary">{price}</span>
            </div>
            <button className="absolute right-0 bottom-0 p-3">
                <Plus className='w-[18px] h-[18px] text-gray-400' />
            </button>
            <button className="absolute right-0 top-0 p-3">
                <RiHeartLine className='w-5 h-5 text-gray-400' />
            </button>
        </li>
    );
};
