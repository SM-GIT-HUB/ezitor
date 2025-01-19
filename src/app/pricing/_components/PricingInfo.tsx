'use client'

import { X } from 'lucide-react'
import React from 'react'
import UpgradeButton from './UpgradeButton'
import { usePricingModalState } from '@/store/usePricingModalState'

function PricingInfo() {
  const { modalOpen ,setModalOpen } = usePricingModalState();

  if (!modalOpen) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e2e] rounded-lg p-6 w-full max-w-md">
        <div className='flex justify-between'>
          <h1 className='text-xl font-semibold text-white'>Please read</h1>
          <button onClick={() => setModalOpen(false)}>
            <X/>
          </button>
        </div>
        <div className='mt-[20px] mx-2 text-[18px] flex items-center justify-center text-gray-300'>
          <div className='text-[18px] text-center'>
            You don't need to pay any real money to access pro.
            In the pricing page, use card number: <br />
            <h1 className='text-center my-2 text-blue-400'>4242 4242 4242 4242</h1>
            Use cvv: <span className='text-blue-400'>424</span> and use any future date
            for the expiry date. Use the email that is linked to your <span className='text-white'>Ezitor</span> account.
            Happy learning.
          </div>
        </div>

        <div className='flex items-center justify-center mt-[15px]'>
          <UpgradeButton/>
        </div>
      </div>
    </div>
  )
}

export default PricingInfo