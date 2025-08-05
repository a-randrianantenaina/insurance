-- Create database tables for the insurance website

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    city TEXT,
    zip_code TEXT,
    country TEXT DEFAULT 'France',
    role TEXT DEFAULT 'CLIENT' CHECK (role IN ('CLIENT', 'ADMIN')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insurance offers table
CREATE TABLE IF NOT EXISTS insurance_offers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    coverage TEXT[] NOT NULL,
    features TEXT[] NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contracts table
CREATE TABLE IF NOT EXISTS contracts (
    id TEXT PRIMARY KEY,
    contract_number TEXT UNIQUE NOT NULL,
    user_id TEXT NOT NULL REFERENCES users(id),
    offer_id TEXT NOT NULL REFERENCES insurance_offers(id),
    status TEXT DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PENDING_SIGNATURE', 'ACTIVE', 'CANCELLED', 'EXPIRED')),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    monthly_premium DECIMAL(10,2) NOT NULL,
    signed_at TIMESTAMP,
    document_url TEXT,
    personal_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    contract_id TEXT NOT NULL REFERENCES contracts(id),
    amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'FAILED', 'CANCELLED')),
    payment_method TEXT NOT NULL,
    stripe_payment_id TEXT,
    due_date TIMESTAMP NOT NULL,
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'UNREAD' CHECK (status IN ('UNREAD', 'READ', 'REPLIED')),
    is_from_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample insurance offers
INSERT INTO insurance_offers (id, name, description, price, coverage, features) VALUES
('auto-essentiel', 'Auto Essentiel', 'Protection de base pour votre véhicule', 29.99, 
 ARRAY['Responsabilité civile', 'Défense pénale'], 
 ARRAY['Responsabilité civile obligatoire', 'Défense pénale et recours', 'Assistance panne 0 km', 'Protection juridique']),
('auto-confort', 'Auto Confort', 'Protection étendue avec garanties supplémentaires', 49.99,
 ARRAY['Responsabilité civile', 'Vol et incendie', 'Bris de glace'],
 ARRAY['Toutes garanties Essentiel', 'Vol et incendie', 'Bris de glace', 'Catastrophes naturelles', 'Assistance étendue']),
('auto-premium', 'Auto Premium', 'Protection maximale tous risques', 79.99,
 ARRAY['Tous risques', 'Valeur à neuf', 'Véhicule de remplacement'],
 ARRAY['Toutes garanties Confort', 'Tous risques collision', 'Valeur à neuf 2 ans', 'Véhicule de remplacement', 'Équipements personnels']),
('habitation-base', 'Habitation Base', 'Protection essentielle pour votre logement', 19.99,
 ARRAY['Multirisque habitation', 'Responsabilité civile'],
 ARRAY['Multirisque habitation', 'Responsabilité civile vie privée', 'Incendie et explosion', 'Dégâts des eaux', 'Vol et vandalisme']),
('habitation-plus', 'Habitation Plus', 'Protection complète avec services étendus', 34.99,
 ARRAY['Multirisque habitation', 'Assistance 24h/24'],
 ARRAY['Toutes garanties Base', 'Bris de glace', 'Catastrophes naturelles', 'Assistance habitation 24h/24', 'Remboursement valeur à neuf']),
('sante-famille', 'Santé Famille', 'Couverture santé complète pour toute la famille', 89.99,
 ARRAY['Remboursement étendu', 'Médecines douces', 'Téléconsultation'],
 ARRAY['Remboursement jusqu''à 300%', 'Médecines douces incluses', 'Téléconsultation illimitée', 'Dentaire et optique renforcés', 'Hospitalisation premium']);
