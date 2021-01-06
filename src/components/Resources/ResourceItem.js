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

  const deleteResource = async (resource_link_id) => {
    try {
      await axios.delete(`/api/data/resource_links/${resource_link_id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const editResource = async (resource_link_id) => {
    try {
      const res = await axios.put(
        `/api/data/resource_links/${resource_link_id}`,
        {
          resource_title: resourceState.title,
          resource_desc: resourceState.description,
          resource_link: resourceState.source,
          resource_category: resourceState.category
        }
      );

      setResourceState({
        title: res.data.resource_title,
        description: res.data.resource_desc,
        source: res.data.resource_link,
        category: res.data.resource_category,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {edit ? (
        <>
          <form>
            <label>
              Title:
              <input
                type="text"
                value={resourceState.title}
                onChange={(e) => {
                  const state = resourceState
                  setResourceState({
                    ...state,
                    title: e.target.value,
                  })
                }}
              />
            </label>
            <label>
              Source:
              <input
                type="text"
                value={resourceState.source}
                onChange={(e) => {
                  const state = resourceState
                  setResourceState({
                    ...state,
                    source: e.target.value,
                  })
                }}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={resourceState.description}
                onChange={(e) => {
                  const state = resourceState
                  setResourceState({
                    ...state,
                    description: e.target.value,
                  })
                }}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                value={resourceState.category}
                onChange={(e) => {
                  const state = resourceState
                  setResourceState({
                    ...state,
                    category: e.target.value,
                  })
                }}
              />
            </label>
            <button
              type="submit"
              name="submitbutton"
              onClick={handleButton}
            >Submit Changes</button>
          </form>
        </>
      ) : (
        <div key={resource.resource_link_id}>
          <ul>
            <li>{resourceState.title}</li>
            <li>{resourceState.description}</li>
            <li>{resourceState.source}</li>
            <li>{resourceState.category}</li>
          </ul>
          <button onClick={() => setEdit(true)}>Edit</button>
          <button onClick={(e) => deleteResource(e.target.value)}>Delete</button>
        </div>
      )}
      </>
  );
}
