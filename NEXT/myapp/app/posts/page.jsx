//Desde import alias
import PostCard from '../../components/PostCard'

//Desde CSS
import './Posts.css'

async function loadPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();

    /* Fuerzo para que tarde 3 segundos, solo para probar el "Loading..." */
    //await new Promise((resolve) => setTimeout(resolve, 3000))

    return data;
}

//renderiza
async function PostPages() {

    const posts = await loadPosts()

    return (
        <div className='grid'>
            {
                posts.map(post => (
                    <PostCard post={post} key={post.id} />
                ))
            }
        </div>
    )

}

export default PostPages