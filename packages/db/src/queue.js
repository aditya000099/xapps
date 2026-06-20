/**
 * @xapps/db — BullMQ Queues
 *
 * Initializes and exports reusable queues for background jobs.
 */

import { Queue, Worker } from 'bullmq';
import { redis } from './redis.js';

if (!redis) {
  console.warn('⚠️ Redis not initialized. Background queues will not work.');
}

/**
 * Create a queue with standard configuration
 * @param {string} name 
 * @returns {Queue}
 */
export function createQueue(name) {
  if (!redis) return null;
  return new Queue(name, { connection: redis });
}

/**
 * Create a worker for a queue
 * @param {string} name 
 * @param {Function} processor 
 * @param {object} options 
 * @returns {Worker}
 */
export function createWorker(name, processor, options = {}) {
  if (!redis) return null;
  
  const worker = new Worker(name, processor, {
    connection: redis,
    concurrency: 5, // Process 5 jobs concurrently by default
    ...options,
  });

  worker.on('failed', (job, err) => {
    console.error(`❌ Job ${job?.id} in queue ${name} failed:`, err);
  });

  return worker;
}

// Core CRM Queues
export const emailQueue = createQueue('crm-emails');
export const webhookQueue = createQueue('crm-webhooks');
export const importQueue = createQueue('crm-imports');
