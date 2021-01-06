import { useState, useEffect } from "react";
import axios from "axios";
import ResourceItem from "./ResourceItem";
const Resources = () => {
  const [resources, setResources] = useState([]);
  useEffect(() => {
    const getMyResources = async () => {
      try {
        const res = await axios.get(`/api/data/resource_links`);
        setResources(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMyResources();
  }, []);

  return (
    <div>
      { (resources !== []) &&
        resources.map((resource) => <ResourceItem key={resource.resource_link_id} resource={resource} />)}
    </div>
  );
};

export default Resources;
