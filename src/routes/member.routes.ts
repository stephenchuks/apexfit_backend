import { Router } from 'express';
import { MemberController } from '../controllers/member.controller.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authGuard } from '../middleware/authGuard.js';
import { permit } from '../middleware/rbac.js';

const router = Router();

// Only branch-admin or super-admin can manage members
router.get(
  '/',
  authGuard,
  permit('super-admin', 'branch-admin'),
  asyncHandler(MemberController.list),
);
router.post(
  '/',
  authGuard,
  permit('super-admin', 'branch-admin'),
  asyncHandler(MemberController.create),
);
router.get(
  '/:id',
  authGuard,
  permit('super-admin', 'branch-admin'),
  asyncHandler(MemberController.getById),
);
router.put(
  '/:id',
  authGuard,
  permit('super-admin', 'branch-admin'),
  asyncHandler(MemberController.update),
);
router.delete(
  '/:id',
  authGuard,
  permit('super-admin', 'branch-admin'),
  asyncHandler(MemberController.remove),
);

export default router;
