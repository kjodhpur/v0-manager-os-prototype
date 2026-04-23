'use client';

export function BuiltByBanner() {
  return (
    <div className="relative py-12 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Banner Label */}
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-8 text-center">
          Built by people with experience at
        </p>

        {/* Company Logos Marquee */}
        <div className="w-full">
          <div className="flex gap-16 items-center marquee">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex gap-16 items-center shrink-0">
                {["Google", "Amazon", "Deloitte", "Nestle", "ASU", "PSU", "Meta", "Microsoft"].map(
                  (company) => (
                    <span
                      key={`${setIdx}-${company}`}
                      className="font-display text-xl md:text-2xl text-foreground/25 whitespace-nowrap hover:text-foreground/50 transition-colors duration-300"
                    >
                      {company}
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
