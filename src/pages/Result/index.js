import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnswer } from "../../services/answersService";
import { getListQuestion } from "../../services/questionsService";
import "./result.scss";

function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswer = await getAnswer(params.id);
      const dataQuestion = await getListQuestion(dataAnswer.topicId);

      let resultFinal = [];

      for (let i = 0; i < dataQuestion.length; i++) {
        resultFinal.push({
          ...dataQuestion[i],
          ...dataAnswer.answers.find(
            (item) => item.questionId === dataQuestion[i].id
          ),
        });
      }

      console.log(resultFinal);

      setDataResult(resultFinal);
    };
    fetchApi();
  }, []);

  return (
    <>
      <h1>Kết quả:</h1>
      <div className="result__list">
        {dataResult.map((item, index) => (
          <div className="result__item" key={item.id}>
            <p>
              Câu {index + 1}: {item.question}
              {item.correctAnswer === item.answer ? (
                <span className="result__tag result__tag--true">Đúng</span>
              ) : (
                <span className="result__tag result__tag--false">Sai</span>
              )}
            </p>
            {item.answers.map((itemAnswer, indexAnswer) => {

              let checked = false;
              let className = "";

              if(item.answer === indexAnswer) {
                checked = true;
                className = "result__item--selected";
              }

              if(item.correctAnswer === indexAnswer) {
                className += " result__item--correct";
              }

              return (
                <div className="result__answer" key={indexAnswer}>
                  <input type="radio" checked={checked} disabled/>
                  <label className={className}>{itemAnswer}</label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export default Result;
