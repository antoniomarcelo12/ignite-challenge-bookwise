'use client'
import Image from 'next/image'
import loginPageImage from '../../assets/login-page-image.png'
import { GithubLogo, GoogleLogo, Rocket } from 'phosphor-react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  function handleGoogleSignin() {
    router.push('/home')
  }
  function handleGithubSignin() {
    router.push('/home')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[700px_1fr] gap-96 max-h-screen overflow-hidden">
      <div className="p-5 object-fill">
        <Image src={loginPageImage} alt="" height={912} width={598} />
      </div>
      <div className="flex justify-center items-center ">
        <div className="flex flex-col ">
          <div className="mb-10">
            <h1 className="font-bold mb-2">Boas vindas!</h1>
            <p className="text-sm">Faça seu login ou acesse como visitante</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleGoogleSignin}
              className="flex items-center p-4 gap-4 bg-slate-800 h-16 rounded-lg font-bold"
            >
              <GoogleLogo className="h-6 w-6" />
              Entrar com Google
            </button>
            <button
              onClick={handleGithubSignin}
              className="flex items-center p-4 gap-4 bg-slate-800 h-16 rounded-lg font-bold"
            >
              <GithubLogo className="h-6 w-6" />
              Entrar com Github
            </button>
            <button className="flex items-center gap-4 p-4 text-sm bg-slate-800 h-16 rounded-lg font-bold">
              <Rocket className="h-6 w-6" />
              Acessar como visitante
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
