import { useState, useEffect } from "react";
import axios from "axios";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [source, setSource] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const getMyResources = async () => {
      try {
        const res = await axios.get(`/api/data/resource/${id}`);
        setResources(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMyResources();
  }, []);

  const deleteResource = async (id) => {
    try {
      await axios.delete(`/api/data/resource/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const editResource = async () => {
    try {
      const res = await axios.put(`/api/data/resource/${resourceId}`, {
        title,
        source,
        description,
      });
      setTitle(res.data.title);
      setSource(res.data.source);
      setDescription(res.data.description);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editResource();
  };

  const mappedResources = resources.map((resource) => {
    return (
      <>
        {edit ? (
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              Source:
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        ) : (
          <div key={resource.id}>
            <ul>
              <li>{resource.title}</li>
              <li>{resource.source}</li>
              <li>{resource.description}</li>
            </ul>
          </div>
        )}
        )
      </>
    );
  });

  return <div>{mappedResources}</div>;
};

export default Resources;
