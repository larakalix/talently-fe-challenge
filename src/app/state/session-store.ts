import type { AuthUser } from '../types/auth.type';
import { Injectable, signal, computed, effect } from '@angular/core';
import { isBrowser } from '../utils/utils.methods';

export type SessionState = {
  session: AuthUser | null;
};

export const SESSION_STORAGE_KEY = 'session-store';

@Injectable({
  providedIn: 'root',
})
export class SessionStateService {
  private readonly _session = signal<SessionState>(this.loadSession());

  readonly session = computed(() => this._session());

  constructor() {
    effect(() => {
      if (!isBrowser()) return;

      const current = this._session();
      if (current) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(current));
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    });
  }

  setSession(user: AuthUser): void {
    this._session.set({
      session: user,
    });
  }

  clearSession(): void {
    this._session.set({
      session: null,
    });
  }

  private loadSession(): SessionState {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as SessionState;
      }
      return { session: null };
    } catch {
      return { session: null };
    }
  }
}
