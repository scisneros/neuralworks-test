import Image from "next/image";
import neuralClockLogoImg from "public/logo-neuralclocks.svg";
import neuralWorkLogoImg from "public/logo-neuralworks.png";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-16 pt-12 pb-8">
      <div className="flex-grow text-center mt-[10vh] md:mt-[20vh]">
        <Image
          className="mb-8"
          src={neuralClockLogoImg}
          alt="NeuralClocks Logo"
          priority
        />
        <p className="mb-2 text-2xl font-bold">
          Maximize remote productivity with NeuralClocks
        </p>
        <p>
          Efficiently manage your working times and schedules when working from
          home.
        </p>
        <p>
          Streamline operations, boost collaboration, and empower productivity.
        </p>
      </div>
      <div className="pt-6 text-center text-sm">
        Made by
        <Image
          className="mx-2 mt-0.5 inline-block w-28"
          src={neuralWorkLogoImg}
          alt="NeuralWorks Logo"
        />
      </div>
    </main>
  );
}
