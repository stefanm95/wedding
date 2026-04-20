import { useState } from "react"
import HeroVideo from "./HeroVideo"
import HeroIntro from "./HeroIntro"

export default function Hero() {
  const [opened, setOpened] = useState(false)

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-primary">
      {/* Layer 1: Video (background final) */}
      <HeroVideo opened={opened} />

      {/* Layer 2: Intro + Curtains */}
      <HeroIntro opened={opened} onOpen={() => setOpened(true)} />
    </div>
  )
}