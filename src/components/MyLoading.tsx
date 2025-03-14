import { ReloadIcon } from "@radix-ui/react-icons"

export default function MyLoading() {
  return (
    <div className='fixed z-[10000] bg-[#646464a8] w-full h-[100vh]'  >
     <div className="flex flex-col items-center justify-center w-full h-full">
          <ReloadIcon className="h-8 w-8 animate-spin text-white mb-4" />
          <p className="text-muted-foreground text-white">در انتظار اطلاعات...</p>
        </div>
    </div>
  )
}

