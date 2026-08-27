"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoBatteryFull, IoCellular, IoMailOutline, IoWifi } from "react-icons/io5";

import { authClient } from "@/lib/auth-client";

function MobileStatusBar() {
  return <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-[54px] items-center justify-between px-8 pl-[52px] text-black sm:hidden">
    <span className="text-[17px] font-semibold leading-[22px]">9:41</span>
    <span className="flex items-center gap-[7px]"><IoCellular className="h-[13px] w-5" /><IoWifi className="h-[14px] w-[18px]" /><IoBatteryFull className="h-[15px] w-7" /></span>
  </div>;
}

export default function LoginPage() {
  const router = useRouter();
  const [showEmail, setShowEmail] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function social(provider: "google" | "apple") {
    setError(null);
    setIsPending(true);
    const result = await authClient.signIn.social({ provider, callbackURL: "/" });
    if (result.error) {
      setError(result.error.message ?? `Could not continue with ${provider}.`);
      setIsPending(false);
    }
  }

  async function email(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsPending(true);
    const fields = new FormData(event.currentTarget);
    const email = String(fields.get("email"));
    const password = String(fields.get("password"));
    const name = String(fields.get("name") || email.split("@")[0]);
    const result = isSignUp
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password });

    if (result.error) {
      setError(result.error.message ?? "Authentication failed. Please try again.");
      setIsPending(false);
      return;
    }
    router.push("/");
    router.refresh();
  }

  const inputClass = "h-11 rounded-lg border border-[#d1d1d6] px-4 text-[13px] outline-none focus:border-black";
  const providerClass = "flex h-11 w-full cursor-pointer items-center justify-center gap-3 rounded-lg border text-[13px] font-medium transition-opacity hover:opacity-80 disabled:cursor-wait disabled:opacity-60";

  return <main className="relative mx-auto flex min-h-dvh w-full max-w-[393px] items-center justify-center overflow-hidden bg-white px-[18px] text-[#181c23] sm:max-w-none">
    <MobileStatusBar />
    <section className="flex w-full max-w-[358px] -translate-y-[1px] flex-col items-center gap-7 text-center">
      <Image src="/login/pencipta-logo.png" alt="Pencipta Community" width={39} height={48} priority className="h-[48px] w-[39px] object-cover" />
      <div className="flex w-full flex-col items-center gap-5">
        <header className="flex w-[331px] max-w-full flex-col items-center gap-1.5">
          <h1 className="text-[24px] font-semibold leading-8 tracking-[-0.48px]">Welcome to Pencipta Community</h1>
          <p className="max-w-[310px] text-[15px] leading-[22px] text-[#636366]">Connecting you to shared experience and knowledge.</p>
        </header>

        {showEmail ? <form onSubmit={email} className="flex w-full flex-col gap-3 text-left">
          {isSignUp && <input name="name" autoComplete="name" placeholder="Name" required className={inputClass} />}
          <input name="email" type="email" autoComplete="email" placeholder="Email" required className={inputClass} />
          <input name="password" type="password" autoComplete={isSignUp ? "new-password" : "current-password"} placeholder="Password" minLength={8} required className={inputClass} />
          <button type="submit" disabled={isPending} className="h-11 cursor-pointer rounded-lg bg-black text-[13px] font-medium text-white disabled:cursor-wait disabled:opacity-60">{isPending ? "Please wait…" : isSignUp ? "Create account" : "Sign in"}</button>
          <button type="button" onClick={() => { setIsSignUp((value) => !value); setError(null); }} className="cursor-pointer text-center text-[12px] text-[#636366] hover:text-black">{isSignUp ? "Already have an account? Sign in" : "New here? Create an account"}</button>
          <button type="button" onClick={() => { setShowEmail(false); setError(null); }} className="cursor-pointer text-center text-[12px] text-[#636366] hover:text-black">Back to all options</button>
        </form> : <div className="flex w-full flex-col gap-4">
          <button type="button" disabled={isPending} onClick={() => social("google")} className={`${providerClass} border-[#d1d1d6] bg-white`}><span className="flex size-5 items-center justify-center"><FcGoogle aria-hidden="true" className="size-5" /></span>Continue with Google</button>
          <button type="button" disabled={isPending} onClick={() => social("apple")} className={`${providerClass} border-[#d1d1d6] bg-white`}><span className="flex size-5 items-center justify-center"><FaApple aria-hidden="true" className="size-5" /></span>Continue with Apple</button>
          <button type="button" onClick={() => setShowEmail(true)} className={`${providerClass} border-black bg-black text-white`}><span className="flex size-5 items-center justify-center"><IoMailOutline aria-hidden="true" className="h-[17px] w-[17px]" /></span>Continue with email</button>
        </div>}

        {error && <p role="alert" className="text-[12px] leading-4 text-red-600">{error}</p>}
        <p className="text-[12px] leading-4 text-[#636366]">By continuing, you agree to our Terms of Service and<br />Privacy Policy.</p>
      </div>
    </section>
    <div aria-hidden="true" className="absolute bottom-2 h-[5px] w-[134px] rounded-full bg-black sm:hidden" />
  </main>;
}
