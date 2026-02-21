export interface Drug {
  name: string;
}

export interface Week {
  id: string;
  title: string;
  description?: string;
  drugs: Drug[];
}

export const WEEKS: Week[] = [
  {
    id: "6",
    title: "Semana 6",
    description: "Anestésicos Locales",
    drugs: [
      { name: "Lidocaína" },
      { name: "Mepivacaína" },
      { name: "Procaína" },
      { name: "Ropivacaína" }
    ]
  },
  {
    id: "7",
    title: "Semana 7",
    description: "Toxicología y Abuso de Sustancias (Cap. 23, 31, 32)",
    drugs: [
      { name: "Etanol" },
      { name: "Tiamina (Vitamina B1)" },
      { name: "Naltrexona" },
      { name: "Disulfiram" },
      { name: "Fomepizol" },
      { name: "Acamprosato cálcico" },
      { name: "Naloxona" },
      { name: "Metadona" },
      { name: "Levometadona" },
      { name: "Sulfato de morfina" },
      { name: "Buprenorfina" },
      { name: "Vareniclina" },
      { name: "Fentanilo" },
      { name: "Oxicodona" },
      { name: "Codeína" }
    ]
  },
  {
    id: "8-9",
    title: "Semanas 8 y 9",
    description: "Agonistas Colinomiméticos e Inhibidores de Colinesterasa (Cap. 6, 7)",
    drugs: [
      { name: "Acetilcolina" },
      { name: "Betanecol" },
      { name: "Carbacol" },
      { name: "Pilocarpina" },
      { name: "Nicotina" },
      { name: "Vareniclina" },
      { name: "Edofonio" },
      { name: "Neostigmina" },
      { name: "Piridostigmina" },
      { name: "Fisostigmina" },
      { name: "Donepezil" },
      { name: "Neostigmina" },
      { name: "Rivastigmina" }
    ]
  },
  {
    id: "10",
    title: "Semana 10",
    description: "Antagonistas de Receptores Colinérgicos (Cap. 8, 9)",
    drugs: [
      { name: "Escopolamina" },
      { name: "Atropina" },
      { name: "Homatropina" },
      { name: "Ciclopentolato" },
      { name: "Ipratropio" },
      { name: "Oxibutinina" },
      { name: "Pralidoxima" },
      { name: "Clidinio" },
      { name: "Glicopirrolato" },
      { name: "Umeclidino" },
      { name: "Ipatropio" },
      { name: "Tiotropio" }
    ]
  },
  {
    id: "11",
    title: "Semana 11",
    description: "Antagonistas Adrenérgicos y Hormonas Hipofisarias (Cap. 10)",
    drugs: [
      { name: "Alfuzosina" },
      { name: "Doxazosina" },
      { name: "Fentolamina" },
      { name: "Prazosina" },
      { name: "Tamsulosina" },
      { name: "Acebutolol" },
      { name: "Atenolol" },
      { name: "Bisoprolol" },
      { name: "Somatropina" },
      { name: "Octeótrido" },
      { name: "Bromocriptina" },
      { name: "Cabergolina" },
      { name: "Oxitocina" },
      { name: "Atosiban" },
      { name: "Desmopresina" }
    ]
  },
  {
    id: "12",
    title: "Semana 12",
    description: "Fármacos Tiroideos y Antitiroideos (Cap. 37, 38)",
    drugs: [
      { name: "Levotiroxina" },
      { name: "Liotironina" },
      { name: "Metimazol" },
      { name: "Propiltiouracilo" },
      { name: "Yoduro de potasio" },
      { name: "Propranolol" }
    ]
  },
  {
    id: "13",
    title: "Semana 13",
    description: "Corticosteroides y Antagonistas (Cap. 39)",
    drugs: [
      { name: "Hidrocortisona" },
      { name: "Metilprednisolona" },
      { name: "Prednisolona" },
      { name: "Triamcinolona" },
      { name: "Betametasona" },
      { name: "Budesonide" },
      { name: "Dexametasona" },
      { name: "Fludrocortisona" },
      { name: "Abiraterona" },
      { name: "Etomidato" },
      { name: "Ketoconazol" },
      { name: "Mifepristona" }
    ]
  },
  {
    id: "14",
    title: "Semana 14",
    description: "Hormonas Gonadales e Inhibidores (Cap. 40)",
    drugs: [
      { name: "Estradiol" },
      { name: "Medroxiprogesterona" },
      { name: "Megestrol" },
      { name: "Levonorgestrel" },
      { name: "Progesterona" },
      { name: "Anastrozol" },
      { name: "Bezedoxifeno" },
      { name: "Bicalutamida" },
      { name: "Clomifeno" },
      { name: "Danazol" },
      { name: "Dutasteride" },
      { name: "Exemestano" },
      { name: "Finasteride" },
      { name: "Mifeprestona" },
      { name: "Raloxifeno" },
      { name: "Tamoxifeno" }
    ]
  }
];
