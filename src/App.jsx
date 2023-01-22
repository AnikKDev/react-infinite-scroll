import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const getPosts = async () => {
    const { data } = await axios("https://jsonplaceholder.typicode.com/posts", {
      params: { _limit: 9, _page: page },
    });
    setPosts((prevPost) => [...prevPost, ...data]);
    setIsLoading(false);
  };
  useEffect(() => {
    getPosts();
  }, [page]);

  const handleInfiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (posts.length !== 100) {
        setIsLoading(true);
        setPage((prevState) => prevState + 1);
        // setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);

    // cleanup function
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);
  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <div style={{ border: "2px solid red", margin: "2px" }}>
          <h1>{post.title}</h1>
          <h6>{post.id}</h6>
          <h6>{post.title}</h6>
          <h6>{post.title}</h6>
        </div>
      ))}
      {isLoading && <h1>Loading...</h1>}
    </div>
  );
}

export default App;
