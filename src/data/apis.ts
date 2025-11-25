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
    id: "users",
    name: "Users API",
    description: "Manage user accounts, profiles, and authentication",
    endpoint: "/api/v1/users",
    method: "GET, POST, PUT, DELETE",
    documentation: "Complete CRUD operations for user management. Supports authentication, profile updates, and user queries.",
    exampleRequest: `GET /api/v1/users/123
Authorization: Bearer {token}`,
    exampleResponse: `{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-01T00:00:00Z"
}`
  },
  {
    id: "products",
    name: "Products API",
    description: "Access product catalog, inventory, and pricing data",
    endpoint: "/api/v1/products",
    method: "GET, POST, PUT, DELETE",
    documentation: "Manage product listings, inventory tracking, and pricing. Includes search and filtering capabilities.",
    exampleRequest: `GET /api/v1/products?category=electronics
Authorization: Bearer {token}`,
    exampleResponse: `{
  "products": [
    {
      "id": "prod_001",
      "name": "Laptop Pro",
      "price": 1299.99,
      "stock": 45
    }
  ]
}`
  },
  {
    id: "analytics",
    name: "Analytics API",
    description: "Track events, metrics, and generate reports",
    endpoint: "/api/v1/analytics",
    method: "GET, POST",
    documentation: "Real-time analytics and reporting. Track custom events, user behavior, and system metrics.",
    exampleRequest: `POST /api/v1/analytics/events
Authorization: Bearer {token}
{
  "event": "page_view",
  "properties": {
    "page": "/home"
  }
}`,
    exampleResponse: `{
  "status": "success",
  "event_id": "evt_12345"
}`
  },
  {
    id: "notifications",
    name: "Notifications API",
    description: "Send and manage push notifications and alerts",
    endpoint: "/api/v1/notifications",
    method: "GET, POST",
    documentation: "Send notifications via multiple channels: email, SMS, push. Manage notification preferences and delivery status.",
    exampleRequest: `POST /api/v1/notifications
Authorization: Bearer {token}
{
  "recipient": "user_123",
  "message": "Your order has shipped",
  "channel": "email"
}`,
    exampleResponse: `{
  "notification_id": "notif_789",
  "status": "sent",
  "sent_at": "2024-01-01T00:00:00Z"
}`
  }
];
