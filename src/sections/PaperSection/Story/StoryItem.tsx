import PaperImage from "@components/PaperImage";
import { cn } from "@utils/cn";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { StoryItemType } from "./storyData";

type Props = {
  item: StoryItemType;
};

const reveal: Pick<
  HTMLMotionProps<"div">,
  "initial" | "whileInView" | "viewport" | "transition"
> = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" },
};

const textClass = "max-w-[480px]";
const imageClass = "w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]";

function renderContent(item: StoryItemType) {
  if (!item.content) return null;

  return item.content.map((block, i) => {
    if (block.type === "spacer") {
      return <div key={i} className="h-4" />;
    }

    if (block.type === "quote") {
      return (
        <p
          key={i}
          className="script-cormorant-display my-4 whitespace-pre-line text-[24px] italic text-[#5a1e28]"
        >
          „{block.text}”
        </p>
      );
    }

    if (block.type === "highlight") {
      return (
        <p key={i} className="my-3 text-[18px] font-medium tracking-wide text-[#5a1e28]">
          {block.text}
        </p>
      );
    }

    // ✅ aici TypeScript știe că e paragraph
    return (
      <p key={i} className="script-cormorant-display text-[16px] leading-[1.9] text-[#5a1e28]/75">
        {block.text}
      </p>
    );
  });
}

function StoryImage({ item, isLeft }: { item: StoryItemType; isLeft: boolean }) {
  if (!item.image) return null;

  return (
    <div className={cn("flex justify-end", !isLeft && "lg:order-1")}>
      <div
        className={imageClass}
        style={{
          transform: `rotate(${isLeft ? "0.5deg" : "-0.5deg"})`,
        }}
      >
        <div className="p-3">
          <div className="aspect-square overflow-hidden">
            <PaperImage src={item.image} alt={item.title} />
          </div>
        </div>
      </div>
    </div>
  );
}

function EventItem({ item, isLeft }: { item: StoryItemType; isLeft: boolean }) {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20">
      <div className={cn("mx-auto w-full", textClass, !isLeft && "lg:order-2")}>
        <p className="mb-5 text-[12px] uppercase tracking-[0.45em] text-[#5a1e28]/55">
          {item.date}
        </p>

        <div className="border-y border-[#5a1e28]/15 py-8">
          <h3 className="script-gary-display mb-5 text-[30px] leading-[1.25] text-[#5a1e28] md:text-[36px]">
            {item.title}
          </h3>

          <div className="space-y-3">{renderContent(item)}</div>

          <div className="mt-6 space-y-2 text-[15px] uppercase tracking-[0.18em] text-[#5a1e28]/70">
            {item.time && <p>{item.time}</p>}
            {item.location && <p>{item.location}</p>}
          </div>

          {item.mapLink && (
            <a
              href={item.mapLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex border border-[#c9a46c] px-6 py-3 text-xs uppercase tracking-[0.3em] text-[#5a1e28] transition hover:bg-[#5a1e28] hover:text-white"
            >
              Vezi harta
            </a>
          )}
        </div>
      </div>

      <StoryImage item={item} isLeft={isLeft} />
    </div>
  );
}

function NarrativeItem({ item, isLeft }: { item: StoryItemType; isLeft: boolean }) {
  return (
    <div className="mx-auto grid min-h-[26em] max-w-6xl items-start gap-12 md:gap-16 lg:grid-cols-2 lg:gap-40">
      <div className={cn("mx-auto w-full text-left", textClass, !isLeft && "lg:order-2")}>
        <h3 className="script-gary-display mb-4 leading-[1.3] text-[#5a1e28] md:text-[24px]">
          {item.title}
        </h3>

        <div className="space-y-3">{renderContent(item)}</div>
      </div>

      <StoryImage item={item} isLeft={isLeft} />
    </div>
  );
}

export default function StoryItem({ item }: Props) {
  const isLeft = item.side !== "right";
  const isEvent = item.type === "event";

  return (
    <motion.div
      {...reveal}
      className={cn(
        "relative",

        // 🎯 BASE rhythm (narrative)
        "mt-20 md:mt-28 lg:mt-32",

        // 🔥 EVENTS → stronger separation
        isEvent && "mt-32 md:mt-44 lg:mt-56",
      )}
    >
      {isEvent ? (
        <EventItem item={item} isLeft={isLeft} />
      ) : (
        <NarrativeItem item={item} isLeft={isLeft} />
      )}
    </motion.div>
  );
}
