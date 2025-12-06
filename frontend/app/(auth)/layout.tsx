
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-muted">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
