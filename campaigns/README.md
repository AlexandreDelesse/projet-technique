## Installation
1. Cd into ``docker/campaigns``. 
2. Run ``docker-compose up -d --build``.
3. Install dependencies : ``docker-compose run --rm campaigns_composer install``.
4. Generate key : ``docker-compose exec campaigns_php php artisan key:generate``.
5. Create the ``.env`` file (copy from ``.env.example``), ``cp .env.example .env``.
    - Add database credentials to ``.env``.
6. If you didnt't migrate the database yet : ``docker-compose exec campaigns_php php artisan migrate --seed``.
