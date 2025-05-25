import createHttpError from 'http-errors';
import { MemberRepo } from '../repositories/member.repository.js';
import { MemberCreateInput, MemberUpdateInput } from '../schemas/member.schema.js';

export class MemberService {
  static async createMember(input: MemberCreateInput) {
    return MemberRepo.create(input);
  }

  static async listMembers(page?: number, limit?: number) {
    return MemberRepo.findAll(page, limit);
  }

  static async getMemberById(id: string) {
    const member = await MemberRepo.findById(id);
    if (!member) {
      throw new createHttpError.NotFound(`Member with id ${id} not found`);
    }
    return member;
  }

  static async updateMember(id: string, input: MemberUpdateInput) {
    const updated = await MemberRepo.update(id, input);
    if (!updated) {
      throw new createHttpError.NotFound(`Member with id ${id} not found`);
    }
    return updated;
  }

  static async deleteMember(id: string) {
    const deleted = await MemberRepo.remove(id);
    if (!deleted) {
      throw new createHttpError.NotFound(`Member with id ${id} not found`);
    }
    return deleted;
  }
}
