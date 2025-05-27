// src/routes/branch.routes.ts
import { Router } from 'express';
import {
  createBranch,
  listBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} from '../controllers/branch.controller.js';
import { authGuard } from '../middleware/authGuard.js';
import { permit }    from '../middleware/rbac.js';
import { cache }     from '../middleware/cache.js';

const router = Router();

// GET /api/branches?page=&limit=
router.get(
  '/',
  authGuard,
  permit('super-admin', 'branch-admin'),
  cache('branches', 60),
  listBranches
);

// POST /api/branches
router.post(
  '/',
  authGuard,
  permit('super-admin'),
  createBranch
);

// GET /api/branches/:id
router.get(
  '/:id',
  authGuard,
  permit('super-admin', 'branch-admin'),
  getBranchById
);

// PUT /api/branches/:id
router.put(
  '/:id',
  authGuard,
  permit('super-admin'),
  updateBranch
);

// DELETE /api/branches/:id
router.delete(
  '/:id',
  authGuard,
  permit('super-admin'),
  deleteBranch
);

export default router;
