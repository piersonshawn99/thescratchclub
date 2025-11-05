export default function SignInPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Member Sign In</h1>
      <p className="mt-3 text-neutral-600">
        Sign in to view leagues, membership info, coach contacts, and more.
      </p>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        {/* Email/password placeholders for later */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            disabled
            title="Coming soon"
          >
            Sign In (coming soon)
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <button
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium hover:border-emerald-500 hover:text-emerald-700"
            disabled
            title="Coming soon"
          >
            Continue with Google (coming soon)
          </button>
          <button
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium hover:border-emerald-500 hover:text-emerald-700"
            disabled
            title="Coming soon"
          >
            Continue with Apple (coming soon)
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-neutral-600">
          No account yet? Membership sign-up is coming soon.
        </p>
      </div>
    </main>
  );
}
