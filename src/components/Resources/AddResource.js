import { useState, useRef, useEffect } from "react";
import axios from "axios";

const AddResources = ({ setToggle }) => {
  const [resourceState, setResourceState] = useState({
    title: "",
    description: "",
    source: "",
    category: "",
  });
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, setToggle]);

  const handleButton = (e) => {
    e.preventDefault();
    try {
      let response = axios.post("/api/data/resources", {
        resource_title: resourceState.title,
        resource_desc: resourceState.description,
        resource_link: resourceState.source,
        resource_category: resourceState.category,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setToggle(false);
  };

  return (
    <div className="w-768 bg-gray-300  rounded-10 flex flex-row mx-auto shadow-2xl">
      <form className="flex flex-col border-gray-400 pt-16 mt-2 mx-auto" ref={ref}>
        <input
          type="text"
          className="rounded-5 mb-16 h-40 w-256 p-12 placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
          value={resourceState.title}
          placeholder="Title"
          onChange={(e) => {
            const state = resourceState;
            setResourceState({
              ...state,
              title: e.target.value,
            });
          }}
        />
        <input
          type="text"
          className="rounded-5 mb-16 h-40 w-256 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
          value={resourceState.source}
          placeholder="Source"
          onChange={(e) => {
            const state = resourceState;
            setResourceState({
              ...state,
              source: e.target.value,
            });
          }}
        />
        <input
          type="text"
          className="rounded-5 mb-16 h-40 w-256 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
          value={resourceState.description}
          placeholder="Description"
          onChange={(e) => {
            const state = resourceState;
            setResourceState({
              ...state,
              description: e.target.value,
            });
          }}
        />
        <input
          type="text"
          className="rounded-5 mb-16 h-40 w-256 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
          value={resourceState.category}
          placeholder="Category"
          onChange={(e) => {
            const state = resourceState;
            setResourceState({
              ...state,
              category: e.target.value,
            });
          }}
        />
        <button
          className="py-8 px-12 rounded-10 bg-green-400 text-gray-50 cursor-pointer"
          type="submit"
          name="submitbutton"
          onClick={handleButton}
        >
          Add a Link
        </button>
      </form>
    </div>
  );
};
export default AddResources;
