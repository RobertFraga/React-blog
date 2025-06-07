import { Link } from "react-router-dom";
import { supabase } from "../supabase-client";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { session } = useContext(AuthContext);

  return (
    <>
      <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
        <div className="flex flex-wrap items-center justify-between gap-5 w-full">
          <h1 className="text-slate-900 text-center text-3xl font-semibold">
            Dashboard
          </h1>
          <div className="flex max-lg:ml-auto space-x-4">
            {session && session.user && (
              <button className="font-medium text-[15px] border-0 outline-0 cursor-pointer text-blue-600 dark:text-sky-400">
                {session.user.email}
              </button>
            )}
            <Link to="/create-post">
              <button className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-slate-900 border border-gray-400 bg-transparent hover:bg-gray-50 transition-all">
                Post
              </button>
            </Link>
            <button
              className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all"
              onClick={() => supabase.auth.signOut()}
            >
              Log Out
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
