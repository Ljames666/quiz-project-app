// @ts-nocheck
import { useContext } from 'react';
import './App.css';
import Wellcome from './components/wellcome/Wellcome';
import { QuizContext } from './context/quiz';
import PickCategory from './components/pick-category/PickCategory';
import Question from './components/questions/Question';
import GameOver from './components/game-over/GameOver';

function App() {
    const [quizState, dispatch] = useContext(QuizContext);
    return (
        <div className='App'>
            <h1>Code Quiz</h1>
            {quizState.gameStage === 'Start' && <Wellcome />}
            {quizState.gameStage === 'Category' && <PickCategory />}
            {quizState.gameStage === 'Playing' && <Question />}
            {quizState.gameStage === 'End' && <GameOver />}
        </div>
    );
}

export default App;
