
import React from 'react';
import { Story, Language } from './types';

const LionIllustration: React.FC<{ className?: string; onClick?: () => void }> = ({ className, onClick }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
    <g>
      <path fill="#FFC107" d="M100,20 C144.18,20 180,55.82 180,100 C180,144.18 144.18,180 100,180 C55.82,180 20,144.18 20,100 C20,55.82 55.82,20 100,20 Z" />
      <path fill="#FFA000" d="M100,30 C138.66,30 170,61.34 170,100 C170,138.66 138.66,170 100,170 C61.34,170 30,138.66 30,100 C30,61.34 61.34,30 100,30 Z" />
      <path fill="#795548" d="M100,105 C111.05,105 120,113.95 120,125 L80,125 C80,113.95 88.95,105 100,105 Z" />
      <circle fill="#FFFFFF" cx="80" cy="85" r="10" />
      <circle fill="#FFFFFF" cx="120" cy="85" r="10" />
      <circle fill="#000000" cx="80" cy="85" r="5" />
      <circle fill="#000000" cx="120" cy="85" r="5" />
      <path fill="#FFFFFF" d="M95,110 L105,110 L100,118 Z" />
    </g>
  </svg>
);

const RabbitIllustration: React.FC<{ className?: string; onClick?: () => void }> = ({ className, onClick }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
    <g>
      <path fill="#E0E0E0" d="M100,50 C130,50 145,70 145,100 L145,150 C145,160 135,170 125,170 L75,170 C65,170 55,160 55,150 L55,100 C55,70 70,50 100,50 Z" />
      <path fill="#FFFFFF" d="M100,60 C125,60 135,75 135,100 L135,145 C135,150 130,155 125,155 L75,155 C70,155 65,150 65,145 L65,100 C65,75 75,60 100,60 Z" />
      <path fill="#E0E0E0" d="M80,30 C80,10 90,10 90,30 L90,60 C90,70 80,70 80,60 Z" />
      <path fill="#E0E0E0" d="M110,30 C110,10 120,10 120,30 L120,60 C120,70 110,70 110,60 Z" />
      <circle fill="#000000" cx="90" cy="95" r="4" />
      <circle fill="#000000" cx="110" cy="95" r="4" />
      <path fill="#FFCDD2" d="M98,105 L102,105 L100,109 Z" />
      <path d="M90,115 C95,120 105,120 110,115" stroke="#FFCDD2" strokeWidth="2" fill="none" />
    </g>
  </svg>
);

export const STORIES: Story[] = [
  {
    id: 1,
    coverImage: 'https://picsum.photos/seed/lion-story/400/600',
    illustration: LionIllustration,
    content: {
      [Language.Kinyarwanda]: {
        title: "Intare n'Imbeba",
        description: "Umugani w'intare y'igikurumpaka n'imbeba ntoya.",
        text: [
          "Umusi umwe, intare yari yisinziriye mu ishyamba.",
          "Imbeba ntoya mu gukina kwayo, yanyuze hejuru yayo.",
          "Intare irakanguka, ifata imbeba, yenda kuyirya.",
          "'Mbababarira!' imbeba iratakamba. 'Umunsi umwe nzagufasha.'",
          "Intare iraseka, ariko irayirekura.",
          "Hashize iminsi, intare yafashwe mu mutego w'abazimyi.",
          "Imbeba yumva ukuboroga kwayo, iraza iriruka.",
          "Yahekenye imigozi y'umutego kugeza intare ibohotse.",
          "Kuva uwo munsi, bahindutse inshuti magara."
        ],
        moral: "Nta muntu muto. Agahinda gato gatera koga.",
        vocabulary: [
          { word: "Intare", definition: "Inyamaswa y'inkazi yo mu ishyamba" },
          { word: "Imbeba", definition: "Aganyamaswa gato cyane" },
          { word: "Umutego", definition: "Ikintu gifata inyamaswa" }
        ]
      },
      [Language.English]: {
        title: "The Lion and the Mouse",
        description: "A classic tale of a mighty lion and a tiny mouse.",
        text: [
          "One day, a lion was sleeping in the forest.",
          "A little mouse, in its play, ran over him.",
          "The lion awoke, caught the mouse, and was about to eat it.",
          "'Forgive me!' cried the mouse. 'One day I will help you.'",
          "The lion laughed, but let it go.",
          "A few days later, the lion was caught in a hunter's trap.",
          "The mouse heard his roaring and came running.",
          "It gnawed the ropes of the trap until the lion was free.",
          "From that day on, they became the best of friends."
        ],
        moral: "No act of kindness, no matter how small, is ever wasted.",
        vocabulary: [
          { word: "Lion", definition: "A large, fierce cat of the forest" },
          { word: "Mouse", definition: "A very small rodent" },
          { word: "Trap", definition: "A device for catching animals" }
        ]
      },
      [Language.French]: {
        title: "Le Lion et la Souris",
        description: "Un conte classique d'un lion puissant et d'une petite souris.",
        text: [
          "Un jour, un lion dormait dans la forêt.",
          "Une petite souris, dans son jeu, a couru sur lui.",
          "Le lion se réveilla, attrapa la souris et s'apprêtait à la manger.",
          "'Pardonnez-moi!' cria la souris. 'Un jour, je vous aiderai.'",
          "Le lion rit, mais la laissa partir.",
          "Quelques jours plus tard, le lion fut pris dans le piège d'un chasseur.",
          "La souris entendit son rugissement et accourut.",
          "Elle rongea les cordes du piège jusqu'à ce que le lion soit libre.",
          "À partir de ce jour, ils devinrent les meilleurs amis du monde."
        ],
        moral: "Aucun acte de gentillesse, aussi petit soit-il, n'est jamais perdu.",
        vocabulary: [
            { word: "Lion", definition: "Un grand chat féroce de la forêt" },
            { word: "Souris", definition: "Un très petit rongeur" },
            { word: "Piège", definition: "Un dispositif pour attraper les animaux" }
        ]
      }
    }
  },
  {
    id: 2,
    coverImage: 'https://picsum.photos/seed/rabbit-story/400/600',
    illustration: RabbitIllustration,
    content: {
      [Language.Kinyarwanda]: {
        title: "Urukwavu n'Akarabyo",
        description: "Inkuru y'urukwavu rwize guhangana n'ubwoba.",
        text: [
          "Habayeho urukwavu rwitwa Kiki rwahoraga rufite ubwoba.",
          "Rwatinye igicucu cyarwo, rwatinye n'ijwi ry'umuyaga.",
          "Umunsi umwe, Kiki cyabonye akarabyo keza cyane mu ishyamba.",
          "Kashakaga kugera kuri ako karabyo ariko katinya kwambuka akagezi.",
          "Inyoni y'inshuti yarwo yarayibwiye iti, 'Ubutwari si ukutagira ubwoba, ahubwo ni ugukora ikintu n'ubwo waba ufite ubwoba.'",
          "Kiki cyafashe umwuka muremure, cyubaka akanyetetero gato, maze cyambuka.",
          "Cyageze ku karabyo gatuje kandi gishimye cyane.",
          "Kiki cyamenye ko gishoboye kunesha ubwoba bwacyo."
        ],
        moral: "Ubutwari ni ugukora ibikwiye n'ubwo waba ufite ubwoba.",
        vocabulary: [
            { word: "Urukwavu", definition: "Aganyamaswa kihuta cyane" },
            { word: "Ubwoba", definition: "Kumva utekanye muke" },
            { word: "Ubutwari", definition: "Guhangana n'ubwoba" }
        ]
      },
      [Language.English]: {
        title: "The Rabbit and the Flower",
        description: "A story of a rabbit who learned to be brave.",
        text: [
          "There once was a rabbit named Kiki who was always afraid.",
          "It was afraid of its own shadow, and afraid of the sound of the wind.",
          "One day, Kiki saw a very beautiful flower in the forest.",
          "It wanted to reach the flower but was afraid to cross a small stream.",
          "A friendly bird told it, 'Courage is not the absence of fear, but doing something despite being afraid.'",
          "Kiki took a deep breath, built a small bridge of stones, and crossed.",
          "It reached the flower, feeling calm and very proud.",
          "Kiki learned that it could overcome its fears."
        ],
        moral: "Courage is doing the right thing even when you are scared.",
        vocabulary: [
          { word: "Rabbit", definition: "A small, fast-running mammal" },
          { word: "Afraid", definition: "Feeling fear or anxiety" },
          { word: "Courage", definition: "The ability to do something that frightens one" }
        ]
      },
      [Language.French]: {
        title: "Le Lapin et la Fleur",
        description: "L'histoire d'un lapin qui a appris à être courageux.",
        text: [
          "Il était une fois un lapin nommé Kiki qui avait toujours peur.",
          "Il avait peur de sa propre ombre et du bruit du vent.",
          "Un jour, Kiki vit une très belle fleur dans la forêt.",
          "Il voulait atteindre la fleur mais avait peur de traverser un petit ruisseau.",
          "Un oiseau amical lui dit: 'Le courage n'est pas l'absence de peur, mais de faire quelque chose malgré la peur.'",
          "Kiki prit une profonde inspiration, construisit un petit pont de pierres et traversa.",
          "Il atteignit la fleur, se sentant calme et très fier.",
          "Kiki apprit qu'il pouvait surmonter ses peurs."
        ],
        moral: "Le courage, c'est de faire ce qui est juste même quand on a peur.",
        vocabulary: [
          { word: "Lapin", definition: "Un petit mammifère qui court vite" },
          { word: "Peur", definition: "Ressentir de la crainte ou de l'anxiété" },
          { word: "Courage", definition: "La capacité de faire quelque chose qui effraie" }
        ]
      }
    }
  }
];

export const LANGUAGE_OPTIONS = {
  [Language.English]: { label: 'English', flag: '🇬🇧' },
  [Language.French]: { label: 'Français', flag: '🇫🇷' },
  [Language.Kinyarwanda]: { label: 'Kinyarwanda', flag: '🇷🇼' },
};
