-- Create extension needed for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create Enums
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MENTOR', 'MEMBER');
CREATE TYPE "SessionStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELLED');
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');
CREATE TYPE "AttachmentType" AS ENUM ('FILE', 'IMAGE', 'LINK');
CREATE TYPE "ParticipantRole" AS ENUM ('HOST', 'FACILITATOR', 'MEMBER');
CREATE TYPE "EmbeddingProvider" AS ENUM ('OPENAI', 'HUGGINGFACE', 'CUSTOM');

-- Create tables
CREATE TABLE "users" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "email" TEXT NOT NULL,
  "name" TEXT,
  "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
  "avatar_url" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");

CREATE TABLE "sessions" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "title" TEXT NOT NULL,
  "status" "SessionStatus" NOT NULL DEFAULT 'ACTIVE',
  "owner_id" UUID NOT NULL,
  "started_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "ended_at" TIMESTAMPTZ,
  "metadata" JSONB,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "sessions_owner_id_idx" ON "sessions" ("owner_id");

CREATE TABLE "session_participants" (
  "id" SERIAL,
  "session_id" UUID NOT NULL,
  "user_id" UUID NOT NULL,
  "role" "ParticipantRole" NOT NULL DEFAULT 'MEMBER',
  "joined_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "session_participants_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "session_participants_session_id_user_id_key" ON "session_participants" ("session_id", "user_id");
CREATE INDEX "session_participants_user_id_idx" ON "session_participants" ("user_id");

CREATE TABLE "messages" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "session_id" UUID NOT NULL,
  "author_id" UUID,
  "role" "MessageRole" NOT NULL,
  "content" TEXT NOT NULL,
  "metadata" JSONB,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "messages_session_id_created_at_idx" ON "messages" ("session_id", "created_at");

CREATE TABLE "evaluations" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "message_id" UUID NOT NULL,
  "evaluator_id" UUID,
  "score" DOUBLE PRECISION NOT NULL,
  "label" TEXT,
  "notes" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "evaluations_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "evaluations_message_id_idx" ON "evaluations" ("message_id");

CREATE TABLE "attachments" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "message_id" UUID NOT NULL,
  "type" "AttachmentType" NOT NULL,
  "url" TEXT NOT NULL,
  "title" TEXT,
  "description" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "attachments_message_id_idx" ON "attachments" ("message_id");

CREATE TABLE "embeddings" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "message_id" UUID NOT NULL,
  "provider" "EmbeddingProvider" NOT NULL,
  "dimension" INTEGER NOT NULL,
  "vector" DOUBLE PRECISION[] NOT NULL,
  "metadata" JSONB,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "embeddings_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "embeddings_message_id_idx" ON "embeddings" ("message_id");

CREATE TABLE "rncp_titles" (
  "id" SERIAL,
  "code" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "level" TEXT,
  "active" BOOLEAN NOT NULL DEFAULT TRUE,
  "expires_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "rncp_titles_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "rncp_titles_code_key" ON "rncp_titles" ("code");

CREATE TABLE "reac_cache" (
  "id" SERIAL,
  "rncp_title_id" INTEGER NOT NULL,
  "payload" JSONB NOT NULL,
  "fetched_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "reac_cache_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "reac_cache_rncp_title_id_key" ON "reac_cache" ("rncp_title_id");

-- Create Foreign Keys
ALTER TABLE "sessions"
  ADD CONSTRAINT "sessions_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "session_participants"
  ADD CONSTRAINT "session_participants_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "session_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "messages"
  ADD CONSTRAINT "messages_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "messages_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "evaluations"
  ADD CONSTRAINT "evaluations_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "evaluations_evaluator_id_fkey" FOREIGN KEY ("evaluator_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "attachments"
  ADD CONSTRAINT "attachments_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "embeddings"
  ADD CONSTRAINT "embeddings_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "reac_cache"
  ADD CONSTRAINT "reac_cache_rncp_title_id_fkey" FOREIGN KEY ("rncp_title_id") REFERENCES "rncp_titles" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
