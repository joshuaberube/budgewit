import { useState, useEffect} from 'react';
import axios from 'axios';


const Resources = () => {
    const [resources, setResources] = useState([]);
    const [source, setSource] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [Edit, setEdit] = useState(false);

    useEffect(() => {
        const getMyResources = async () => {
            try {
                const res = await axios.get('/api/data/resource');
                setResources(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getMyResources();
    }, []);

    const deleteResource = async (id) => {
        try {
            await axios.delete(`/api/data/resource/${id}`);
        } catch (err) {
            console.log(err);
        };
    };
    const editResource = async () => {
        try {
            const res = await axios.put(`/api/resource/${resourceId}`, { title, sourceLink, description });
            setTitle(res.data.title);
            setSource(res.data.sourceLink)
            setContent(res.data.description);
            setEdit(false);
        } catch (err) {
            console.log(err)
        }
    };
    const mappedResources = resources.map((resource) => {
        return (
            <div key={resource.id}>
                <ul>
                    <li>{resource.title}</li>
                    <li>{resource.sourceLink}</li>
                    <li>{resource.description}</li>
                </ul>
            </div>
        )
    })

    return (
        <div>
            {mappedResources}
        </div>
    );
}

export default Resources;