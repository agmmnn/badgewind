import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="/api/Badge-Wind?badgeStyle=text-(27px)|border-gray-600|rounded-2xl|text-2xl&leftStyle=bg-(@22272e)|text-rose-50|p-2|rounded-l-xl|h-full|text-2xl&rightStyle=rounded-r-xl|h-full|text-2xl&icon=ri:windy-line&iconStyle=text-cyan-500|h-11|w-11|ml-1"
        alt="BadgeWind"
        height={200}
        width={200}
      />
    </main>
  )
}
