import { z } from 'zod';

export const userRoleSchema = z.enum(['ADMIN', 'MENTOR', 'MEMBER']);
export type UserRole = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().trim().min(1).nullish(),
  role: userRoleSchema,
  avatarUrl: z.string().url().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type User = z.infer<typeof userSchema>;

export const sessionStatusSchema = z.enum(['ACTIVE', 'COMPLETED', 'CANCELLED']);
export type SessionStatus = z.infer<typeof sessionStatusSchema>;

export const sessionSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(1),
  status: sessionStatusSchema,
  ownerId: z.string().uuid(),
  startedAt: z.date(),
  endedAt: z.date().nullish(),
  metadata: z.unknown().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Session = z.infer<typeof sessionSchema>;

export const participantRoleSchema = z.enum(['HOST', 'FACILITATOR', 'MEMBER']);
export type ParticipantRole = z.infer<typeof participantRoleSchema>;

export const sessionParticipantSchema = z.object({
  id: z.number().int(),
  sessionId: z.string().uuid(),
  userId: z.string().uuid(),
  role: participantRoleSchema,
  joinedAt: z.date(),
});
export type SessionParticipant = z.infer<typeof sessionParticipantSchema>;

export const messageRoleSchema = z.enum(['USER', 'ASSISTANT', 'SYSTEM']);
export type MessageRole = z.infer<typeof messageRoleSchema>;

export const messageSchema = z.object({
  id: z.string().uuid(),
  sessionId: z.string().uuid(),
  authorId: z.string().uuid().nullable(),
  role: messageRoleSchema,
  content: z.string().min(1),
  metadata: z.unknown().nullish(),
  createdAt: z.date(),
});
export type Message = z.infer<typeof messageSchema>;

export const evaluationSchema = z.object({
  id: z.string().uuid(),
  messageId: z.string().uuid(),
  evaluatorId: z.string().uuid().nullable(),
  score: z.number().finite(),
  label: z.string().trim().min(1).nullish(),
  notes: z.string().trim().min(1).nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Evaluation = z.infer<typeof evaluationSchema>;

export const attachmentTypeSchema = z.enum(['FILE', 'IMAGE', 'LINK']);
export type AttachmentType = z.infer<typeof attachmentTypeSchema>;

export const attachmentSchema = z.object({
  id: z.string().uuid(),
  messageId: z.string().uuid(),
  type: attachmentTypeSchema,
  url: z.string().url(),
  title: z.string().trim().min(1).nullish(),
  description: z.string().trim().min(1).nullish(),
  createdAt: z.date(),
});
export type Attachment = z.infer<typeof attachmentSchema>;

export const embeddingProviderSchema = z.enum(['OPENAI', 'HUGGINGFACE', 'CUSTOM']);
export type EmbeddingProvider = z.infer<typeof embeddingProviderSchema>;

export const embeddingSchema = z.object({
  id: z.string().uuid(),
  messageId: z.string().uuid(),
  provider: embeddingProviderSchema,
  dimension: z.number().int().positive(),
  vector: z.array(z.number().finite()).min(1),
  metadata: z.unknown().nullish(),
  createdAt: z.date(),
});
export type Embedding = z.infer<typeof embeddingSchema>;

export const rncpTitleSchema = z.object({
  id: z.number().int().positive(),
  code: z.string().trim().min(1),
  label: z.string().trim().min(1),
  level: z.string().trim().min(1).nullish(),
  active: z.boolean(),
  expiresAt: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type RncpTitle = z.infer<typeof rncpTitleSchema>;

export const reacCacheSchema = z.object({
  id: z.number().int().positive(),
  rncpTitleId: z.number().int().positive(),
  payload: z.unknown(),
  fetchedAt: z.date(),
});
export type ReacCache = z.infer<typeof reacCacheSchema>;
