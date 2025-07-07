import http from '@/lib/http'
import { LoginBodyType, LoginResType } from '@/validations/auth.schema'
import { useMutation } from '@tanstack/react-query'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (body: LoginBodyType) =>
      http.post<LoginResType>('/api/auth/login', body)
  })
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: () =>
      http.post('/api/auth/logout', null)
  })
}

