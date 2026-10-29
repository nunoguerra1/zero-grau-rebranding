"use client";

import { useEffect, useRef } from "react";
import { LuX } from "react-icons/lu";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

type Props = {
  open: boolean;
  onClose: () => void;
  src: string;
  poster?: string;
  title: string;
  closeLabel: string;
};

export function VideoDialog({ open, onClose, src, poster, title, closeLabel }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const { setLocked } = useSmoothScroll();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setLocked(true, "video");
    return () => setLocked(false, "video");
  }, [open, setLocked]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="m-auto w-[min(94vw,1100px)] bg-transparent p-0 text-white backdrop:bg-navy-950/90 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
          <video
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
            className="size-full object-contain"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-black/60 backdrop-blur transition-colors hover:bg-black/80"
          >
            <LuX size={22} />
          </button>
        </div>
      )}
    </dialog>
  );
}
