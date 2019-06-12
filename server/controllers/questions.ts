import {MegaQuestion, QuestionKind, SingleQuestion} from "../shared/Question";

let gotQuestion: MegaQuestion = {
    questions: [
        {
            label: "Quel personnage de Game of thrones serait  serait Paul ?",
            choices: [
                {
                    id: "js",
                    label: "John Snow",
                    imageUrl: "images/JohnSnow_low.jpg"
                },
                {
                    id: "tl",
                    label: "Tyrion Lannister",
                    imageUrl: "images/TyrionLannister_low.jpg"
                }
            ],
            key: "gotpaul"
        },
        {
            label: "Quel personnage de Game of thrones serait  serait Pauline ?",
            choices: [
                {
                    id: "dt",
                    label: "Daenerys Targaryen",
                    imageUrl: "images/DaenerysTargaryen_low.png"
                },
                {
                    id: "as",
                    label: "Arya Stark",
                    imageUrl: "images/AryaStark_low.png"
                }
            ],
            key: "gotpauline"
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
            imageUrl: "images/karadoc_low.jpg"
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
    resultAnimation: "top3",
    key: "platpaul"
};

export let questions: QuestionKind[] = [
    gotQuestion,
    paulWasAMeal
];
