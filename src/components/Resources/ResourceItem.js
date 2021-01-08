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
        <div className="w-768 bg-gray-300 rounded-10 flex flex-col shadow-2xl">
          <form className="flex flex-col border-gray-400 pt-16 mt-2 mx-auto">
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

            <button
              className="py-8 px-12 rounded-10 bg-green-400 text-gray-50 cursor-pointer mx-auto"
              type="submit"
              name="submitbutton"
              onClick={handleButton}
            >
              Submit Changes
            </button>
          </form>
        </div>
      ) : (
        <li className="w-768 flex flex-col justify-between items-center py-8 px-32 mx-8 transform">
          <a
            href={resourceState.source}
            target="_blank"
            className=" text-xl hover:underline"
          >
            {resourceState.title}
          </a>
          <p>{resourceState.description}</p>
          <span className="text-sm text-gray-400">
            Category: {resourceState.category}
          </span>
          <div className="flex flex-row ">
            <button
              className="py-8 h-40 mx-4 w-128 px-12 rounded-10 bg-gray-400 text-gray-50 cursor-pointer text-center"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
            <button
              className="py-8 h-40 mx-4 w-128 px-12 rounded-10 bg-red-400 text-gray-50 cursor-pointer text-center"
              onClick={(e) => deleteResource()}
            >
              Delete
            </button>
          </div>
        </li>
      )}
    </>
  );
}
