export interface Api {
  id: string;
  name: string;
  description: string;
  endpoint: string;
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
    endpoint: "/api/v1/concorrencia",
    method: "GET, POST, PUT, DELETE",
    documentation: "Clique e pegue todos os dados da concorrencia",
    exampleRequest: `GET /api/v1/users/123
Authorization: Bearer {token}`,
    exampleResponse: `{
  "id": "Button",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-01T00:00:00Z"
}`,
  },
  {
    id: "button",
    name: "button endpoint",
    description: "Clique e Adquira os Dados.",
    endpoint: "/api/v1/hugging-face",
    method: "GET, POST",
    exampleRequest: `POST /api/v1/novo-endpoint
    Authorization: Bearer {token}`,
    exampleResponse: `{
  "status": "success",
  "message": "Ação realizada com sucesso"
}`,
    documentation: "",
  },
];
