import { Link } from "react-router-dom";
import type { Language } from "../types";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface LanguageCardProps {
  language: Language;
  lessonCount: number;
  dueCount: number;
  started: boolean;
}

export function LanguageCard({ language, lessonCount, dueCount, started }: LanguageCardProps) {
  return (
    <Link to={`/language/${language.id}`} className="block">
      <Card
        className="glow-card border-border"
        style={{ ["--glow-color" as string]: language.glowColor }}
      >
        <CardContent>
          <div className="flex items-center justify-between">
            <span
              className="glow-text flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted text-sm font-bold tracking-wide text-card-foreground"
              style={{ ["--glow-color" as string]: language.glowColor }}
            >
              {language.code}
            </span>
            {started ? (
              dueCount > 0 ? (
                <Badge>{dueCount} due</Badge>
              ) : (
                <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">All caught up</Badge>
              )
            ) : (
              <Badge variant="secondary">New</Badge>
            )}
          </div>
          <h3 className="glow-text font-heading mt-4 flex items-center gap-1.5 text-lg font-semibold text-card-foreground">
            <span aria-hidden="true">{language.flag}</span>
            {language.name}
          </h3>
          <p className="text-sm text-muted-foreground">{language.nativeName}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            {lessonCount === 0
              ? "No lessons yet"
              : started
                ? `${lessonCount} lesson${lessonCount === 1 ? "" : "s"}`
                : `${lessonCount} lesson${lessonCount === 1 ? "" : "s"} · Start from scratch`}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
