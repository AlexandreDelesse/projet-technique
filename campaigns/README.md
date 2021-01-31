## Installation
1. Cd into docker/camapagnes. 
2. Run ``docker-compose up -d --build``.
3. Bash into the php container ``docker-compose exec campagnes_php bash`` : 
    - Install dependicies : ``composer install``.
    - Generate key : ``php artisan key:generate``.
    - Create the ``.env``file (copy from .env.example).
    - Add database credentials to .env.
    - Migerate database : ``php artisan migrate --seed``, the ``--seed`` flag is for generating fake data.
4. Your application is now running in the correspending port, check the docker-compose.yml file to know which port it is.  