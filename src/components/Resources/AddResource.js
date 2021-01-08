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
    <form className = "flex flex-col" ref={ref}>
      <label>
        Title:
        <input
          type="text"
          value={resourceState.title}
          onChange={(e) => {
            const state = resourceState;
            setResourceState({
              ...state,
              title: e.target.value,
            });
          }}
        />
      </label>
      <label>
        Source:
        <input
          type="text"
          value={resourceState.source}
          onChange={(e) => {
            const state = resourceState;
            setResourceState({
              ...state,
              source: e.target.value,
            });
          }}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={resourceState.description}
          onChange={(e) => {
            const state = resourceState;
            setResourceState({
              ...state,
              description: e.target.value,
            });
          }}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          value={resourceState.category}
          onChange={(e) => {
            const state = resourceState;
            setResourceState({
              ...state,
              category: e.target.value,
            });
          }}
        />
      </label>
      <button
        className="py-8 px-12 rounded-10 bg-green-400 text-gray-50 cursor-pointer"
        type="submit"
        name="submitbutton"
        onClick={handleButton}
      >
        Add a Link
      </button>
    </form>
  );
};
export default AddResources;
