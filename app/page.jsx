import Link from "next/link";
import Image from "next/image";

async function getPosts() {
  const query = `
  {
    posts(first: 3) {
      nodes {
        title
        excerpt
        uri
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
  `;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
      query
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // ... any other headers you need to include (like authentication tokens)
      },
      // cache: "no-store",
    }
  );

  const { data } = await res.json();

  return data.posts.nodes;
}

export default async function PostList() {
  const posts = await getPosts();

  return (
      <div className="postGrid">
        {posts.map((post) => (
          <div key={post.uri} className="card">
            <Link href={`/post/${post.uri}`}>
              <h3>{post.title}</h3>
            </Link>
            {/* <img className="featuredImage" src={post.featuredImage?.node.sourceUrl}></img> */}
            <Image className="featuredImage" src={post.featuredImage?.node.sourceUrl} alt={post.featuredImage?.node.altText} width="200" height="200"></Image>
          </div>
        ))}
      </div>
  );
}