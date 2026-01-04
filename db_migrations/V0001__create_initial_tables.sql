-- Таблица для услуг (прайс-лист)
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    price VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    features JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица для портфолио
CREATE TABLE IF NOT EXISTS portfolio (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица для отзывов
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL,
    telegram VARCHAR(100),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица для админов
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка начальных данных (услуги)
INSERT INTO services (icon, title, price, description, features) VALUES
('MessageSquare', 'Бот для предложки ТГК', '1000₽', 'Автоматизация публикаций в канале через бота-модератора', '["Модерация контента", "Автопостинг", "Управление через бот"]'),
('CreditCard', 'Бот для оплаты', 'от 1500₽', 'Приём платежей через карту/СБП/криптокошелек', '["Привязка карты", "СБП интеграция", "Крипто-платежи"]'),
('ShoppingBag', 'Бот для продажи', 'от 2000₽', 'Продажа звёзд, аккаунтов, симок через Telegram', '["Каталог товаров", "Автоматизация", "Статистика продаж"]'),
('Code2', 'Кастомный бот', 'от 500₽', 'Создание бота под ваши уникальные задачи', '["Любая функция", "Индивидуальный подход", "Гибкая цена"]');

-- Вставка начальных данных (портфолио)
INSERT INTO portfolio (name, description) VALUES
('Бот для интернет-магазина', 'Каталог из 500+ товаров с оплатой'),
('Бот-модератор канала', 'Автоматическая модерация 10k+ постов'),
('Бот для приёма заказов', 'Обработка 200+ заказов в день');

-- Вставка начального пароля админа (хэш для пароля 'admin123')
INSERT INTO admins (password_hash) VALUES ('$2b$10$rX8jXq8Z5vL9Y2Q8N3X7COGzKqZnZQj7L3Q9Z5vL9Y2Q8N3X7CO');
