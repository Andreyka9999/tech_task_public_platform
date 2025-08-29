# Sociālā platforma – Full Stack Test Project

Šis projekts ir neliela sociālā platforma, kas izveidota kā **FullStack** testa uzdēvums.  
Tā sastāv no:

- **Backend:** Laravel 10 (PHP 8.2, MySQL)  
- **Frontend:** Angular 17 + TailwindCSS  
- **API:** RESTful, JSON, JWT-based autentifikācija

Lietotāji var:
- Reģistrēties / Pieslēgties
- Izveidot, rediģēt un dzēst savus ierakstus
- Piešķirt kategorijas ierakstiem
- Skatīt plūsmu ar meklēšanas un kategoriju filtriem
- Komentēt ierakstus
- Skatīt lietotāju profilus ar to ierakstiem

## Priekšnoteikumi
Pārliecinieties, ka jums ir instalēts šāds:

- **Git** (https://git-scm.com/downloads)
- **PHP ≥ 8.2** ar `composer` (https://getcomposer.org/)  
- **MySQL ≥ 8.0** (Ērti izmantojams ar XAMPP (Apache+MySQL).
Alternatīva: MariaDB / Docker, bet zemāk ir norādītas instrukcijas XAMPP izmantošanai.)  
- **Node.js ≥ 18** ar `npm` (https://nodejs.org/)  
- **Angular CLI**: npm i install -g @angular/cli

## 1. Repozitorija klonēšana
- git clone <https://github.com/Andreyka9999/tech_task_public_platform.git> social-platform
- cd social-platform

Projekta struktūra:

social-platform/
-- social-platform-backend/      # Laravel API
└─ social-platform-frontend/     # Angular + Tailwind

## 2. Datu bāzes konfigurēšana (XAMPP)
1. Palaižiet XAMPP → Start Apache un MySQL.
2. Atveriet http://localhost/phpmyadmin un izveidojiet datu bāzi, piemēram: Database name: social_platform Collation: utf8mb4_unicode_ci
3. Pieslēgšanās dati pēc noklusējuma (varat atstāt root bez paroles):

    host: 127.0.0.1
    port: 3306
    user: root
    password: (tukša)
    database: social_platform
   
## 3. Backend (Laravel API)
**Atveriet .env un iestatiet savienojumu ar datu bāzi:**

APP_NAME=Laravel
APP_ENV=local
APP_KEY=            # ģenerēsim zemāk
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

**CORS: ir svarīgi, lai fronte varētu piekļūt API ar http://localhost:4200**
SESSION_DRIVER=cookie
SANCTUM_STATEFUL_DOMAINS=localhost:4200,127.0.0.1:4200

**MySQL (XAMPP pēc noklusējuma)**
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=social_platform
DB_USERNAME=root
DB_PASSWORD=


**Atkarību/dependencies iestatīšana un shēmas sagatavošana:**
composer install
php artisan key:generate
php artisan migrate --seed              // izveidos tabulas un ievadīs kategorijas

Sideros jau ir iepriekš noteiktas kategorijas. Lietotāju var izveidot, izmantojot reģistrācijas saskarni Frontend.


**API palaišana:**
php artisan serve

API būs pieejams: http://127.0.0.1:8000

API pamatprefikss: /api/v1 (piemērs: GET http://127.0.0.1:8000/api/v1/posts).


**CORS**

Ja pārlūkprogrammas konsolē redzat paziņojumu „CORS Failed”, pārliecinieties, ka:

- APP_URL = http://127.0.0.1:8000
- Config/cors.php ir atļauts izcelsmes vietas http://localhost:4200 (pēc noklusējuma tas jau ir tā).
- Pārstartējiet php artisan serve.


## 4. Frontend (Angular + Tailwind)

- cd ../social-platform-frontend
- npm install

Frontend palaišana:
- npm start
- vai ng serve

**Lietotne atvērsies http://localhost:4200**


## 5. Vienlaicīga Frontend un Backend palaišana:
Vienkāršākais veids — divi termināli:
- Termināls 1 → cd social-platform-backend && php artisan serve
- Termināls 2 → cd social-platform-frontend && npm


## 6. Kā lietot (prasību pārbaude):
- Atveriet http://localhost:4200
- Pārejiet uz Register un izveidojiet lietotāju. Pēc reģistrācijas tiks saglabāts tokens, un visi aizsargātie ekrāni kļūs pieejami.
- **Feed (/):**
  - Redzams kopējais ziņu plūsmā, komentāru skaitītājs.
  - Darbojas meklēšana ?search=... un filtrs pēc kategorijām ?category=ID.
- **Posta izveide (/posts/new)**
  - Aizpildiet Title, Content.
  - Atzīmējiet vienu vai vairākas kategorijas (izvēles rūtiņas).
  - Saglabājiet — jūs tiksiet pāradresēts uz ziņojuma lapu.
- **Posta rediģēšana (/posts/:id/edit)**
  - Atļauts tikai ziņojuma autoram.
  - Mainiet virsrakstu/saturu un kategoriju kopumu.
- **Ieraksta dzēšana**
   - Poga “Dzēst” ir redzama tikai autoram ziņojuma lapā.
   - Pēc apstiprināšanas ieraksts tiek dzēsts, un jūs atgriezīsieties uz lenti.
- **Detalizēta ziņojuma lapa (/posts/:id)**
   - Pilns saturs, autors, kategorijas, komentāru skaitītājs.
   - Komentāra pievienošana (tikai autorizētiem lietotājiem).
   - Komentārus var dzēst tikai to autors.
- **Profils (/profile/:userId)**
   - Izvēlētā lietotāja ziņojumu saraksts, sakārtots pēc datuma (jaunākie augšā).
- **Navigācija / Logout**
   - Hederā tiek parādīts lietotāja vārds.
   - Poga "Logout" dzēš tokenu un atgriež uz /login.

## 7. Bieži sastopamas problēmas un to risinājumi:
- **The route api/v1//auth/login could not be found.**
    **Environment.apiUrl nedrīkst beigties ar /. Tam jābūt: http://127.0.0.1:8000/api/v1**
- **CORS kļūda DevTools**
     - Pārbaudiet, vai API ir palaists, APP_URL ir pareizs, config/cors.php ir atļauts http://localhost:4200.
     - Pārstartējiet  php artisan serve.
- **Bāze ir tukša / nav kategoriju**
  - Palaidiet "php artisan migrate --seed". Kategoriju seeder izveidos iepriekš noteiktas vērtības.
- **401 Unauthorized**
  - Nepieciešams tokens. Piesakieties, izmantojot /login (vai reģistrējieties). Tokens tiks saglabāts pārlūkprogrammas localStorage; interceptors automātiski aizstāj virsrakstu Authorization: Bearer < token >.
 

## 8. Fināla palaišana:
**Backend**
Parasti tiek izvietots kā parasts Laravel API (PHP-FPM + Nginx/Apache). Neaizmirstiet:
- Konfigurējiet .env (APP_KEY, DB, APP_URL, CORS).
- Izpildiet php artisan migrate --seed (vienu reizi).

**Frontend**
- cd social-platform-frontend
- ng build


## 9. Ātrs palaišanas check-list:
- **XAMPP → MySQL palaists → izveidot datu bāzi ar nosaukumu "social_platform".**
- **Backend:**
   - cd social-platform-backend
   - composer install
   -  konfigurēt DB_* .env
   - php artisan key:generate
   - php artisan migrate --seed
   - php artisan serve
 - **Frontend:**
    - cd ../social-platform-frontend
    - npm install
    - npm start
    - Atveriet http://localhost:4200, reģistrējieties kā lietotājs un izietiet visus ekrānus.


## 10. Fināla palaišana:
- Reģistrācija un autentifikācija (Bearer token).
- Publikāciju lente ar meklēšanu un filtrēšanu pēc kategorijām.
- Savu publikāciju izveide/rediģēšana/dzēšana.
- Daudzi-daudziem modelis ar iepriekš noteiktām kategorijām (sideri).
- Komentāri pie publikācijām, kurus var dzēst komentāra autors.
- Lietotāja profils ar viņa ziņām, šķirošana pēc datuma.
- Tailwind visam lietotāja interfeisam.
- Maršrutu aizsardzība (Route Guard), pogu “Edit/Delete” slēpšana lietotājiem, kas nav autori.
- 401/422 kļūdu apstrāde frontendā (validācija, ziņojumi).












