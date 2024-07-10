import { useEffect, useState } from "react";
import { getAnswersByUserId } from "../../services/answersService";
import { getListTopics } from "../../services/topicService";
import { Link } from "react-router-dom";

function Answers() {
  const [dataAnswes, setDataAnswers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const answersByUserId = await getAnswersByUserId();
      const topics = await getListTopics();

      let result = [];

      for(let i = 0; i < answersByUserId.length; i++) {
        result.push({
          ...topics.find(item => item.id === answersByUserId[i].topicId),
          ...answersByUserId[i]
        });
      }

      setDataAnswers(result.reverse());

    }
    fetchApi();
  },[])


  return (<>
    <h2>Danh sách bài đã luyện tập</h2>

    {dataAnswes.length > 0 && (
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên chủ đề</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {dataAnswes.map(item => (
          <tr key={item.key}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <Link to={"/result/" + item.id}>Xem chi tiết</Link>
          </tr>
        ))}
      </tbody>
    </table>)}
  </>)
}

export default Answers;