## Projet technique (Don de sang)

## Installation
1. Clone this repo : ``git clone https://github.com/mahdiabderraouf/projet-technique``.
2. cd into the project directory.
2. Start a docker network : ``docker network create dondesang_network``.
3. Start the database service : ``cd docker && docker-compose up -d --build``.
4. Start kong gateway: ``cd docker && docker-compose up -d --build``
5. Refer to each microservice readme file to start it.
