// src/routes/payment.routes.ts
import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authGuard } from '../middleware/authGuard.js';
import { permit } from '../middleware/rbac.js';

const router = Router();

// Protect all payment routes; only branch-admin and super-admin
router.get(
  '/',
  authGuard,
  permit('super-admin','branch-admin'),
  asyncHandler(PaymentController.list)
);
router.post(
  '/',
  authGuard,
  permit('super-admin','branch-admin'),
  asyncHandler(PaymentController.create)
);
router.get(
  '/:id',
  authGuard,
  permit('super-admin','branch-admin'),
  asyncHandler(PaymentController.getById)
);
router.put(
  '/:id',
  authGuard,
  permit('super-admin','branch-admin'),
  asyncHandler(PaymentController.update)
);
router.delete(
  '/:id',
  authGuard,
  permit('super-admin','branch-admin'),
  asyncHandler(PaymentController.remove)
);

// List payments for specific member
router.get(
  '/member/:memberId',
  authGuard,
  permit('super-admin','branch-admin'),
  asyncHandler(PaymentController.listByMember)
);

export default router;
