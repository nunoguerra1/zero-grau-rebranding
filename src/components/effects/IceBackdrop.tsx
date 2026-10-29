import Image from "next/image";
import { ICE } from "@/config/media";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  priority?: boolean;
};

export function IceBackdrop({
  className = "inset-0",
  imageClassName,
  overlayClassName,
  priority = false,
}: Props) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute overflow-hidden", className)}
    >
      <Image
        src={ICE.src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className={cn("object-cover", imageClassName)}
      />
      <div className={cn("absolute inset-0", overlayClassName)} />
    </div>
  );
}
