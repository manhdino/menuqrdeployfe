'use client';

import React from 'react';

type RevenueCardProps = {
    title: string;
    value: string | number;
    Icon: React.ReactNode;
};

const RevenueCard: React.FC<RevenueCardProps> = ({ title, value, Icon }) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                <svg
                    className="fill-gray-800 dark:fill-white/90"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {Icon}
                </svg>
            </div>

            <div className="mt-5 flex items-end justify-between">
                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
                    <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white/90">
                        {value}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default RevenueCard;


