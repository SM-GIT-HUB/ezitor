import { Blocks } from "lucide-react"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"

async function Footer() {
  const user = await currentUser();
  console.log(user?.emailAddresses[0].emailAddress);
  
  return (
    <footer className="relative border-t border-gray-800/50 mt-auto">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Blocks className="size-5 hover:text-blue-900 cursor-pointer" />
            <span>Built for developers, by developers</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-400 hover:text-gray-300 transition-colors">
              Support
            </Link>

            <Link href="/" className="text-gray-400 hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            
            <Link href="/" className="text-gray-400 hover:text-gray-300 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default Footer