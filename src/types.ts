import {BenchmarksType} from './storages/benchmarks';

export type BenchmarkStatus = {
  name: BenchmarksType;
  status: 'pending' | 'done' | 'error';
  time?: number;
};

export type BenchmarkResult = Record<string, BenchmarkStatus>;
