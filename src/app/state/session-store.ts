import type { AuthUser } from '../types/auth.type';
import { Injectable } from '@angular/core';
import { StateCreator, ZustandBaseService } from 'ngx-zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export type SessionState = {
  session: AuthUser | null;
  setSession: (session: AuthUser | null) => void;
};

@Injectable({
  providedIn: 'root',
})
export class SessionStateService extends ZustandBaseService<SessionState> {
  initStore(): StateCreator<SessionState> {
    return (set) => ({
      session: null,
      setSession: (session: AuthUser | null) => set({ session }),
    });
  }

  override createStore() {
    return createStore(
      persist<SessionState>(this.initStore(), {
        name: 'session-storage',
        storage: createJSONStorage(() => sessionStorage),
      })
    );
  }
}
