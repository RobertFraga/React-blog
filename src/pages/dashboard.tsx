import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import type { Post } from "../post";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { session } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Error fetching user:", userError);
        return;
      }

      const { data, error } = await supabase
        .from("post")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data as Post[]);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id: string) => {
    const { error } = await supabase.from("post").delete().eq("id", id);
    if (error) {
      console.error("Error deleting post:", error);
    } else {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 md:w-1/3">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <div className="p-6">
                    {session && session.user && (
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        Posted by: {session.user.email}
                      </h2>
                    )}

                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {post.title}
                    </h1>

                    <p className="leading-relaxed mb-3">{post.body}</p>
                    <div className="flex items-center flex-wrap ">
                      <a
                        className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/edit/${post.id}`);
                        }}
                      >
                        Edit
                      </a>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-red-500 hover:text-red-700 ml-4"
                      >
                        Delete
                      </button>
                      <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </span>
                      <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
