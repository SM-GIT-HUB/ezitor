import { Code2 } from "lucide-react"

function page() {
  return (
    <div className="flex items-center justify-center w-[98vw] h-screen z-[999]">
      <div className="absolute w-[120px] h-[120px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
      <Code2 size={100} className="text-gray-300 relative z-10" />
    </div>
  )
}

export default page