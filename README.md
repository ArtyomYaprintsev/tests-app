# Tests application

## Run application

### Backend

1. Open terminal inside the `backend` dir.
2. Create (if not exists) and activate virtual environment.
3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Run migrations:

    ```bash
    python manage.py migrate
    ```

5. Create superuser:

    ```bash
    python manage.py createsuperuser
    ```

6. Run server:

    ```bash
    python manage.py runserver
    ```

### Frontend

1. Open terminal inside the `frontend` dir.
2. install dependencies:

    ```bash
    npm i
    ```

3. Run server:

    ```bash
    npm run dev
    ```

## Demo

### `db.sqlite3` usage

Some data represents inside the `backend/db.sqlite3`

1. Superuser credentials:
    - login: adminArtyom
    - password: somePas_12D

2. Random user:
    - login: newUser1
    - password: newUser1
