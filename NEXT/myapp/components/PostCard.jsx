"use client"

//posterior
import Link from 'next/link'

/* React Client Component (after Link) */
async function PostCard({ post }) {

    return (
        <div className="bg-gray-950 p-10">
            {
                <div>
                    <Link href={`/posts/${post.id}`}>
                        <h3 className='text-xl font-bold mb-4'>{post.id}. {post.title}</h3>
                    </Link>
                    <p className='text-slate-300'>{post.body}</p>
                    <button onClick={() => {
                        alert('Click ok!')
                    }}>
                        Click
                    </button>
                </div>
            }
        </div>
    )

}

export default PostCard