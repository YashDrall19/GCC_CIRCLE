import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-xl">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center text-white">Login to GCC Circle</h1>
        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#D2A679] text-sm"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#D2A679] text-sm"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 rounded-xl bg-[#D2A679] text-white font-semibold hover:bg-[#B87333] transition-colors text-sm sm:text-base"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center text-white/60 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/join" className="text-[#D2A679] hover:underline font-medium">Join now</Link>
        </div>
      </div>
    </div>
  );
}
