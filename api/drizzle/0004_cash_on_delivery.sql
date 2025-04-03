-- Drop the stripePaymentIntentId column if it exists
ALTER TABLE "orders" DROP COLUMN IF EXISTS "stripePaymentIntentId";

-- Add the paymentMethod column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'orders' 
        AND column_name = 'paymentMethod'
    ) THEN
        ALTER TABLE "orders" ADD COLUMN "paymentMethod" varchar(50) NOT NULL DEFAULT 'cash_on_delivery';
    END IF;
END $$;
