import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase-client";
import type { Post } from "../post";

const Editpost = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("post")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) {
        setError("Failed to fetch post");
        setLoading(false);
        return;
      }

      setPost(data);
      setTitle(data.title);
      setBody(data.body);
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId) return;

    const { error } = await supabase
      .from("post")
      .update({ title, body })
      .eq("id", postId);

    if (error) {
      setError("Failed to update post");
    } else {
      navigate("/dashboard");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <>
      <div className="flex flex-col justify-center sm:h-screen p-4">
        <div className="max-w-md w-full mx-auto border border-slate-300 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">
              Edit Post
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">
                  Title
                </label>
                <input
                  type="text"
                  className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="ex: outside"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">
                  Body
                </label>
                <textarea
                  placeholder="What's your thought?"
                  className="p-4 bg-white max-w-md mx-auto w-full block text-sm border border-gray-300 outline-[#007bff] rounded"
                  rows={4}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Editpost;
