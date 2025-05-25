import { Router } from 'express';
import { BranchController } from '../controllers/branch.controller.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authGuard } from '../middleware/authGuard.js';
import { permit } from '../middleware/rbac.js';

const router = Router();

// Public listing? Or protect with roles as needed:
router.get('/', authGuard, permit('super-admin', 'branch-admin'), asyncHandler(BranchController.list));
router.post('/', authGuard, permit('super-admin'), asyncHandler(BranchController.create));
router.get('/:id', authGuard, permit('super-admin', 'branch-admin'), asyncHandler(BranchController.getById));
router.put('/:id', authGuard, permit('super-admin'), asyncHandler(BranchController.update));
router.delete('/:id', authGuard, permit('super-admin'), asyncHandler(BranchController.remove));

export default router;
