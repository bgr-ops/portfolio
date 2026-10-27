import type { Skill } from "@/types/database";

export function SkillsSection({ groups }: { groups: { category: string; skills: Skill[] }[] }) {
  return (
    <section id="skills" className="relative py-28 border-t border-border/60">
      <div className="container-page">
        <div className="mb-14">
          <span className="eyebrow">Expertise</span>
          <h2 className="display mt-3 text-4xl sm:text-5xl md:text-6xl font-normal">
            Skills & Technologies
          </h2>
        </div>

        {groups.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border/80 bg-card/20 p-12 text-center text-muted-foreground">
            <p className="font-display text-2xl text-foreground">Core Competencies</p>
            <p className="mt-2 text-sm">
              Technical stack and skills list will be updated shortly.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {groups.map(({ category, skills }) => (
              <div
                key={category}
                className="rounded-3xl border border-border/80 bg-card/60 p-7 transition-all hover:border-brand/40 hover:bg-card"
              >
                <h3 className="font-display text-2xl font-normal text-foreground">
                  {category}
                </h3>
                <div className="mt-5 space-y-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="group flex flex-col gap-1.5 rounded-xl border border-border/50 bg-background/50 p-3 transition-colors hover:border-brand/40"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium">
                          {skill.icon && <span className="text-base">{skill.icon}</span>}
                          <span>{skill.name}</span>
                        </span>
                        {skill.level !== null && (
                          <span className="font-mono text-xs text-muted-foreground">
                            {skill.level}%
                          </span>
                        )}
                      </div>

                      {skill.level !== null && (
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-brand transition-all duration-1000"
                            style={{ width: `${Math.min(100, Math.max(0, skill.level))}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
