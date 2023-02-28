import { QuizContext } from '../../context/quiz';
import './PickCategory.css';
import { useContext } from 'react';
import Category from '../../img/category.svg';

function PickCategory() {
    // @ts-ignore
    const [quizState, dispatch] = useContext(QuizContext);

    const chooseCategoryAndReorderQuestions = (category: any) => {
        dispatch({ type: 'START_GAME', payload: category });

        dispatch({ type: 'REORDER_QUESTIONS' });
    };

    return (
        <div id='category'>
            <h2>Escolha uma categoria</h2>
            <p>As perguntas serão referentes a uma das linguagens abaixo:</p>
            {quizState.questions.map((question: { category: any }) => (
                <button
                    onClick={() => chooseCategoryAndReorderQuestions(question.category)}
                    key={question.category}
                >
                    {question.category}
                </button>
            ))}

            <img src={Category} alt='Categoria do Quiz' />
        </div>
    );
}
export default PickCategory;
