import { LoginCard } from "./login-button";

export default function LoginPage() {
  return (
    <div className="absolute flex w-full h-full bg-repeat bg-[length:150px_150px] bg-right-top bg-[conic-gradient(hsl(var(--primary))_90deg,hsl(var(--secondary))_90deg_180deg,hsl(var(--primary))_180deg_270deg,hsl(var(--secondary))_270deg)]">
      <div className="flex justify-center items-center w-2/3 bg-background h-full relative top-0 left-[3rem]">
        <LoginCard />
      </div>
    </div>
  );
}
