'use client'

import { useFormLogin } from '@foundation/forms/src/login'
import { signIn } from 'next-auth/react'
import { AuthLayout } from '../organisms/AuthLayout'
import Link from 'next/link'

import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin()
  return (
    <AuthLayout title={'Sign In'}>
      <form
        onSubmit={handleSubmit(async (formData) => {
          signIn('credentials', {
            email: formData.email,
            password: formData.password,
            callbackUrl: '/',
          })
        })}
        className="flex flex-col gap-2 "
      >
        <Label title="Email" error={errors.email?.message}>
          <Input {...register('email')} />
        </Label>
        <Label title="Password" error={errors.password?.message}>
          <Input {...register('password')} type="password" />
        </Label>
        <Button type="submit">Submit</Button>
      </form>
      <div className="flex flex-col items-center gap-2 my-6">
        <div>
          New to application?{' '}
          <Link href="/register" className="font-semibold">
            Register.
          </Link>
        </div>
        <div className="h-[1px] bg-black/20 w-36 my-2" />
        <button
          onClick={() => {
            signIn('google', { callbackUrl: '/' })
          }}
          className="text-lg hover:shadow-lg transition-shadow flex items-center justify-center w-8 h-8 border border-[#ea4335] rounded-full"
        >
          G
        </button>
      </div>
    </AuthLayout>
  )
}
