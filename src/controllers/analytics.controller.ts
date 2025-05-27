// src/controllers/analytics.controller.ts
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { BranchModel } from '../models/branch.model.js';
import { MemberModel } from '../models/member.model.js';
import { PaymentModel } from '../models/payment.model.js';
import { CheckInModel } from '../models/checkin.model.js';
import mongoose from 'mongoose';

export const AnalyticsController = {
  // GET /api/analytics/overview
  async overview(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Total revenue and month-over-month delta
      const now = new Date();
      const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      const [revenueThisMonth, revenueLastMonth] = await Promise.all([
        PaymentModel.aggregate([
          { $match: { date: { $gte: startOfThisMonth } } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ]),
        PaymentModel.aggregate([
          { $match: { date: { $gte: startOfLastMonth, $lt: startOfThisMonth } } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ]),
      ]);

      const totalRevenue = revenueThisMonth[0]?.total || 0;
      const lastRevenue = revenueLastMonth[0]?.total || 1; // avoid divide by zero
      const revenueDelta = ((totalRevenue - lastRevenue) / lastRevenue) * 100;

      // Active members and delta
      const [activeMembers, activeLastMonth] = await Promise.all([
        MemberModel.countDocuments({ isActive: true }).exec(),
        MemberModel.countDocuments({ 
          isActive: true, 
          joinDate: { $lt: startOfThisMonth } 
        }).exec(),
      ]);
      const memberDelta = ((activeMembers - activeLastMonth) / (activeLastMonth || 1)) * 100;

      // Total branches
      const totalBranches = await BranchModel.countDocuments().exec();

      res.json({
        totalRevenue,
        revenueDelta: parseFloat(revenueDelta.toFixed(1)),
        activeMembers,
        memberDelta: parseFloat(memberDelta.toFixed(1)),
        totalBranches,
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/analytics/branch/:branchId/growth
  async branchGrowth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { branchId } = req.params;
      if (!mongoose.isValidObjectId(branchId)) {
        throw new createHttpError.BadRequest('Invalid branchId');
      }
      const now = new Date();
      const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      const [thisCount, lastCount] = await Promise.all([
        MemberModel.countDocuments({
          branchId,
          joinDate: { $gte: startOfThisMonth },
        }).exec(),
        MemberModel.countDocuments({
          branchId,
          joinDate: { $gte: startOfLastMonth, $lt: startOfThisMonth },
        }).exec(),
      ]);

      const growth = ((thisCount - lastCount) / (lastCount || 1)) * 100;
      res.json({
        thisMonth: thisCount,
        lastMonth: lastCount,
        growth: parseFloat(growth.toFixed(1)),
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/analytics/staff/checkins/today
  async todayCheckIns(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const checkIns = await CheckInModel.find({
        timestamp: { $gte: startOfDay },
      }).exec();

      // Count per hour for busiest hour
      const hourlyCounts: Record<string, number> = {};
      checkIns.forEach((ci) => {
        const hr = ci.timestamp.getHours().toString();
        hourlyCounts[hr] = (hourlyCounts[hr] || 0) + 1;
      });
      const busiestHour = Object.entries(hourlyCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

      res.json({
        totalCheckIns: checkIns.length,
        busiestHour: busiestHour ? `${busiestHour}:00` : null,
      });
    } catch (err) {
      next(err);
    }
  },
};
