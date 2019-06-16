import {isMegaQuestion, MegaQuestion, QuestionKind} from "../shared/Question";

export class QuizQuestions {

    public static generateKeys(questions: QuestionKind[]): QuestionKind[] {
        let questionId = 0;
        questions.forEach(question => {
            if (isMegaQuestion(question)) {
                let megaQuestion = question as MegaQuestion;
                megaQuestion.questions.forEach(subQuestion => {
                    subQuestion.key = "" +questionId;
                    questionId++;

                    let j = 0;
                    subQuestion.choices.forEach(choice => {
                        choice.id = "" + j;
                        j++;
                    });
                });
            } else {
                question.key = ""+questionId;
                questionId++;

                let choiceId = 0;
                question.choices.forEach(choice => {
                    choice.id = "" + choiceId;
                    choiceId++;
                });
            }
        });
        return questions;
    }
}
