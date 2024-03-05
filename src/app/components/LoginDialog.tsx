import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { GithubLogo, GoogleLogo } from 'phosphor-react'
import { popupCenter } from '../login/popup-center'

interface LoginDialogProps {
  isLoginDialogOpen: boolean
  onLoginDialogOpenChange: (status: boolean) => void
  label: string
}

export function LoginDialog({
  isLoginDialogOpen,
  onLoginDialogOpenChange,
  label,
}: LoginDialogProps) {
  function handleLogin(provider: string) {
    if (provider === 'google') {
      popupCenter('/login/google', 'Google login')
      onLoginDialogOpenChange(false)
    }
    if (provider === 'github') {
      popupCenter('/login/github', 'Github login')
      onLoginDialogOpenChange(false)
    }
  }

  return (
    <Dialog onOpenChange={onLoginDialogOpenChange} open={isLoginDialogOpen}>
      <DialogContent className="w-[516px] flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">{label}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col w-[70%] gap-4 mt-5">
          <button
            onClick={() => handleLogin('google')}
            className="flex items-center h-[72px] bg-slate-700 text-gray-100 text-lg p-4 gap-3 rounded-lg"
          >
            <GoogleLogo size={32} /> Entrar com Google
          </button>
          <button
            onClick={() => handleLogin('github')}
            className="flex items-center h-[72px] bg-slate-700 text-gray-100 text-lg p-4 gap-3 rounded-lg"
          >
            <GithubLogo size={32} /> Entrar com Github
          </button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
