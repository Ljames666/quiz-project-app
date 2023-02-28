import { useContext } from 'react';
import { QuizContext } from '../../context/quiz';
import './Option.css';

function Option({ option, selectOption, answer, hide }: any) {
    // @ts-ignore
    const [quizState, dispatch] = useContext(QuizContext);

    return (
        <div
            onClick={() => selectOption()}
            className={`
        option
          ${quizState.answerSelected && option === answer ? 'correct' : ''} ${
                quizState.answerSelected && option !== answer ? 'wrong' : ''
            }
          ${hide ? 'hide' : ''}
          `}
        >
            <p>{option}</p>
        </div>
    );
}

export default Option;
