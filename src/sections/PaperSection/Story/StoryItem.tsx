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

const textClass = "w-full max-w-[92vw] sm:max-w-[540px] lg:max-w-[480px]";

const imageClass = "w-full max-w-[82vw] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[480px]";

function renderContent(item: StoryItemType) {
  return item.content.map((block, i) => {
    if (block.type === "spacer") {
      return <div key={i} className="h-6" />;
    }

    if (block.type === "quote") {
      return (
        <p
          key={i}
          className="script-cormorant-display whitespace-pre-line text-[21px] italic leading-[1.4] text-[#5a1e28] sm:text-[24px] lg:text-[26px]"
        >
          “{block.text}”
        </p>
      );
    }

    if (block.type === "highlight") {
      return (
        <p
          key={i}
          className="script-gary-display text-[18px] font-medium leading-[1.5] tracking-[0.02em] text-[#5a1e28] sm:text-[20px] lg:text-[22px]"
        >
          {block.text}
        </p>
      );
    }

    return (
      <p
        key={i}
        className="script-cormorant-display text-[16px] leading-[1.75] text-[#5a1e28]/75 sm:text-[18px] sm:leading-[1.85] lg:text-[21px] lg:leading-[1.9]"
      >
        {block.text}
      </p>
    );
  });
}

function StoryImage({ item, isLeft }: { item: StoryItemType; isLeft: boolean }) {
  if (!item.image) return null;

  return (
    <div
      className={cn(
        // MOBILE
        "flex w-full justify-center",

        // DESKTOP
        "lg:sticky lg:mt-4 lg:justify-end",

        !isLeft && "lg:order-1",

        item.offset?.image,
      )}
    >
      <div
        className={imageClass}
        style={{
          transform: `rotate(${isLeft ? "0.5deg" : "-0.5deg"})`,
        }}
      >
        <div className="p-2 sm:p-3">
          <div className="aspect-[5/6] overflow-hidden lg:aspect-[3/4]">
            <PaperImage src={item.image} alt={item.title} />
          </div>
        </div>
      </div>
    </div>
  );
}

function EventItem({ item, isLeft }: { item: StoryItemType; isLeft: boolean }) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-6xl items-center gap-8 sm:gap-10 md:gap-16 lg:grid-cols-2 lg:gap-14 xl:gap-28",

        item.offset?.wrapper,
      )}
    >
      <div
        className={cn(
          "mx-auto w-full",
          textClass,

          !isLeft && "lg:order-2",

          item.offset?.text,
        )}
      >
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
    <div
      className={cn(
        // MOBILE
        "mx-auto flex flex-col items-center gap-10 md:px-6",

        // DESKTOP
        "lg:grid lg:max-w-6xl lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-28",

        item.side === "left" ? "lg:-mt-0" : "lg:-mt-4",

        item.offset?.wrapper,
      )}
    >
      <div
        className={cn(
          "w-full",
          textClass,

          !isLeft && "lg:order-2",

          item.offset?.text,
        )}
      >
        <h3 className="script-gary-display mb-5 text-center text-[28px] leading-[1.2] text-[#5a1e28] sm:text-[32px] lg:mb-2 lg:text-left lg:text-[24px]">
          {item.title}
        </h3>

        <div className="space-y-2 lg:space-y-1">{renderContent(item)}</div>
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

        // MOBILE
        "mt-20",

        // TABLET
        "md:mt-24",

        // DESKTOP
        "lg:mt-16",

        isEvent && "mt-20 md:mt-24 lg:mt-24 xl:mt-56",
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
