import createHttpError from 'http-errors';
import { MemberRepo } from '../repositories/member.repository.js';
export class MemberService {
    static async createMember(input) {
        return MemberRepo.create(input);
    }
    static async listMembers(page, limit) {
        return MemberRepo.findAll(page, limit);
    }
    static async getMemberById(id) {
        const member = await MemberRepo.findById(id);
        if (!member) {
            throw new createHttpError.NotFound(`Member with id ${id} not found`);
        }
        return member;
    }
    static async updateMember(id, input) {
        const updated = await MemberRepo.update(id, input);
        if (!updated) {
            throw new createHttpError.NotFound(`Member with id ${id} not found`);
        }
        return updated;
    }
    static async deleteMember(id) {
        const deleted = await MemberRepo.remove(id);
        if (!deleted) {
            throw new createHttpError.NotFound(`Member with id ${id} not found`);
        }
        return deleted;
    }
}
