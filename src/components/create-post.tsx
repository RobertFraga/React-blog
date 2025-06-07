import { useState, useEffect } from "react";
import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom"; // <-- React Router navigate

const Createpost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate(); // <-- React Router hook

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        setMessage("Error fetching user.");
      } else if (user) {
        setUserId(user.id);
      }
    };

    getUser();
  }, []);

  const handleSubmit = async () => {
    if (!title || !body) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (!userId) {
      setMessage("User not authenticated.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("post").insert([
      {
        title,
        body,
        user_id: userId,
      },
    ]);

    setLoading(false);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      navigate("/dashboard"); // <-- redirect with React Router
    }
  };

  return (
    <div className="flex flex-col justify-center sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto border border-slate-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <h1 className="text-slate-900 text-center text-3xl font-semibold">
            Create Post
          </h1>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
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
              />
            </div>
            <div>
              <textarea
                placeholder="What's your thought?"
                className="p-4 bg-white max-w-md mx-auto w-full block text-sm border border-gray-300 outline-[#007bff] rounded"
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>

          {message && (
            <p className="mt-4 text-center text-sm text-red-600">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Createpost;
