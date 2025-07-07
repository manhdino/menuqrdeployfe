import RefreshToken from '@/app/(public)/(auth)/refresh-token/refresh-token'
import { Suspense } from 'react'

export default function RefreshTokenPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
        </div>
      }
    >
      <RefreshToken />
    </Suspense>
  )
}
