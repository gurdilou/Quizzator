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
                    imageUrl: "images/Lyanna_low.jpg"
                },
                {
                    label: "Daenerys Targaryen, la reine des grillades",
                    imageUrl: "images/Dany_low.jpg"
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
            label: "Un truc simple, seulement 2h de cuisson.",
            imageUrl: "images/assiette_low.jpg"
        },
        {
            label: "Quiche aux restes",
            imageUrl: "images/quiche_low.jpg"
        },
        {
            label: "C'est une recette de BBC good food",
            imageUrl: "images/who_low.jpg"
        },
        {
            label: "Attends je rajoute un peu d'épices",
            imageUrl: "images/spicy_low.jpg"
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
                    label: "La statue de la Liberté, une grande dame porteuse de valeurs (existe aussi en petit format)",
                    imageUrl: "images/statut-liberte_low.jpg"
                },
                {
                    label: "Les jardins de Versailles, beaux et raffinés",
                    imageUrl: "images/versaille_low.jpeg"
                },
                {
                    label: "La sagrada familia, une fashionista qui sait se faire attendre",
                    imageUrl: "images/sagrada_low.jpg"
                }
            ]
        },
        {
            label: "...Et quel monument serait Paul ?",
            choices: [
                {
                    label: "La tour Eiffel, une grande tige universellement aimée",
                    imageUrl: "images/eiffel_low.jpg"
                },
                {
                    label: "Les grottes de Lascaux, pleines d'intérêts et mystères",
                    imageUrl: "images/lascaux_low.jpg"
                },
                {
                    label: "Le Taj Mahal, élégant et romantique",
                    imageUrl: "images/taj_mahal_low.jpeg"
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
            imageUrl: "images/plage_low.jpg"
        },
        {
            label: "En Bretagne, sous les nuages et les dolmens",
            imageUrl: "images/bretagne_low.jpg"
        },
        {
            label: "À la campagne avec un potager et des poules",
            imageUrl: "images/campagne_low.jpg"
        },
        {
            label: "Dans une épicerie asiatique qui fait aussi mercerie",
            imageUrl: "images/marche_low.jpg"
        },
        {
            label: "À la montagne",
            imageUrl: "images/raclette_low.jpg"
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
                    label: "Son rice cooker",
                    imageUrl: "images/cooker.png"
                },
                {
                    label: "Ses Super Picsou géants",
                    imageUrl: "images/picsou_low.jpg"
                },
                {
                    label: "De la crème solaire",
                    imageUrl: "images/coup_soleil_low.png"
                },
                {
                    label: "Tous ses BBC good food",
                    imageUrl: "images/coffe_low.jpg"
                }
            ]
        },
        {
            label: "...Et qu'emmènerait Pauline ?",
            choices: [
                {
                    label: "Une machine à coudre",
                    imageUrl: "images/singer_low.jpg"
                },
                {
                    label: "Ses chaussures préférées",
                    imageUrl: "images/crocs_low.jpeg"
                },
                {
                    label: "Un bon roman",
                    imageUrl: "images/roman_low.jpg"
                },
                {
                    label: "Un puzzle cent mille pièces",
                    imageUrl: "images/puzzle_low.jpg"
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
                    // TODO AJOUTER LABELS
                    label: "Violet Crawley, ",
                    imageUrl: "images/violet_low.jpg"
                },
                {
                    label: "Beryl Patmore, ",
                    imageUrl: "images/beryl.png"
                },
                {
                    label: "Mary crawley, ",
                    imageUrl: "images/mary_low.jpg"
                }
            ]
        },
        {
            label: "...Et qui serait Paul ?",
            choices: [
                {
                    label: "Robert Crawley",
                    imageUrl: "images/robert_low.png"
                },
                {
                    label: "Charles Carson",
                    imageUrl: "images/charles_low.jpg"
                },
                {
                    label: "Joseph Molesley",
                    imageUrl: "images/joseph_low.jpg"
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
            label: "Un catalogue IKEA",
            imageUrl: "images/ikea_low.jpg"
        },
        {
            label: "Un exemplaire de cuisine et vins",
            imageUrl: "images/cuisine_et_vins_low.png"
        },
        {
            label: "Un dictionnaire",
            imageUrl: "images/larousse_low.jpeg"
        }
    ],
    resultAnimation: "top3"
};

let paulNightmareProtect: SingleQuestion = {
    label: "Qu'est ce qui a mis fin aux cauchermars de Paul enfant ?",
    resultAnimation: "top3",
    choices: [
        {
            label: "Une peluche mangeuse de cauchemars",
            imageUrl: "images/ours_low.jpg"
        },
        {
            label: "Un pistolet tueur de cauchemars",
            imageUrl: "images/gun_low.jpg"
        },
        {
            label: "Un gomme à effacer les cauchemars",
            imageUrl: "images/eraser_low.jpg"
        },
        {
            label: "Il a lu la définition d'un cauchemar dans le dictionnaire",
            imageUrl: "images/objection.png"
        }
    ]
};

let paulGreatMistake: SingleQuestion = {
    label: "Quelle est la bétise mémorable de Paul ?",
    resultAnimation: "top3",
    choices: [
        {
            label: "Enfermer les parents dehors",
            imageUrl: "images/outside.jpg"
        },
        {
            label: "Rater la cible et percer la piscine en tirant à l'arc",
            imageUrl: "images/pool_low.jpg"
        },
        {
            label: "Dessiner aux Crayolas sur les portes de placards neuves de la cuisine",
            imageUrl: "images/draw_low.jpg"
        },
        {
            label: "Ouvrir tous les paquets de lessive du magasin pour récupérer le jouet",
            imageUrl: "images/lessive_low.jpg"
        },

    ]
};

// TODO ADD LOUISSE QUESTIONS

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
