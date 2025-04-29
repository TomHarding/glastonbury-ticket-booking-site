# Glastonbury Ticket Site Replica

<img width="1050" alt="image" src="https://github.com/user-attachments/assets/713754c8-46d9-49f6-84bd-ba473e3529eb">

Small application that replicates the Glastonbury SeeTickets site. Built to use as a test site for building a bot to automate the ticket buying process.

## Install Dependencies

From your terminal:

```sh
yarn install
```

## To Run

From your terminal:

```sh
yarn dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Config & Consts

The project has a config file (`/app/lib/config.ts`) which dictates all the event details, including dates, ticket types/prices, and queue probability. These can be edited to reflect the Glastonbury year about to go on sale.

