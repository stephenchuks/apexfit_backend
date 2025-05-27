// src/routes/analytics.routes.ts
import { Router } from 'express';
import { authGuard } from '../middleware/authGuard.js';
import { permit } from '../middleware/rbac.js';
import { AnalyticsController } from '../controllers/analytics.controller.js';

const router = Router();

router.get(
  '/overview',
  authGuard,
  permit('super-admin','branch-admin'),
  AnalyticsController.overview
);

router.get(
  '/branch/:branchId/growth',
  authGuard,
  permit('super-admin','branch-admin'),
  AnalyticsController.branchGrowth
);

router.get(
  '/staff/checkins/today',
  authGuard,
  permit('staff','super-admin','branch-admin'),
  AnalyticsController.todayCheckIns
);

export default router;
