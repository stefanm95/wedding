import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PaperStack({ children }: Props) {
  return <div className="relative z-10 flex flex-col gap-32 md:gap-48">{children}</div>;
}
