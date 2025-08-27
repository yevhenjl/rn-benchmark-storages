const iterations = 1000;

export async function benchmark(fn: () => unknown | Promise<unknown>): Promise<number> {
  try {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      const r = fn();
      if (r instanceof Promise) {
        await r;
      }
    }
    const end = performance.now();
    const diff = end - start;
    return diff;
  } catch (e) {
    return 0;
  }
}

export async function waitForGC(): Promise<void> {
  // Wait for Garbage Collection to run. We give a 500ms delay.
  return new Promise((r) => setTimeout(r, 500));
}
