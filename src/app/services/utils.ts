// app/services/utils.ts
/**
 * Helper function to safely extract params from Next.js dynamic routes
 * Works around the "params should be awaited" issue in Next.js 15
 */
export async function getParamValue<T extends object, K extends keyof T>(
    params: T, 
    key: K
  ): Promise<string> {
    try {
      // First try to handle as a promise
      if (params[key] instanceof Promise) {
        return String(await params[key]);
      }
      // Otherwise just return as string
      return String(params[key]);
    } catch (error) {
      console.error(`Error extracting param ${String(key)}:`, error);
      return String(params[key]);
    }
  }