import { InjectionToken } from '@angular/core';

// Define InjectionToken for Browser's localStorage
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage
});
