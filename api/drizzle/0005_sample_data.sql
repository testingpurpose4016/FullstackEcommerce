-- Insert sample products if they don't exist
INSERT INTO "products" ("name", "description", "image", "price")
SELECT 'AirPods Pro', 'Apple''s wireless noise-cancelling earbuds with adaptive transparency and spatial audio.', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/airpodspro.jpg', 249.99
WHERE NOT EXISTS (SELECT 1 FROM "products" WHERE "name" = 'AirPods Pro');

INSERT INTO "products" ("name", "description", "image", "price")
SELECT 'Apple Watch Series 9', 'Latest smartwatch from Apple featuring always-on retina display and advanced health monitoring.', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/applewatch.jpg', 399.99
WHERE NOT EXISTS (SELECT 1 FROM "products" WHERE "name" = 'Apple Watch Series 9');

INSERT INTO "products" ("name", "description", "image", "price")
SELECT 'Bose Noise Cancelling Headphones', 'Premium noise-cancelling over-ear headphones with 20 hours of battery life and voice assistant integration.', 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/boseheadphones.jpg', 349.99
WHERE NOT EXISTS (SELECT 1 FROM "products" WHERE "name" = 'Bose Noise Cancelling Headphones');

-- Insert a sample user if it doesn't exist
INSERT INTO "users" ("email", "password", "role", "name", "address")
SELECT 'user@example.com', '$2a$10$6Bnv6uDGj8RLsQQvTGRQz.x6JCRjUG.ZR3WDUcwYm9tbjQYfAJQEK', 'user', 'John Doe', '123 Main St, Anytown, USA'
WHERE NOT EXISTS (SELECT 1 FROM "users" WHERE "email" = 'user@example.com');
