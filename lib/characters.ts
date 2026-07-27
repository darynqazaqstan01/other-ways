export type Character = {
  id: string;
  name: string;
  image: string;
  description: string;
  // Тек десктопта: суретті ОҢҒА жылжыту (пиксель). Әдепкі 0 = қозғалмайды.
  // Мәтінді басып қалған персонажқа ғана мән бер — қалғанына тимейсің.
  imageShift?: number;
  audio?: string;
};

export const CHARACTERS: Character[] = [
  {
    id: "nikita",
    name: "NIKITA",
    image: "/characters/nikita.png",
    description:
      "Ойынның бас кейіпкері, қарапайым университет студенті, бір күні университеттен қайтып келе жатып көлік доңғалағының астына түседі, соның салдарынан сиқырлы түрде басқа әлемге ауысады, онда ол «әлемдер арасындағы қақпаны» іске қосу үшін алты артефакт табуы тиіс.",
    audio: "/audio/audionikity1.mp3",
  },
  {
    id: "aranel",
    name: "ARANEL",
    image: "/characters/Aranel.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
    audio: "/audio/VoiceArarnel.mp3",
  },
  {
    id: "disastrix",
    name: "DISASTRIX",
    image: "/characters/Disastrix.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
    audio: "/audio/VoiceDisasstrix.mp3",
  },
  {
    id: "tom",
    name: "TOM",
    image: "/characters/Tom.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
    audio: "/audio/VoiceTom.mp3",
  },
  {
    id: "vozhak",
    name: "VOZHAK GOBLINOV",
    image: "/characters/Vozhak_Goblinov.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
    audio: "/audio/VoiceVozhakGoblinov.mp3",
    imageShift: 180,
  },
  {
    id: "nikita-and-diana",
    name: "NIKITA & DIANA",
    image: "/characters/Nikita_and_Diana.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
    imageShift: -150,
  },
  {
    id: "alexandro",
    name: "ALEXANDRO",
    image: "/characters/Alexandro.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
    audio: "/audio/VoiceAlexandro.mp3",
  },
  {
    id: "artur",
    name: "ARTUR",
    image: "/characters/Artur.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
    audio: "/audio/VoiceArtur.mp3",
    imageShift: 230,
  },
];