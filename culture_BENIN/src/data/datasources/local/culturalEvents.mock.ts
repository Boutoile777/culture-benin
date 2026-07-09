import type { CulturalEvent } from "@/domain/entities/CulturalEvent";
import { wikimediaImage } from "@/shared/utils/wikimedia";

export const CULTURAL_EVENTS_MOCK: CulturalEvent[] = [
  {
    id: "journee-internationale-musees-abomey",
    cityId: "abomey",
    name: "Journée internationale des musées",
    description:
      "Les palais royaux d'Abomey ouvrent leurs portes gratuitement le temps d'une journée, avec visites guidées et démonstrations artisanales.",
    date: "2026-05-18",
    origin:
      "Instituée à l'échelle mondiale par le Conseil international des musées (ICOM) en 1977, cette journée est relayée chaque 18 mai par les palais royaux d'Abomey pour élargir l'accès du grand public au patrimoine UNESCO du Danxomè.",
    gallery: [
      wikimediaImage("Abomey Royal Palace.jpg", 1600),
      wikimediaImage("Palais privé du roi Béhanzin 08.jpg", 1600),
    ],
    testimonies: [
      {
        id: "musees-abomey-temoignage-1",
        type: "video",
        title: "Retour sur l'édition précédente",
        speaker: "Équipe des palais royaux d'Abomey",
        image: wikimediaImage("Abomey Royal Palace.jpg", 1200),
        duration: "3 min 10",
      },
    ],
  },
  {
    id: "nuit-patrimoine-ouidah",
    cityId: "ouidah",
    name: "Nuit du patrimoine",
    description:
      "Soirée de contes, percussions et danses traditionnelles le long de la Route des Esclaves, à la tombée du jour.",
    date: "2026-03-14",
    origin:
      "Organisée par les acteurs culturels locaux de Ouidah, cette soirée s'inspire de la tradition des veillées où contes et percussions se transmettaient de génération en génération, ravivée le long du parcours mémoriel de la Route des Esclaves.",
    gallery: [
      wikimediaImage("Door of no return.jpg", 1600),
      wikimediaImage("La porte du non retour à Ouidah.jpg", 1600),
    ],
    testimonies: [
      {
        id: "nuit-patrimoine-temoignage-1",
        type: "video",
        title: "Ambiance de la précédente Nuit du patrimoine",
        speaker: "Collectif culturel de Ouidah",
        image: wikimediaImage("Door of no return.jpg", 1200),
        duration: "2 min 50",
      },
    ],
  },
  {
    id: "regate-lac-nokoue-ganvie",
    cityId: "ganvie",
    name: "Régate traditionnelle du lac Nokoué",
    description:
      "Course de pirogues et démonstrations de pêche à l'acadja par les familles de pêcheurs de Ganvié.",
    date: "2026-08-22",
    origin:
      "Héritée des compétitions informelles entre familles de pêcheurs toffinou, la régate s'est structurée en événement annuel pour valoriser les savoir-faire lacustres de Ganvié, dont la pêche à l'acadja.",
  },
  {
    id: "fete-masques-guelede-porto-novo",
    cityId: "portonovo",
    name: "Fête des masques Guèlèdè",
    description:
      "Célébration du patrimoine oral et des masques Guèlèdè, inscrits au patrimoine immatériel de l'UNESCO, dans les quartiers yoruba de la ville.",
    date: "2026-09-12",
    origin:
      "Le Guèlèdè est une tradition rituelle yoruba rendant hommage au pouvoir spirituel des femmes et des mères ; reconnu chef-d'œuvre du patrimoine oral et immatériel de l'humanité par l'UNESCO en 2001, il est célébré chaque année dans les quartiers yoruba de Porto-Novo.",
  },
  {
    id: "semaine-patrimoine-danxome-abomey",
    cityId: "abomey",
    name: "Semaine du patrimoine Danxomè",
    description:
      "Expositions de bas-reliefs et tentures royales, conférences et ateliers autour de l'histoire du royaume du Danxomè.",
    date: "2026-11-21",
    origin:
      "Créée par les autorités culturelles d'Abomey pour prolonger la mémoire du royaume au-delà des seules visites du site UNESCO, cette semaine réunit chercheurs, artisans et descendants des familles royales autour de conférences et d'ateliers.",
    gallery: [wikimediaImage("Palais privé du roi Béhanzin 08.jpg", 1600)],
  },
  {
    id: "vodun-days-ouidah",
    cityId: "ouidah",
    name: "Vodun Days — Fête internationale du Vodoun",
    description:
      "Le grand rendez-vous annuel du culte vodoun : libations, danses de possession et sorties de masques Egungun et Zangbeto sur la plage de Ouidah.",
    date: "2027-01-10",
    origin:
      "Héritière de la Fête du Vodoun instituée fête nationale en 1993, l'édition internationale « Vodun Days » a été lancée en 2024 pour ouvrir la célébration aux diasporas afro-descendantes et au grand public international.",
    gallery: [
      wikimediaImage("Vodoun party in Benin.jpg", 1600),
      wikimediaImage("Door of no return.jpg", 1600),
    ],
    testimonies: [
      {
        id: "vodun-days-temoignage-1",
        type: "video",
        title: "Vodun Days 2024, première édition internationale",
        speaker: "Comité d'organisation, Vodun Days",
        image: wikimediaImage("Vodoun party in Benin.jpg", 1200),
        duration: "3 min 40",
      },
    ],
  },
];
