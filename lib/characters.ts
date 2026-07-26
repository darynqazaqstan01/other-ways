export type Character = {
  id: string;
  name: string;
  image: string;
  description: string;
};

// Реті осылай — стрелка сол ретпен айналады. Қаласаң жолдардың орнын ауыстыр.
// name мен description-ды өзің қалағаныңша өзгерт — бәрі осы жерде.
export const CHARACTERS: Character[] = [
  {
    id: "nikita",
    name: "NIKITA",
    image: "/characters/nikita.png",
    description:
      "Ойынның бас кейіпкері, қарапайым университет студенті, бір күні университеттен қайтып келе жатып көлік доңғалағының астына түседі, соның салдарынан сиқырлы түрде басқа әлемге ауысады, онда ол «әлемдер арасындағы қақпаны» іске қосу үшін алты артефакт табуы тиіс.",
  },
  {
    id: "aranel",
    name: "ARANEL",
    image: "/characters/Aranel.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
  },
  {
    id: "disastrix",
    name: "DISASTRIX",
    image: "/characters/Disastrix.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
  },
  {
    id: "ruslan",
    name: "RUSLAN",
    image: "/characters/Ruslan.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
  },
  {
    id: "tom",
    name: "TOM",
    image: "/characters/Tom.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
  },
  {
    id: "vozhak",
    name: "VOZHAK GOBLINOV",
    image: "/characters/Vozhak_Goblinov.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
  },
  {
    id: "nikita-and-diana",
    name: "NIKITA & DIANA",
    image: "/characters/Nikita_and_Diana.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
  },
];