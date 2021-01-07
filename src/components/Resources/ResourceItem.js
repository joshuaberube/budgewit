import { useState } from "react";
import axios from "axios";
export default function ({ resource }) {
  const [edit, setEdit] = useState(false);
  const [resourceState, setResourceState] = useState({
    title: resource.resource_title,
    description: resource.resource_desc,
    source: resource.resource_link,
    category: resource.resource_category,
  });

  const handleButton = (e) => {
    e.preventDefault();
    editResource();
    setEdit(false);
  };

  const deleteResource = async () => {
    try {
      await axios.delete(`/api/data/resources/${resource.resource_id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const editResource = async () => {
    try {
      const res = await axios.put(
        `/api/data/resources/${resource.resource_id}`,
        {
          resource_title: resourceState.title,
          resource_desc: resourceState.description,
          resource_link: resourceState.source,
          resource_category: resourceState.category,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {edit ? (
        <div className="w-768 bg-gray-300 rounded-10 flex flex-col shadow-2xl font-proxima-nova">
          <form className="flex flex-row border-t border-gray-400 pt-16 mt-2">
            <label>
              Title:
              <input
                type="text"
                className="rounded-5 mb-16 h-40 w-256 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
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
                className="rounded-5 mb-16 h-40 w-256 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
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
                className="rounded-5 mb-16 h-40 w-256 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
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
                className="rounded-5 mb-16 h-40 w-256 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
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
              Submit Changes
            </button>
          </form>
        </div>
      ) : (
        <li>
          <span>{resourceState.title}</span>
          <span>{resourceState.description}</span>
          <span>{resourceState.source}</span>
          <span>{resourceState.category}</span>

          <button
            className="py-8 px-12 rounded-10 bg-green-400 text-gray-50 cursor-pointer"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
          <button
            className="py-8 px-12 rounded-10 bg-green-400 text-gray-50 cursor-pointer"
            onClick={(e) => deleteResource()}
          >
            Delete
          </button>
        </li>
      )}
    </>
  );
}
