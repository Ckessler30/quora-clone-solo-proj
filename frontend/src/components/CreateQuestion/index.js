import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewQuestion } from "../../store/questions";

import './newQuestion.css'

const CreateQuestionForm = ({ hideForm }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState('')
    const [questionText, setQuestionText] = useState('')
    const [questionImg, setQuestionImg] = useState("");
    const [errors, setErrors] = useState([]);
    // console.log(sessionUser)

    const handleErrors = async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        if(questionImg === ""){
          console.log('hit here')
          setQuestionImg(
            "https://cdn.vox-cdn.com/thumbor/HWPOwK-35K4Zkh3_t5Djz8od-jE=/0x86:1192x710/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg"
          );
        }
        const questionDetails = {
            userId: sessionUser.id,
            title,
            questionText,
            questionImg
        }

        // console.log(questionDetails)
        try{
          const createdQuestion = await dispatch(createNewQuestion(questionDetails))
          if(createdQuestion){
              //need to update this before final
              history.push('/')
              hideForm()
          }
        }catch(res){
          handleErrors(res)
        }
    }
        const handleCancelClick = (e) => {
            e.preventDefault()
            hideForm()
        }

        return hideForm ? (
          <div className="createNewQuestion">
            <div className="createNewQuestionInner">
              <form onSubmit={handleSubmit} className="createQuestionInputs">
                <div className="createQuestionProfileHead">
                  <i className="far fa-smile"></i>

                  <p>{sessionUser?.username} asked</p>
                  <button type="button" className="publicButton">
                    <i className="fas fa-user-friends"></i>
                    Public
                  </button>
                </div>
                {errors.length > 0 && (
                  <ul className="commentErrors">
                    {errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                )}
                <input
                  type="text"
                  placeholder='Start your question with "What", "How", "Why", etc.'
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Question info?"
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Attach an image? (paste image url here)"
                  value={questionImg}
                  onChange={(e) => setQuestionImg(e.target.value)}
                />
                <div className="createQuestionButtons">
                  <button
                    className="cancelQuestionButton"
                    type="button"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                  <button className="submitQuestionButton" type="submit">
                    Add question
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        );
    }


export default CreateQuestionForm