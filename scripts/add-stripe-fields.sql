-- Add Stripe-related fields to existing tables

-- Add Stripe customer ID to users table
ALTER TABLE users ADD COLUMN stripe_customer_id TEXT;

-- Add Stripe payment intent ID to payments table
ALTER TABLE payments ADD COLUMN stripe_payment_intent_id TEXT;

-- Add payment method information
ALTER TABLE payments ADD COLUMN payment_method_id TEXT;
ALTER TABLE payments ADD COLUMN last_four TEXT;
ALTER TABLE payments ADD COLUMN brand TEXT;

-- Create payment methods table for saved payment methods
CREATE TABLE IF NOT EXISTS payment_methods (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    stripe_payment_method_id TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('card', 'sepa_debit')),
    last_four TEXT,
    brand TEXT,
    exp_month INTEGER,
    exp_year INTEGER,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create subscriptions table for recurring payments
CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    contract_id TEXT NOT NULL REFERENCES contracts(id),
    stripe_subscription_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'incomplete', 'past_due')),
    current_period_start TIMESTAMP NOT NULL,
    current_period_end TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_payment_intent_id ON payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_user_id ON payment_methods(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_contract_id ON subscriptions(contract_id);
