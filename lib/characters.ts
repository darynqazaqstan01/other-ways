export type Character = {
  id: string;
  name: string;
  image: string;
  description: string;
};

// Жаңа персонаж қосу үшін осы тізімге бір блок қосасың — басқа ештеңе қозғалмайды.
export const CHARACTERS: Character[] = [
  {
    id: "nikita",
    name: "NIKITA",
    image: "/characters/nikita.png",
    description:
      "Ойынның бас кейіпкері, қарапайым университет студенті, бір күні университеттен қайтып келе жатып көлік доңғалағының астына түседі, соның салдарынан сиқырлы түрде басқа әлемге ауысады, онда ол «әлемдер арасындағы қақпаны» іске қосу үшін алты артефакт табуы тиіс.",
  },
];