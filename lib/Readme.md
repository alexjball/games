# Server Design

The API allows users to create, share, and join games.
The server maintains game objects and routes requests to those objects.
Clients subscribe to game state using graphql-sse and make moves using mutations.
