import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionsService";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/quizService";

function Quiz() {
  const [dataTopic, setDataTopic] = useState([]);
  const [dataQuestion, setDataQuestion] = useState([]);
  const navigagte = useNavigate();

  const params = useParams();

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getTopic(params.id);
      setDataTopic(res);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getListQuestion(params.id);
      setDataQuestion(res);
    };
    fetchApi();
  }, []);

  console.log(dataQuestion);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let selectedAnswers = [];

    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;

        selectedAnswers.push({ 
           questionId: parseInt(name),
           answer: parseInt(value) 
        });
      }
    }

    let options = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(params.id),
      answers: selectedAnswers,
    }

    const res = await createAnswer(options);

    if(res) {
      navigagte(`/result/${res.id}`);
    }
  };

  return (
    <>
      <h2>Bài Quiz chủ đề: {dataTopic && <>{dataTopic.name}</>}</h2>

      <div className="form-quiz">
        <form onSubmit={handleSubmit}>
          {dataQuestion.map((item, index) => (
            <div className="form-quiz__item" key={item.id}>
              <p>
                Câu {index + 1}: {item.question}
              </p>
              {item.answer.map((itemAnswer, indexAnswer) => (
                <div className="form-quiz__answer" key={indexAnswer}>
                  <input
                    type="radio"
                    name={item.id}
                    value={indexAnswer}
                    id={`quiz-${item.id}-${indexAnswer}`}
                  />
                  <label for={`quiz-${item.id}-${indexAnswer}`}>
                    {itemAnswer}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Nộp bài</button>
        </form>
      </div>
    </>
  );
}

export default Quiz;
