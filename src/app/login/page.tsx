import Image from "next/image";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoBatteryFull, IoCellular, IoMailOutline, IoWifi } from "react-icons/io5";

const providers = [
  { label: "Continue with Google", icon: FcGoogle, iconClassName: "size-5", className: "border border-[#d1d1d6] bg-white text-[#181c23]" },
  { label: "Continue with Apple", icon: FaApple, iconClassName: "size-5", className: "border border-[#d1d1d6] bg-white text-[#181c23]" },
  { label: "Continue with email", icon: IoMailOutline, iconClassName: "h-[17px] w-[17px]", className: "border border-black bg-black text-white" },
] as const;

function MobileStatusBar() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-[54px] items-center justify-between px-8 pl-[52px] text-black sm:hidden">
      <span className="text-[17px] font-semibold leading-[22px]">9:41</span>
      <span className="flex items-center gap-[7px]">
        <IoCellular className="h-[13px] w-5" />
        <IoWifi className="h-[14px] w-[18px]" />
        <IoBatteryFull className="h-[15px] w-7" />
      </span>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-[393px] items-center justify-center overflow-hidden bg-white px-[18px] text-[#181c23] sm:max-w-none">
      <MobileStatusBar />
      <section className="flex w-full max-w-[358px] -translate-y-[1px] flex-col items-center gap-7 text-center">
        <Image src="/login/pencipta-logo.png" alt="Pencipta Community" width={39} height={48} priority className="h-[48px] w-[39px] object-cover" />
        <div className="flex w-full flex-col items-center gap-5">
          <header className="flex w-[331px] max-w-full flex-col items-center gap-1.5">
            <h1 className="text-[24px] font-semibold leading-8 tracking-[-0.48px]">Welcome to Pencipta Community</h1>
            <p className="max-w-[310px] text-[15px] leading-[22px] text-[#636366]">Connecting you to shared experience and knowledge.</p>
          </header>
          <div className="flex w-full flex-col gap-4">
            {providers.map((provider) => {
              const Icon = provider.icon;

              return <button key={provider.label} type="button" className={`flex h-11 w-full cursor-pointer items-center justify-center gap-3 rounded-lg text-[13px] font-medium leading-[18px] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${provider.className}`}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                  <Icon aria-hidden="true" className={provider.iconClassName} />
                </span>
                <span>{provider.label}</span>
              </button>;
            })}
          </div>
          <p className="text-[12px] leading-4 text-[#636366]">By continuing, you agree to our Terms of Service and<br />Privacy Policy.</p>
        </div>
      </section>
      <div aria-hidden="true" className="absolute bottom-2 h-[5px] w-[134px] rounded-full bg-black sm:hidden" />
    </main>
  );
}
