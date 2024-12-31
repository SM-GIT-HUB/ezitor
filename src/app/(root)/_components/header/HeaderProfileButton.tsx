'use client'

import LoginButton from '@/components/LoginButton'
import { SignedOut, UserButton } from '@clerk/nextjs'
import { User } from 'lucide-react'

function HeaderProfileButton() {
    return (
        <div className='flex items-center justify-center'>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link href="/profile" label="Profile" labelIcon={<User className="size-4" />} />
            </UserButton.MenuItems>
          </UserButton>
    
          <SignedOut>
            <LoginButton mode='redirect' />
          </SignedOut>
        </div>
  )
}

export default HeaderProfileButton