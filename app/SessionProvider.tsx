// SessionProvider.tsx
import { SessionProvider as Provider } from 'next-auth/react';
import type { Session } from 'next-auth';

type Props = {
  children: React.ReactNode;
  session?: Session; // Correctly define the session type here
};

export default function SessionProvider({ children, session }: Props) {
  return (
    <Provider session={session}>
      {children}
    </Provider>
  );
}
