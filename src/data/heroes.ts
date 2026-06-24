export interface HeroTimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Hero {
  id: string;
  fullName: string;
  birthDate: string;
  deathDate?: string;
  placeOfOrigin: string;
  nationality: string;
  residence?: string;
  maritalStatus: string;
  children: string;
  education: string[];
  militaryService: string[];
  politicalCareer: string[];
  timeline: HeroTimelineItem[];
  narrative: string[];
  summary: string;
}

export const heroesData: Hero[] = [
  {
    id: "victor-matemadanda",
    fullName: "Victor Matemadanda",
    birthDate: "3 March 1960",
    deathDate: "Deceased (Recent)",
    placeOfOrigin: "Gokwe, Zimbabwe",
    nationality: "Zimbabwean",
    residence: "Mozambique",
    maritalStatus: "Married",
    children: "Terrence Matemadanda",
    summary: "Liberation war veteran, former Deputy Minister of Defence, former Zanu PF National Political Commissar, and Ambassador to Mozambique and Eswatini.",
    education: [
      "Degree from the University of South Africa (UNISA).",
      "Doctorate in Business Administration (2022) from the African Leadership Institute (an affiliate of the Chartered Institute of Leadership and Management)."
    ],
    militaryService: [
      "Joined Zimbabwe African National Liberation Army (ZANLA) in 1973 as a liberation war fighter.",
      "Recognized as a veteran of the Zimbabwean Liberation War."
    ],
    politicalCareer: [
      "Secretary General of the Zimbabwe National Liberation War Veterans Association (ZNLWVA) from 2014.",
      "Member of the ZANU-PF Central Committee.",
      "Member of Parliament (MP) for Gokwe Central (elected 2018).",
      "Former Deputy Minister of Defence.",
      "Former ZANU-PF National Political Commissar.",
      "Appointed Ambassador to Mozambique and the Kingdom of Eswatini (2021)."
    ],
    timeline: [
      {
        year: "1973",
        title: "Joined ZANLA",
        description: "At the young age of 13, Cde Matemadanda joined the Zimbabwe African National Liberation Army (ZANLA), the military wing of the Zimbabwe African National Union (now ZANU-PF), to fight for Zimbabwe's liberation."
      },
      {
        year: "2013",
        title: "Gokwe Central Primaries",
        description: "Contested in the ZANU-PF primary elections for the Gokwe Central Member of Parliament seat, preparing for his future legislative service."
      },
      {
        year: "2014",
        title: "ZNLWVA Secretary General",
        description: "Appointed as the Secretary General of the Zimbabwe National Liberation War Veterans Association, championing the rights and welfare of former combatants."
      },
      {
        year: "2017",
        title: "National Political Commissar",
        description: "Appointed as the ZANU-PF National Political Commissar, directing party mobilization and political education during a historic period of transition."
      },
      {
        year: "2018",
        title: "Elected MP & Deputy Minister of Defence",
        description: "Elected as Member of Parliament for Gokwe Central and subsequently appointed by the President as the Deputy Minister of Defence."
      },
      {
        year: "2021",
        title: "Ambassador to Mozambique",
        description: "Appointed by President Mnangagwa as Zimbabwe's Ambassador to Mozambique and the Kingdom of Eswatini, representing the nation with dignity and devotion."
      },
      {
        year: "2022",
        title: "Doctoral Graduation",
        description: "Graduated with a Doctorate in Business Administration from the African Leadership Institute, exemplifying the combination of military discipline and academic excellence."
      }
    ],
    narrative: [
      "Born on March 3, 1960 in Gokwe, Cde Matemadanda did not wait for freedom to be handed to him. At the age of 13, in 1973, he joined the Zimbabwe African National Liberation Army (ZANLA). He marched into the liberation war while others of his age still considered themselves children.",
      "He fought so that Zimbabwe would be born. He carried a rifle for the flag and carried the flag in his heart for the rest of his life. When the war ended, the struggle continued. Cde Matemadanda became Secretary General of the Zimbabwe National Liberation War Veterans Association and later National Political Commissar of ZANU-PF.",
      "He was the voice that reminded us: we fought for a united Zimbabwe and unity must be guarded with courage. He stood firm when the nation stood at crossroads. 'As war veterans, we fought to liberate the country and we want to give direction now,' he declared.",
      "He gave direction. He defended the revolution. He believed that political opponents are not enemies—that democracy grows when we debate without fear.",
      "The State recognized his service. The people of Gokwe Central elected him Member of Parliament in 2018. He served as Deputy Minister of Defence. In 2021, President Mnangagwa appointed him Zimbabwe’s Ambassador to Mozambique and the Kingdom of Eswatini. He represented President Mnangagwa and the people of Zimbabwe with distinction, dignity, and devotion across borders.",
      "A freedom fighter with a scholar’s pen, he earned his degree from the University of South Africa (UNISA) and in 2022 graduated with a Doctorate in Business Administration from the African Leadership Institute. He proved that the spirit of the bush war and the discipline of learning walk hand in hand.",
      "Cde Matemadanda was a husband, a father to Terrence, and a patriot without compromise—brave, unflinching, and loyal to Zimbabwe.",
      "Cde Matemadanda’s watch has ended. The guns he once carried are silent, but the work he began in 1973 lives on. It lives in every child who learns in peace because he fought. It lives in every diplomat who stands tall because he served. It lives in every Zimbabwean who refuses to surrender our sovereignty."
    ]
  }
];
