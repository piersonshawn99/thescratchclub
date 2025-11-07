import React from 'react';
import AccountClient from '@/components/account/AccountClient';

export default function AccountPage() {
  return (
    <main className="mx-auto max-w-3xl py-16 px-4">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Your Account</h1>
      <p className="mt-2 text-neutral-600">Manage your membership, billing details, and receipts.</p>

      <React.Suspense fallback={<div>Loading…</div>}>
        <AccountClient />
      </React.Suspense>
    </main>
  );
}