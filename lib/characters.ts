export type VoiceTrack = { src: string; label: string };

export type Character = {
  id: string;
  name: string;
  image: string;
  description: string;
  // Тек десктопта: суретті ОҢҒА жылжыту (пиксель). Әдепкі 0 = қозғалмайды.
  // Мәтінді басып қалған персонажқа ғана мән бер — қалғанына тимейсің.
  imageShift?: number;
  // Бір аудио (string) НЕМЕСЕ бірнеше аудио (массив, мыс. Али+Дари)
  audio?: string | VoiceTrack[];
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
    id: "alexandro",
    name: "ALEXANDRO",
    image: "/characters/Alexandro.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
    audio: "/audio/VoiceAlexandro.mp3",
  },
  {
    id: "artur",
    name: "King Artur",
    image: "/characters/Artur.png",
    description:
      "Король королевства Атари, сын чародея Атара, одного из создателей «Врат», отец Сергины Годс и муж Гвиневры Уайт, оставшийся вдовцом после убийства его жены Каем, человеком, что попал в мир Рунтэры до Никиты. Так как Сергина во время прибытия Никиты в Атари в третьей ветки спит, испытание для получения «Кристалла принцессы королевства Атари» Никите выдаёт Артур.",
    audio: "/audio/VoiceArtur.mp3",
    imageShift: 300,
  },
  {
    id: "ali",
    name: "Али и Дари",
    image: "/characters/Ali_and_Dari.png",
    imageShift: 150,
    description:
      "Два путешественника, с которыми Никита встречается на пути, и они помогают ему в путешествии. Али и Дари очень хорошие друзья, которые понимают друг друга без слов. Али сильный и опытный воин, который может найти общий язык с кем угодно. Дари же является очень ловким и так же опытным воином, так же она хорошо ориентируется на местности.",
    audio: [
      { src: "/audio/VoiceAli.mp3", label: "АЛИ" },
      { src: "/audio/VoiceDari.mp3", label: "ДАРИ" },
    ],
  },
  {
    id: "nazarik",
    name: "NAZARIK",
    image: "/characters/Nazarik.png",
    description: "Мощнейшее зло вселенной, которое в ходе великой битвы шести чародеев было запечатано во Вратах между мирами.",
    audio: "/audio/VoiceNazarik.mp3",
  },
  {
    id: "goblinigor",
    name: "GOBLIN IGOR",
    image: "/characters/GoblinIgor.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
    audio: "/audio/VoiceGoblinIgor.mp3",
  },
  {
    id: "stareishina",
    name: "Stareishina",
    image: "/characters/Stareishina.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
    audio: "/audio/VoiceStareishina.mp3",
  },
  {
    id: "lesana",
    name: "Lesana",
    image: "/characters/Lesana.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
    audio: "/audio/VoiceLesana.mp3",
  },
  {
    id: "korolobezyanchikruslanchik",
    name: "Король Обезьянчик Русланчик",
    image: "/characters/KorolobezyanchikRuslanchik.png",
    description: "Сипаттамасы әзірленуде — осы жолды өзің қалаған мәтінмен ауыстыр.",
    audio: "/audio/VoiceObezyanRuslanchik.mp3",
    imageShift: 93,
  },
];