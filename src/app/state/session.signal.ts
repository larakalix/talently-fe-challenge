import type { AuthUser } from './../types/auth.type';
import { signal } from '@angular/core';

export const sessionSignal = signal<AuthUser | null>(null);
