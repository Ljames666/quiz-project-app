import { createContext, useReducer } from 'react';
// import { IQuestions } from "../data/questions";
import { IQComplete } from '../data/questions_complete';
import questions from '../data/questions_complete';

interface IQuizState {
    gameStage: string;
    questions: IQComplete[];
    currentQuestion: number;
    answerSelected: boolean;
    score: number;
    help: boolean;
    optionToHide: any;
}

const STAGES = ['Start', 'Category', 'Playing', 'End'];

const initialState: IQuizState = {
    gameStage: STAGES[0],
    questions,
    currentQuestion: 0,
    answerSelected: false,
    score: 0,
    help: false,
    optionToHide: null,
};

console.log(initialState);

const quizReducer = (
    state: {
        questions: any[];
        currentQuestion: number;
        gameStage: any;
        answerSelected: any;
        score: number;
    },
    action: { type: any; payload: { answer: any; option: any } }
) => {
    switch (action.type) {
        case 'CHANGE_STAGE':
            return {
                ...state,
                gameStage: STAGES[1],
            };

        case 'START_GAME':
            let quizQuestions = null;

            state.questions.forEach((question) => {
                if (question.category === action.payload) {
                    quizQuestions = question.questions;
                }
            });

            return {
                ...state,
                questions: quizQuestions,
                gameStage: STAGES[2],
            };

        case 'REORDER_QUESTIONS':
            const reorderedQuestions = state.questions.sort(() => {
                return Math.random() - 0.5;
            });

            return {
                ...state,
                questions: reorderedQuestions,
            };

        case 'CHANGE_QUESTION': {
            const nextQuestion = state.currentQuestion + 1;
            let endGame = false;

            if (!state.questions[nextQuestion]) {
                endGame = true;
            }

            return {
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endGame ? STAGES[3] : state.gameStage,
                answerSelected: false,
                help: false,
            };
        }

        case 'NEW_GAME': {
            console.log(questions);
            console.log(initialState);
            return initialState;
        }

        case 'CHECK_ANSWER': {
            if (state.answerSelected) return state;

            const answer = action.payload.answer;
            const option = action.payload.option;
            let correctAnswer = 0;

            if (answer === option) correctAnswer = 1;

            return {
                ...state,
                score: state.score + correctAnswer,
                answerSelected: option,
            };
        }

        case 'SHOW_TIP': {
            return {
                ...state,
                help: 'tip',
            };
        }

        case 'REMOVE_OPTION': {
            const questionWithoutOption = state.questions[state.currentQuestion];

            console.log(state.currentQuestion);

            console.log(questionWithoutOption);

            let repeat = true;
            let optionToHide;

            questionWithoutOption.options.forEach((option: any) => {
                if (option !== questionWithoutOption.answer && repeat) {
                    optionToHide = option;
                    repeat = false;
                }
            });

            return {
                ...state,
                optionToHide,
                help: true,
            };
        }

        default:
            return state;
    }
};

export const QuizContext = createContext(null);

export const QuizProvider = ({ children }: { children: JSX.Element }) => {
    // @ts-ignore
    const value = useReducer(quizReducer, initialState);
    // @ts-ignore
    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
