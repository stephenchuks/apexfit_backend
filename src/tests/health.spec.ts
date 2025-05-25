// tests/health.spec.ts
import request from 'supertest';
import { describe, it, jest } from '@jest/globals';
import { app } from '..//app.js';

describe('📡 Health Check', () => {
  it('should return 200 on GET /', async () => {
    await request(app)
      .get('/')
      .expect(200, 'ApexFit Backend is running!');
  });
});
