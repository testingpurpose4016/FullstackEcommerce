-- Drop the stripePaymentIntentId column
ALTER TABLE "orders" DROP COLUMN IF EXISTS "stripePaymentIntentId";

-- Add the paymentMethod column
ALTER TABLE "orders" ADD COLUMN "paymentMethod" varchar(50) NOT NULL DEFAULT 'cash_on_delivery';
