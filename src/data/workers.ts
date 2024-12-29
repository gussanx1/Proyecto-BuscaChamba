import { electricalWorkers } from './electricalWorkers';
import { cleaningWorkers } from './cleaningWorkers';
import { plumbingWorkers } from './plumbingWorkers';
import { paintingWorkers } from './paintingWorkers';
import { masonryWorkers } from './masonryWorkers';
import { transportWorkers } from './transportWorkers';
import { securityWorkers } from './securityWorkers';
import { gardeningWorkers } from './gardeningWorkers';
import { greenAreaWorkers } from './greenAreaWorkers';
import { carpentryWorkers } from './carpentryWorkers';

// Helper function to offset IDs for each category
const offsetWorkerIds = (workers: any[], offset: number) => {
  return workers.map(worker => ({
    ...worker,
    id: worker.id + offset
  }));
};

// Offset IDs for each category to ensure uniqueness
const cleaningWorkersWithOffset = offsetWorkerIds(cleaningWorkers, 0); // IDs 1-8
const electricalWorkersWithOffset = offsetWorkerIds(electricalWorkers, 1000); // IDs 1001-1008
const plumbingWorkersWithOffset = offsetWorkerIds(plumbingWorkers, 2000); // IDs 2001-2008

// Combine all workers
export const workers = [
  ...cleaningWorkersWithOffset,
  ...electricalWorkersWithOffset,
  ...plumbingWorkersWithOffset,
  ...carpentryWorkers,
  ...paintingWorkers,
  ...masonryWorkers,
  ...transportWorkers,
  ...securityWorkers,
  ...gardeningWorkers,
  ...greenAreaWorkers
];