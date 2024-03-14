import { Spinner } from 'phosphor-react'

export function LoadingUserRatings() {
  return (
    <div className="h-screen w-[800px]">
      <Spinner className="animate-spin bg-slate-200" size={50} />
    </div>
  )
}
