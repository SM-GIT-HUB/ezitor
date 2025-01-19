'use client'

import { usePricingModalState } from "@/store/usePricingModalState"

function CheckOut() {
  const { setModalOpen } = usePricingModalState();

  return (
    <>
      <button className="inline-flex items-center justify-center gap-2 px-4 py-4 text-white bg-gradient-to-r
      from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-[18px] font-bold"
      onClick={() => setModalOpen(true)}>
        Checkout here
      </button>
    </>
  )
}

export default CheckOut