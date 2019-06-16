import {MegaQuestion, QuestionKind, SingleQuestion} from "../shared/Question";

let painChocoQuestion: SingleQuestion = {
    choices: [
        {
            label: "Pain au chocolat",
            imageUrl: "images/choco-low-left.png"
        },
        {
            label: "Chocolatine",
            imageUrl: "images/choco-low-right.png"
        }
    ],
    label: "Pain au chocolat ou chocolatine ?",
    resultAnimation: "top3"
};

let gotQuestion: MegaQuestion = {
    questions: [
        {
            label: "Quel personnage de Game of thrones serait Paul ? ...",
            choices: [
                {
                    label: "Samwell Tarly, l'érudit innocent",
                    imageUrl: "images/Samwell_low.jpg"
                },
                {
                    label: "John Snow, le leader ténébreux malgré lui",
                    imageUrl: "images/JohnSnow_low.jpg"
                },
                {
                    label: "Tyrion Lannister, le conseiller PMU",
                    imageUrl: "images/TyrionLannister_low.jpg"
                },
                // {
                //   label: "Petyr Baelish, le roublard pas si malin"
                // },
                {
                    label: "Ned Stark, le bon père de famille avec la tête sur les épaules",
                    imageUrl: "images/Ned_low.jpg"
                },
                {
                    label: "Jaime Lannister, le beau gosse à la poigne d'acier",
                    imageUrl: "images/Jaime_low.jpg"
                }

            ],
        },
        {
            label: "... Et quel personnage de Game of thrones serait Pauline ?",
            choices: [
                {
                    label: "Sansa Stark, la rose qui a dévoilé ses épines",
                    // label: "Sansa Stark, la princesse à l'école Disney à l'école de la vie",
                    imageUrl: "images/Sansa_low.jpg"
                },
                {
                    label: "Lyanna Mormont, petite mais costaud",
                    imageUrl: "images/Lyanna_low"
                },
                {
                    label: "Daenerys Targaryen, la reine des grillades",
                    imageUrl: "images/Dany_low.png"
                },
                {
                    label: "Arya Stark, la mini-ninja",
                    imageUrl: "images/AryaStark_low.png"
                },
                {
                    label: "Cersei Lannister, la mère-femme active",
                    imageUrl: "images/Cersei_low.jpg"
                }
            ],
        }
    ],
    resultAnimation: "couple-heart"
};

let paulWasAMeal: SingleQuestion = {
    label: "Paul en cuisine, ce serait plutôt ?",
    choices: [
        {
            label: "Fromage saucisson, même au lit",
            imageUrl: "images/karadoc_low.jpg"
        },
        {
            label: "Un truc simple, seulement 2h de cuisson."
        },
        {
            label: "Quiche aux restes"
        },
        {
            label: "C'est une recette de BBC good food",
            imageUrl: "images/BBC_low.png"
        },
        {
            label: "Attends je rajoute un peu d'épices"
        }
    ],
    resultAnimation: "top3",
};
let paulineWasFabric: SingleQuestion = {
    label: "Si Pauline était un tissu ?",
    choices: [
        {
            label: "De la popeline, brillante et il est agréable de travailler avec",
            imageUrl: "images/popeline_low.jpg"
        },
        {
            label: "Du jersey de coton, souple et multi-fonction",
            imageUrl: "images/jersey_low.jpg"
        },
        {
            label: "De la flanelle, douce, les mamans et les enfants l'adorent",
            imageUrl: "images/flanelle_low.jpg"
        }
    ],
    resultAnimation: "top3"
};
let monuments: MegaQuestion = {
    questions: [
        {
            label: "Si Pauline était un monument ? ...",
            choices: [
                {
                    label: "La statue de la Liberté, une grande dame porteuse de valeurs (existe aussi en petit format)"
                },
                {
                    label: "Les jardins de Versailles, beaux et raffinés"
                },
                {
                    label: "La sagrada familia, une fashionista qui sait se faire attendre"
                }
            ]
        },
        {
            label: "...Et quel monument serait Paul ?",
            choices: [
                {
                    label: "La tour Eiffel, une grande tige universellement aimée"
                },
                {
                    label: "Les grottes de Lascaux, pleines d'intérêts et mystères"
                },
                {
                    label: "Le Taj Mahal, élégant et romantique"
                }
            ]
        }
    ],
    resultAnimation: "couple-plus"
};

let retirement: SingleQuestion = {
    label: "Où Les verriez-vous s'installer pour leur retraite ?",
    resultAnimation: "top3",
    choices: [
        {
            label: "Sous le soleil et les cocotiers",
        },
        {
            label: "En Bretagne, sous les nuages et les dolmens"
        },
        {
            label: "À la campagne avec un potager et des poules"
        },
        {
            label: "Dans une épicerie asiatique qui fait aussi mercerie"
        }
    ]
};

let desertIsland: MegaQuestion = {
    resultAnimation: "couple-plus",
    questions: [
        {
            label: "Qu'emmènerait Paul sur une île déserte ? ...",
            choices: [
                {
                    label: "Son rice cooker"
                },
                {
                    label: "Ses Super Picsou géants"
                },
                {
                    label: "De la crème solaire"
                },
                {
                    label: "Tous ses BBC good food"
                }
            ]
        },
        {
            label: "...Et qu'emmènerait Pauline ?",
            choices: [
                {
                    label: "Une machine à coudre"
                },
                {
                    label: "Ses chaussures préférées"
                },
                {
                    label: "Un bon roman"
                },
                {
                    label: "Un puzzle cent mille pièces"
                }
            ]
        }
    ]
};

let downtonAbbey: MegaQuestion = {
    questions: [
        {
            label: "Dans Downton Abbey, qui serait Pauline ? ...",
            choices: [
                {
                    label: "Violet Crawley"
                },
                {
                    label: "Beryl Patmore"
                },
                {
                    label: "Mary crawley"
                }
            ]
        },
        {
            label: "...Et qui serait Paul ?",
            choices: [
                {
                    label: "Robert Crawley"
                },
                {
                    label: "Charles Carson"
                },
                {
                    label: "Joseph Molesley"
                }
            ]
        }
    ],
    resultAnimation: "couple-heart"
};

let paulFavoriteReading: SingleQuestion = {
    label: "Quelle était la lecture préférée de Paul dans son enfance ?",
    choices: [
        {
            label: "Un catalogue IKEA"
        },
        {
            label: "Un exemplaire de cuisine et vins"
        },
        {
            label: "Un dictionnaire"
        }
    ],
    resultAnimation: "top3"
};

let paulNightmareProtect: SingleQuestion = {
    label: "Qu'est ce qui a mis fin aux cauchermars de Paul enfant ?",
    resultAnimation: "top3",
    choices: [
        {
            label: "Une peluche mangeuse de cauchemars"
        },
        {
            label: "Un pistolet tueur de cauchemars"
        },
        {
            label: "Un gomme à effacer les cauchemars"
        },
        {
            label: "Il a lu la définition d'un cauchemar dans le dictionnaire"
        }
    ]
};
let paulGreatMistake: SingleQuestion = {
    label: "Quelle est la bétise mémorable de Paul ?",
    resultAnimation: "top3",
    choices: [
        {
            label: "Enfermer les parents dehors"
        },
        {
            label: "Rater la cible et percer la piscine en tirant à l'arc"
        },
        {
            label: "Dessiner aux Crayolas sur les portes de placards neuves de la cuisine"
        },
        {
            label: "Ouvrir tous les paquets de lessive du magasin pour récupérer le jouet"
        },

    ]
};


export let questions: QuestionKind[] = [
    painChocoQuestion,
    paulWasAMeal,
    paulineWasFabric,
    monuments,
    retirement,
    gotQuestion,
    desertIsland,
    downtonAbbey,
    paulFavoriteReading,
    paulNightmareProtect,
    paulGreatMistake
];
