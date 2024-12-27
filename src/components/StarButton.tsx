'use client'

import { useAuth } from '@clerk/nextjs'
import { Id } from '../../convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import toast from 'react-hot-toast'
import { Star } from 'lucide-react'

function StarButton({ snippetId }: { snippetId: Id<"snippets"> }) {
  const { isSignedIn } = useAuth();
  const isStarred = useQuery(api.snippets.isSnippetStarred, { snippetId });
  const starCount = useQuery(api.snippets.getSnippetStarCount, { snippetId });
  const starSnippet = useMutation(api.snippets.starSnippet);

  const cls1 = "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
  const cls2 = "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20";

  async function handleStar()
  {
    if (!isSignedIn) {
        return;
    }

    try {
        await starSnippet({ snippetId });
    }
    catch(err: any) {
        console.log("error while starring snippet");
        toast.error(err.message);
    }
  }
  
  return (
    <button className={`group flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200
    ${isStarred? cls1 : cls2}`} onClick={handleStar} >
      <Star className={`w-4 h-4 ${isStarred ? "fill-yellow-500" : "fill-none group-hover:fill-gray-400"}`} />

      <span className={`text-xs font-medium ${isStarred ? "text-yellow-500" : "text-gray-400"} text-center`}>
        {starCount}
      </span>
    </button>
  )
}

export default StarButton