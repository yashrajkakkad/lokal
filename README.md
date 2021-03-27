# Lokal

### Folder Structure

- root
  - client --> cra app
  - server --> node.js app
    - src
      - configs --> contains configurations and secrets
      - controllers --> contains logic
      - enums --> enums for various entities
      - middlewares --> middleware functions like authentication
      - models --> mongoose/mongodb schema
      - routes --> api routes
    - server.js --> server entry file

## Backend

### Model Schema Explanation

- User and Store schema can be thought of as root schemas
- Transaction Schema will contain userId and storeId
- Tier Schema will contain storeId
- userLevel will contain userId, storeId and currentTotal
  - fetch tier based on this currentTotal and storeId
