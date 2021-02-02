## Installation
1. Cd into ../docker/camapagnes. 
2. Run ``docker-compose up -d --build``.
3. Install dependencies : ``docker-compose run --rm composer install``.
4. Bash into the container ``docker-compose exec campaigns_php bash`` : 
    - Generate key : ``php artisan key:generate``.
    - Create the ``.env`` file (copy from ``.env.example``).
    - Add database credentials to ``.env``.
    - Migrate database : ``php artisan migrate --seed``.
4. Check the ``docker-compose.yml`` file to know which port the service is exposing.  