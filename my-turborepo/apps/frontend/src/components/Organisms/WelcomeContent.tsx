import WelcomeContentGridSlides from "@/Components/Organisms/WelcomeContentGridSlides";

export default function WelcomeContent({ name }: { name: string }) {
  return (
    <div className="relative mb-16">
      <div className="absolute z-0 h-[220px] w-full bg-[url('/images/olympic.webp')] bg-cover bg-center bg-no-repeat brightness-50"></div>
      <div className="relative mx-auto flex max-w-[1450px] justify-between">
        <p className="ml-8 py-6 text-3xl font-semibold text-gray-100 xs:text-2xl">
          Welcome back, {name}
        </p>
        <p className="px-1 py-6 text-lg font-semibold text-gray-300">
          Made on Fiverr
        </p>
      </div>
      <div className="mx-auto max-w-[1450px]">
        <WelcomeContentGridSlides />
      </div>
    </div>
  );
}
