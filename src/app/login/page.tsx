'use client'
import Image from 'next/image'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '..'

import loginPageImage from '../../assets/login-page-image.png'
import { GithubLogo, GoogleLogo, Rocket } from 'phosphor-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function Login() {
  const router = useRouter()
  async function handleGoogleSignin() {
    // router.push('/home')
    try {
      await signIn('google')
      router.push('/home')
    } catch (err) {
      window.alert('erro.')
    }
  }

  function handleGithubSignin() {
    router.push('/home')
  }

  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX
    const dualScreenTop = window.screenTop ?? window.screenY

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height

    const systemZoom = width / window.screen.availWidth

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft
    const top = (height - 550) / 2 / systemZoom + dualScreenTop

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`,
    )

    newWindow?.focus()
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
              onClick={() => popupCenter('/login/google', 'Google login')}
              className="flex items-center p-4 gap-4 bg-slate-800 h-16 rounded-lg font-bold"
            >
              <GoogleLogo className="h-6 w-6" />
              Entrar com Google
            </button>
            <button
              onClick={() => popupCenter('/login/github', 'Github login')}
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

export async function getServerSideProps(context) {
  return {
    props: {
      session: await unstable_getServerSession(
        context.req,
        context.res,
        authOptions,
      ),
    },
  }
}
