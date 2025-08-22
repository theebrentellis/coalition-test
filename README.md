## Coalition Technologies Laravel Skills Test

Follow these steps to get your Laravel project running locally with [Laravel Herd](https://herd.laravel.com).

PHP: 8.3
Node: 22

---

## 1. Clone the Repository

```bash
git clone https://github.com/theebrentellis/coalition-test.git
cd coalition-test
```

## 2. Install PHP & Node Dependencies

```bash
composer install
npm install
```

## 3. Copy Environment File

```bash
cp .env.example .env
```


## 4. Generate Application Key 

```bash
php artisan key:generate
```

## 5. Configure Your Database

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## 6. Run Migrations

```bash
php artisan migrate
```

## 7. Build Frontend Assets

```bash
npm run dev
```
For production:

```bash
npm run build
```

## 8. Optimize Application

```bash
php artisan optimize:clear
php artisan optimize
```
