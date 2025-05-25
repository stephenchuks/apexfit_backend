import { z } from 'zod';
import { MemberService } from '../services/member.service.js';
import { MemberCreateSchema, MemberUpdateSchema } from '../schemas/member.schema.js';
export const MemberController = {
    async create(req, res, next) {
        try {
            const input = MemberCreateSchema.parse(req.body);
            const member = await MemberService.createMember(input);
            res.status(201).json(member);
            return;
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                res.status(400).json({ errors: err.flatten() });
                return;
            }
            next(err);
        }
    },
    async list(req, res, next) {
        try {
            const page = parseInt(req.query.page || '1', 10);
            const limit = parseInt(req.query.limit || '20', 10);
            const result = await MemberService.listMembers(page, limit);
            res.json(result);
            return;
        }
        catch (err) {
            next(err);
        }
    },
    async getById(req, res, next) {
        try {
            const member = await MemberService.getMemberById(req.params.id);
            res.json(member);
            return;
        }
        catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            const input = MemberUpdateSchema.parse(req.body);
            const updated = await MemberService.updateMember(req.params.id, input);
            res.json(updated);
            return;
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                res.status(400).json({ errors: err.flatten() });
                return;
            }
            next(err);
        }
    },
    async remove(req, res, next) {
        try {
            await MemberService.deleteMember(req.params.id);
            res.status(204).end();
            return;
        }
        catch (err) {
            next(err);
        }
    },
};
