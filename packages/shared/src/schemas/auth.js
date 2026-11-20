import { z } from 'zod';
export const LoginSchema = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(200),
});
export const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8).max(200),
});
//# sourceMappingURL=auth.js.map