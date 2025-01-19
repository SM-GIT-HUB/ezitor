import { Zap } from "lucide-react"
import Link from "next/link"

function UpgradeButton() {
  const CHECKOUT_URL = "https://store-test-store.lemonsqueezy.com/buy/2d7810dc-9e87-4353-a46f-239a299200f2";

  return (
    <Link href={CHECKOUT_URL} className="inline-flex items-center justify-center gap-2 px-4 py-2 text-white bg-gradient-to-r
    from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all" >
      <Zap className="w-5 h-5" />
      Upgrade to Pro
    </Link>
  )
}

export default UpgradeButton