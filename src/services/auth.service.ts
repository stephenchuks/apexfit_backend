import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { UserRepo } from '../repositories/user.repository.js';
import { RegisterInput, LoginInput } from '../schemas/auth.schema.js';

const JWT_SECRET = process.env.JWT_SECRET!;
const SALT_ROUNDS = 10;

export class AuthService {
  static async register(input: RegisterInput) {
    const existing = await UserRepo.findByEmail(input.email);
    if (existing) throw new createHttpError.Conflict('Email already in use');

    const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
    const user = await UserRepo.create({ ...input, passwordHash });
    return { id: user.id, email: user.email, role: user.role };
  }

  static async login(input: LoginInput) {
    const user = await UserRepo.findByEmail(input.email);
    if (!user) throw new createHttpError.Unauthorized('Invalid credentials');

    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) throw new createHttpError.Unauthorized('Invalid credentials');

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );
    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }
}
