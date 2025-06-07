import { Link } from "react-router-dom";
import ListPost from "./pages/list-post";
function App() {
  return (
    <>
      <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
        <div className="flex flex-wrap items-center justify-between gap-5 w-full">
          <h1 className="text-slate-900 text-center text-3xl font-semibold">
            Blog-post
          </h1>
          <div className="flex max-lg:ml-auto space-x-4">
            <Link to="../sign-in">
              <button className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </header>

      <ListPost />
    </>
  );
}

export default App;
