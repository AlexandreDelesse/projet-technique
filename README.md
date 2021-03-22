## Projet technique (Don de sang)

## Installation

1. Clone this repo : `git clone https://github.com/mahdiabderraouf/projet-technique`.
2. cd into the project directory.
3. Start a docker network : `docker network create dondesang_network`.
4. Start the database service : `cd docker/database && docker-compose up -d --build`.
5. Start kong gateway: `cd docker/kong && docker-compose up -d --build`.
6. Refer to each microservice readme file to start it.
7. Refer to client readme to start it
