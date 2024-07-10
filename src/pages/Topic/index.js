import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { getListTopics } from "../../services/topicService";

function Topic() {

  const [topics, setTopics] = useState([]);

  useEffect(()=>{
    const fetchApi = async () => {
      const res = await getListTopics();
      setTopics(res);
    }
    fetchApi();
  },[])

  console.log(topics);

    return (<>
      <h2>Danh sách các chủ đề</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên chủ đề</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {topics.map(item => (
            <tr key={item.key}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <Link to={"/quiz/" + item.id}>Làm bài</Link>
          </tr>
          ))}
        </tbody>
      </table>
    </>)
}

export default Topic;