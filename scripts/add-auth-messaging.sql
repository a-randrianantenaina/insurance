-- Add authentication and messaging tables

-- Add password field to users table
ALTER TABLE users ADD COLUMN password TEXT;

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    type TEXT NOT NULL CHECK (type IN ('MESSAGE', 'PAYMENT', 'CONTRACT', 'SYSTEM')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create message threads table
CREATE TABLE IF NOT EXISTS message_threads (
    id TEXT PRIMARY KEY,
    subject TEXT NOT NULL,
    status TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLOSED', 'PENDING')),
    priority TEXT DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    assigned_to TEXT,
    created_by TEXT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create message thread participants table
CREATE TABLE IF NOT EXISTS message_thread_participants (
    id TEXT PRIMARY KEY,
    thread_id TEXT NOT NULL REFERENCES message_threads(id),
    user_id TEXT NOT NULL REFERENCES users(id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(thread_id, user_id)
);

-- Update messages table to link to threads
ALTER TABLE messages DROP COLUMN subject;
ALTER TABLE messages DROP COLUMN status;
ALTER TABLE messages ADD COLUMN thread_id TEXT REFERENCES message_threads(id);
ALTER TABLE messages ADD COLUMN sender_id TEXT NOT NULL REFERENCES users(id);
ALTER TABLE messages ADD COLUMN attachments JSONB;

-- Create message attachments table
CREATE TABLE IF NOT EXISTS message_attachments (
    id TEXT PRIMARY KEY,
    message_id TEXT NOT NULL REFERENCES messages(id),
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin roles table
CREATE TABLE IF NOT EXISTS admin_roles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    permissions JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user roles assignment table
CREATE TABLE IF NOT EXISTS user_role_assignments (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    role_id TEXT NOT NULL REFERENCES admin_roles(id),
    assigned_by TEXT NOT NULL REFERENCES users(id),
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, role_id)
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_message_threads_status ON message_threads(status);
CREATE INDEX IF NOT EXISTS idx_message_threads_priority ON message_threads(priority);
CREATE INDEX IF NOT EXISTS idx_message_thread_participants_thread_id ON message_thread_participants(thread_id);
CREATE INDEX IF NOT EXISTS idx_message_thread_participants_user_id ON message_thread_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_thread_id ON messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_user_role_assignments_user_id ON user_role_assignments(user_id);

-- Insert default admin roles
INSERT INTO admin_roles (id, name, description, permissions) VALUES
('super-admin', 'Super Administrateur', 'Accès complet à toutes les fonctionnalités', 
 '{"users": ["read", "write", "delete"], "contracts": ["read", "write", "delete"], "payments": ["read", "write"], "messages": ["read", "write"], "settings": ["read", "write"]}'),
('support-admin', 'Administrateur Support', 'Gestion des utilisateurs et support client',
 '{"users": ["read", "write"], "contracts": ["read", "write"], "messages": ["read", "write"]}'),
('finance-admin', 'Administrateur Finance', 'Gestion des paiements et contrats',
 '{"contracts": ["read", "write"], "payments": ["read", "write"], "messages": ["read"]}');

-- Insert sample notifications
INSERT INTO notifications (id, user_id, type, title, message, action_url) VALUES
('notif-1', (SELECT id FROM users WHERE email LIKE '%@email.com' LIMIT 1), 'MESSAGE', 'Nouveau message', 'Vous avez reçu un nouveau message de l''équipe support', '/client/messages'),
('notif-2', (SELECT id FROM users WHERE email LIKE '%@email.com' LIMIT 1), 'PAYMENT', 'Paiement confirmé', 'Votre paiement de 49.99€ a été traité avec succès', '/client/payments'),
('notif-3', (SELECT id FROM users WHERE email LIKE '%@email.com' LIMIT 1), 'CONTRACT', 'Contrat renouvelé', 'Votre contrat AUTO-2024-001 a été renouvelé automatiquement', '/client/contracts');

-- Insert sample message threads
INSERT INTO message_threads (id, subject, status, priority, created_by) VALUES
('thread-1', 'Question sur mon contrat auto', 'OPEN', 'MEDIUM', (SELECT id FROM users WHERE email LIKE '%@email.com' LIMIT 1)),
('thread-2', 'Problème de paiement', 'OPEN', 'HIGH', (SELECT id FROM users WHERE email LIKE '%@email.com' LIMIT 1));

-- Insert thread participants
INSERT INTO message_thread_participants (id, thread_id, user_id) VALUES
('part-1', 'thread-1', (SELECT id FROM users WHERE email LIKE '%@email.com' LIMIT 1)),
('part-2', 'thread-1', (SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1)),
('part-3', 'thread-2', (SELECT id FROM users WHERE email LIKE '%@email.com' LIMIT 1)),
('part-4', 'thread-2', (SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1));
