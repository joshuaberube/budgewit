import { useState, useEffect } from "react";
import axios from "axios";
import ResourceItem from "./ResourceItem";
import AddResource from "./AddResource";
const Resources = () => {
  const [resources, setResources] = useState([]);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const getMyResources = async () => {
      try {
        const res = await axios.get(`/api/data/resources`);
        setResources(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMyResources();
  }, [resources, toggle]);

  return (
    <>
      <div className="w-768 bg-gray-300 p-12 rounded-10">
      <ul className="bg-gray-50 rounded-10">
        {resources !== [] &&
          resources.map((resource) => (
            <ResourceItem key={resource.resource_link_id} resource={resource} />
          ))}
      </ul>
      </div>
      {toggle ? null : (
        <input
          className="py-8 px-12 rounded-10 bg-green-400 text-gray-50 cursor-pointer"
          type="button"
          onClick={() => setToggle(true)}
          value="Add a new link!"
        />
      )}
      {toggle ? <AddResource setToggle={setToggle} /> : null}
    </>
  );
};

export default Resources;
