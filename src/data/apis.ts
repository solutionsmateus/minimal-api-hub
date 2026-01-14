export interface Api {
  id: string;
  name: string;
  description: string;
  pagePath: string;
  method: string;
  documentation: string;
  exampleRequest: string;
  exampleResponse: string;
}

export const apis: Api[] = [
  {
    id: "concorrencia",
    name: "Concorrencia API",
    description: "Promoções e Campanhas de todos os supermercados.",
    pagePath: "/redirectpage", // Aqui deve ser pagePath
    method: "GET, POST, PUT, DELETE",
    documentation: "Clique e pegue todos os dados da concorrencia",
    exampleRequest: `GET /api/v1/users/123...`,
    exampleResponse: `{...}`,
  },
  {
    id: "outros",
    name: "Projetos.",
    description: "Clique e Veja.",
    pagePath: "#", // Aqui também
    method: "GET, POST",
    exampleRequest: `...`,
    exampleResponse: `...`,
    documentation: "",
  },
];
