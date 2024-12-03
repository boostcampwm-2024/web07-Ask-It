import { z } from 'zod';

export const PostUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
  nickname: z.string().min(3).max(20),
});

export const GetVerifyEmailRequestSchema = z.string().email();

export const GetVerifyEmailResponseSchema = z.object({
  exists: z.boolean(),
});

export const GetVerifyNicknameRequestSchema = z.string().min(3).max(20);

export const GetVerifyNicknameResponseSchema = z.object({ exists: z.boolean() });

export type PostUserDTO = z.infer<typeof PostUserSchema>;
export type GetVerifyEmailRequestDTO = z.infer<typeof GetVerifyEmailRequestSchema>;
export type GetVerifyEmailResponseDTO = z.infer<typeof GetVerifyEmailResponseSchema>;
export type GetVerifyNicknameRequestDTO = z.infer<typeof GetVerifyNicknameRequestSchema>;
export type GetVerifyNicknameResponseDTO = z.infer<typeof GetVerifyNicknameResponseSchema>;
