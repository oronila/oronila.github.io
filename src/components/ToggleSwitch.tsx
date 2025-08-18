interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  onLabel: string;
  offLabel: string;
}

export default function ToggleSwitch({ isOn, onToggle, onLabel, offLabel }: ToggleSwitchProps) {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex h-9 w-48 items-center rounded-full border border-neutral-800 bg-neutral-900/40 p-1 transition-colors hover:border-neutral-700"
      aria-label={`Switch to ${isOn ? offLabel : onLabel} mode`}
    >
      {/* Sliding indicator */}
      <div
        className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-neutral-800 transition-transform duration-200 ease-out ${
          isOn ? 'translate-x-full' : 'translate-x-0'
        }`}
      />

      {/* Labels */}
      <div className="relative grid w-full grid-cols-2 place-items-center">
        <span
          className={`z-10 px-3 text-xs font-medium transition-colors ${
            !isOn ? 'text-neutral-100' : 'text-neutral-400'
          }`}
        >
          {offLabel}
        </span>
        <span
          className={`z-10 px-3 text-xs font-medium transition-colors ${
            isOn ? 'text-neutral-100' : 'text-neutral-400'
          }`}
        >
          {onLabel}
        </span>
      </div>
    </button>
  );
}
