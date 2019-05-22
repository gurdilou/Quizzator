import {MegaQuestion, QuestionKind, SingleQuestion} from "../shared/Question";

let gotQuestion: MegaQuestion = {
    questions: [
        {
            label: "Quel personnage de Game of thrones serait  serait Paul ?",
            choices: [
                {
                    id: "js",
                    label: "John snow",
                    imageUrl: "images/JohnSnow.jpg"
                },
                {
                    id: "tl",
                    label: "Tyrion Lannister",
                    imageUrl: "images/TyrionLannister.jpg"
                }
            ]
        },
        {
            label: "Quel personnage de Game of thrones serait  serait Pauline ?",
            choices: [
                {
                    id: "dt",
                    label: "Daenerys Targaryen",
                    imageUrl: "images/DaenerysTargaryen.png"
                },
                {
                    id: "as",
                    label: "Arya Stark",
                    imageUrl: "images/AryaStark.png"
                }
            ]
        }
    ],
    resultAnimation: "couple"
};

let paulWasAMeal: SingleQuestion = {
    label: "Si paul était un plat",
    choices: [
        {
            id: "01",
            label: "Fromage saucisson, même au lit",
            imageUrl: "images/karadoc.jpg"
        },
        {
            id: "02",
            label: "Un truc simple, seulement 2h de cuisson."
        },
        {
            id: "03",
            label: "Tant qu'il y a du fromage ça me va."
        }
    ],
    resultAnimation: "top3"
};

export let questions: QuestionKind[] = [
    gotQuestion,
    paulWasAMeal
];
