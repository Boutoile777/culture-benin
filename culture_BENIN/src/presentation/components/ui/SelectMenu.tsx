import { useEffect, useRef, useState } from "react";

export interface SelectMenuOption {
  value: string;
  label: string;
  hint?: string;
}

interface SelectMenuProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectMenuOption[];
  placeholder: string;
  disabled?: boolean;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 flex-none text-gray-400 transition-transform duration-200 ${
        open ? "rotate-180 text-culture-green" : ""
      }`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 flex-none"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function SelectMenu({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}: SelectMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((option) => option.value === value);

  const open = () => {
    const selectedIndex = options.findIndex((option) => option.value === value);
    setHighlighted(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  const pick = (option: SelectMenuOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  // Garde l'option surlignée visible pendant la navigation clavier.
  useEffect(() => {
    if (!isOpen) return;
    listRef.current
      ?.querySelector(`[data-index="${highlighted}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [isOpen, highlighted]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        open();
      }
      return;
    }
    switch (event.key) {
      case "Escape":
      case "Tab":
        setIsOpen(false);
        break;
      case "ArrowDown":
        event.preventDefault();
        setHighlighted((index) => Math.min(index + 1, options.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlighted((index) => Math.max(index - 1, 0));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (options[highlighted]) pick(options[highlighted]);
        break;
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between gap-3 rounded-[10px] border bg-white px-3.5 py-3 text-left text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-culture-green ${
          isOpen ? "border-culture-green" : "border-gray-300 hover:border-gray-400"
        } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <span className={`truncate ${selected ? "text-culture-ink" : "text-gray-400"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <ul
            ref={listRef}
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-[290px] overflow-y-auto rounded-2xl border border-gray-200 bg-white py-1.5 shadow-[0_16px_36px_rgba(32,33,36,0.16)] animate-[fadeUp_0.18s_ease_both]"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              return (
                <li key={option.value || "__empty__"} data-index={index}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => pick(option)}
                    onMouseEnter={() => setHighlighted(index)}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
                      isSelected
                        ? "bg-[#eef4ef] font-semibold text-culture-green"
                        : highlighted === index
                          ? "bg-gray-50 text-culture-ink"
                          : "text-culture-ink"
                    }`}
                  >
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate">{option.label}</span>
                      {option.hint && (
                        <span className="truncate text-[11.5px] font-normal text-gray-400">
                          {option.hint}
                        </span>
                      )}
                    </span>
                    {isSelected && <CheckIcon />}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
