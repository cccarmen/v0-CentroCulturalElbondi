export function FileteadoOrnaments() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Top-left corner flourish */}
      <svg
        className="absolute -top-2 -left-4 h-36 w-36 text-white/[0.07] lg:h-52 lg:w-52"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 180 C20 120 40 80 80 60 C60 80 50 110 50 140 C50 110 70 80 100 60 C80 80 70 110 70 150"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M30 170 C40 130 60 100 90 80 C70 100 60 120 60 150"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="80" cy="55" r="3" fill="currentColor" />
        <circle cx="95" cy="56" r="2" fill="currentColor" />
        <path
          d="M15 175 C15 175 25 165 35 170 C25 175 15 175 15 175Z"
          fill="currentColor"
        />
      </svg>

      {/* Top-right corner flourish (mirrored) */}
      <svg
        className="absolute -top-2 -right-4 h-36 w-36 -scale-x-100 text-white/[0.07] lg:h-52 lg:w-52"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 180 C20 120 40 80 80 60 C60 80 50 110 50 140 C50 110 70 80 100 60 C80 80 70 110 70 150"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M30 170 C40 130 60 100 90 80 C70 100 60 120 60 150"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="80" cy="55" r="3" fill="currentColor" />
        <circle cx="95" cy="56" r="2" fill="currentColor" />
        <path
          d="M15 175 C15 175 25 165 35 170 C25 175 15 175 15 175Z"
          fill="currentColor"
        />
      </svg>

      {/* Bottom-left corner leaf */}
      <svg
        className="absolute -bottom-1 -left-2 h-28 w-28 text-white/[0.05] lg:h-40 lg:w-40"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M180 20 C140 20 100 40 80 80 C100 50 130 40 160 40 C130 50 100 70 80 110 C100 80 130 60 170 50"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M170 30 C140 40 110 60 90 90 C110 70 130 55 160 50"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="76" cy="85" r="2.5" fill="currentColor" />
      </svg>

      {/* Bottom-right corner leaf (mirrored) */}
      <svg
        className="absolute -right-2 -bottom-1 h-28 w-28 -scale-x-100 text-white/[0.05] lg:h-40 lg:w-40"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M180 20 C140 20 100 40 80 80 C100 50 130 40 160 40 C130 50 100 70 80 110 C100 80 130 60 170 50"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M170 30 C140 40 110 60 90 90 C110 70 130 55 160 50"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="76" cy="85" r="2.5" fill="currentColor" />
      </svg>

      {/* Subtle horizontal scroll line — top */}
      <svg
        className="absolute top-6 left-1/2 hidden h-4 w-64 -translate-x-1/2 text-white/[0.06] lg:block lg:w-80"
        viewBox="0 0 320 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 8 C30 8 40 2 60 2 C80 2 80 14 100 14 C120 14 120 2 140 2 C160 2 160 14 180 14 C200 14 200 2 220 2 C240 2 240 14 260 14 C280 14 290 8 320 8"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* Subtle horizontal scroll line — bottom */}
      <svg
        className="absolute bottom-4 left-1/2 hidden h-4 w-48 -translate-x-1/2 text-white/[0.05] lg:block lg:w-64"
        viewBox="0 0 260 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 8 C20 8 30 3 50 3 C70 3 70 13 90 13 C110 13 110 3 130 3 C150 3 150 13 170 13 C190 13 200 8 260 8"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
