# Server Design

The API allows users to create, share, and join games.
Users join games using a room code and authenticate using their name.
The server maintains game objects and routes requests to those objects.
Clients use gql subscriptions over SSE to react to game state changes and make moves using mutations.
Games and server state are stored in memory. Games and users are local to each server.

The schema is defined using `type-graphql`. The `grapql-request`-based API client is generated using `graphql-code-generator`. `graphql-request` seems to treat subscriptions as mutations, so only the first value is returned. So, we use a plain `EventSource` for subscriptions.
