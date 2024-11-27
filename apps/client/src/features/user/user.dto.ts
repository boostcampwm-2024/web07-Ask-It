import { z } from 'zod';

export const PostUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  nickname: z.string().min(1),
});

export const GetVerifyEmailSchema = z.object({
  exists: z.boolean(),
});

export const GetVerifyNicknameSchema = z.object({
  exists: z.boolean(),
});

export type GetVerifyEmailDTO = z.infer<typeof GetVerifyEmailSchema>;
export type PostUserDTO = z.infer<typeof PostUserSchema>;
export type GetVerifyNicknameDTO = z.infer<typeof GetVerifyNicknameSchema>;
