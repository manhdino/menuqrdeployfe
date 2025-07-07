'use client'

import {
  checkAndRefreshToken,
  getRefreshTokenFromLocalStorage
} from '@/lib/utils'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function RefreshToken() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const refreshTokenFromUrl = searchParams.get('refreshToken')
  const redirectPathname = searchParams.get('redirect')
  useEffect(() => {
    if (
      refreshTokenFromUrl &&
      refreshTokenFromUrl === getRefreshTokenFromLocalStorage()
    ) {
      checkAndRefreshToken({
        onSuccess: () => {
          router.push(redirectPathname || '/')
        }
      })
    } else {
      router.push('/')
    }
  }, [router, refreshTokenFromUrl, redirectPathname])
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-orange-500">
      <svg
        className="animate-spin h-10 w-10 text-orange-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      <span className="text-sm">Đang làm mới phiên làm việc của bạn...</span>
    </div>
  )
}
