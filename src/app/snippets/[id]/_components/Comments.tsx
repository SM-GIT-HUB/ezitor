import { useUser } from "@clerk/nextjs"
import { Id } from "../../../../../convex/_generated/dataModel"
import { useState } from "react"
import { CommentsType } from "@/types"
import { useMutation } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import toast from "react-hot-toast"
import { MessageSquare } from "lucide-react"
import Comment from "./Comment"
import CommentForm from "./CommentForm"
import LoginButton from "@/components/LoginButton"

function Comments({ snippetId, comments }: { snippetId: Id<"snippets">, comments: CommentsType[] }) {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  const addComment = useMutation(api.snippets.addComment);
  const deleteComment = useMutation(api.snippets.deleteComment);

  async function handleSubmitComment(content: string)
  {
    setIsSubmitting(true);

    try {
      await addComment({ snippetId, content });
      toast.success("Comment added");
    }
    catch(err: any) {
      console.log("error in submitting comment", err.message);
      toast.error("Something went wrong");
    }
    finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteComment(commentId: Id<"snippetComments">)
  {
    setDeletingCommentId(commentId);

    try {
      await deleteComment({ commentId });
      toast.success("Your comment was deleted");
    }
    catch(err: any) {
      console.log("error in deleting comment", err.message);
      toast.error("Something went wrong");
    }
    finally {
      setDeletingCommentId(null);
    }
  }

  return (
    <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl overflow-hidden">
      <div className="px-6 sm:px-8 py-6 border-b border-[#ffffff0a]">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Discussion ({comments.length})
        </h2>
      </div>

      <div className="p-6 sm:p-8">
        {
          user? <CommentForm onSubmit={handleSubmitComment} isSubmitting={isSubmitting} /> :
          <div className="bg-[#0a0a0f] rounded-xl p-6 text-center flex flex-col items-center justify-center mb-8 border border-[#ffffff0a]">
            <p className="text-[#808086] mb-4">Sign in to join the discussion</p>
            <LoginButton mode="modal"/>
          </div>
        }

        <div className="space-y-6">
        {
          comments.map((comment) => (
            <Comment key={comment._id} comment={comment} onDelete={handleDeleteComment}
            isDeleting={deletingCommentId === comment._id} currentUserId={user?.id || ""} />
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default Comments