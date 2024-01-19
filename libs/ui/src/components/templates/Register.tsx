'use client'
import Link from 'next/link'
import { useFormRegister } from '@foundation/forms/src/register'
import { signIn } from 'next-auth/react'
import { fetchGraphqlStatic } from '@foundation/network/src/fetch'
import { RegisterWithCredentialsDocument } from '@foundation/network/src/queries/generated'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import { AuthLayout } from '../organisms/AuthLayout'

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()
  console.log('errors ', errors)

  return (
    <AuthLayout title={'Register'}>
      <form
        onSubmit={handleSubmit(async (formData) => {
          const { data, error } = await fetchGraphqlStatic({
            document: RegisterWithCredentialsDocument,
            variables: {
              registerWithCredentialsInput: formData,
            },
          })
          if (error) {
            alert(error)
          }
          if (data) {
            signIn('credentials', {
              email: formData.email,
              password: formData.password,
              callbackUrl: '/',
            })
          }
        })}
        className="flex flex-col gap-2"
      >
        <Label title="Email" error={errors.email?.message}>
          <Input className=" border" {...register('email')} />
        </Label>

        <Label title="Password" error={errors.password?.message}>
          <Input {...register('password')} type="password" />
        </Label>
        <Label title="Name" error={errors.name?.message} optional>
          <Input {...register('name')} />
        </Label>
        <Button type="submit">Submit!</Button>
      </form>
      <div className="flex flex-col items-center gap-2 my-6">
        <div>
          Already have an account?{' '}
          <Link href="/signIn" className="font-semibold">
            Signin?
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
