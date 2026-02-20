import { getFacebookPosts, FBPost } from '../lib/facebook';

export default async function FacebookFeed() {
  const posts = await getFacebookPosts();

  if (posts.length === 0) return <p>No recent updates.</p>;

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-4 shadow-sm bg-white">
          <p className="text-sm text-gray-500 mb-2">
            {new Date(post.created_time).toLocaleDateString()}
          </p>
          
          {post.message && (
            <p className="text-gray-800 mb-4 whitespace-pre-wrap">{post.message}</p>
          )}

          {post.full_picture && (
            <img 
              src={post.full_picture} 
              alt="Facebook post content" 
              className="rounded-md w-full h-auto mb-4"
            />
          )}

          <a 
            href={post.permalink_url} 
            target="_blank" 
            className="text-blue-600 font-medium hover:underline text-sm"
          >
            View on Facebook →
          </a>
        </div>
      ))}
    </div>
  );
}