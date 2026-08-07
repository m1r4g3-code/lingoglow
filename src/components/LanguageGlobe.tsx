import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Volume2 } from "lucide-react";
import { feature } from "topojson-client";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { getLanguage, getLessons } from "../data/languages";
import { GLOBE_COUNTRIES, SUPPORTED_NUMERIC_IDS, LANGUAGE_FACTS, type GlobeCountry } from "../data/languageGlobe";
import { speak, isTTSSupported } from "../lib/speech";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { buttonVariants } from "./ui/button";

interface CountryFeature {
  type: string;
  id: string;
  properties: { name: string };
  geometry: unknown;
}

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, ...size };
}

/** LingoGlow's signature feature: a real, clickable globe. Only the 11
 * countries that map to an actual supported language glow and respond —
 * the rest of the world renders dim/inert rather than pretending to be
 * interactive. Fetches the ~100KB world topology at runtime (public/
 * world-110m.json) rather than bundling it, and this whole component is
 * lazy-loaded from Home.tsx so react-globe.gl/three.js never touch the
 * eager bundle. */
export default function LanguageGlobe() {
  const { ref: containerRef, width, height } = useElementSize<HTMLDivElement>();
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const reducedMotion = usePrefersReducedMotion();
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selected, setSelected] = useState<GlobeCountry | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/world-110m.json")
      .then((res) => res.json())
      .then((topology) => {
        if (cancelled) return;
        const geo = feature(topology, topology.objects.countries);
        setCountries((geo as unknown as { features: CountryFeature[] }).features);
      })
      .catch(() => {
        // Globe just stays empty (a plain rotating sphere) if the fetch
        // fails — the rest of the page works fine either way.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    globe.pointOfView({ lat: 15, lng: 15, altitude: 2.4 }, 0);
    const controls = globe.controls();
    controls.autoRotate = !reducedMotion;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = false;
  }, [reducedMotion, countries.length]);

  const capColor = useMemo(
    () => (feat: object) => {
      const f = feat as CountryFeature;
      if (!SUPPORTED_NUMERIC_IDS.has(f.id)) return "rgba(148, 163, 184, 0.12)";
      if (selected?.numericId === f.id) return "#2563eb";
      if (hoveredId === f.id) return "rgba(37, 99, 235, 0.75)";
      return "rgba(96, 165, 250, 0.5)";
    },
    [selected, hoveredId]
  );

  const handleClick = (feat: object) => {
    const f = feat as CountryFeature;
    const country = GLOBE_COUNTRIES.find((c) => c.numericId === f.id);
    if (country) setSelected(country);
  };

  const selectedLanguages = selected?.languageIds.map((id) => getLanguage(id)).filter((l) => l != null) ?? [];

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div ref={containerRef} className="relative h-[360px] w-full sm:h-[440px]">
        {width > 0 && (
          <Globe
            ref={globeRef}
            width={width}
            height={height || 400}
            backgroundColor="rgba(0,0,0,0)"
            showAtmosphere
            atmosphereColor="#60a5fa"
            atmosphereAltitude={0.22}
            polygonsData={countries}
            polygonCapColor={capColor}
            polygonSideColor={() => "rgba(15, 23, 42, 0.08)"}
            polygonStrokeColor={(feat) => (SUPPORTED_NUMERIC_IDS.has((feat as CountryFeature).id) ? "#2563eb" : "rgba(148, 163, 184, 0.2)")}
            polygonAltitude={(feat) => (SUPPORTED_NUMERIC_IDS.has((feat as CountryFeature).id) ? 0.015 : 0.004)}
            polygonsTransitionDuration={200}
            onPolygonHover={(feat) => setHoveredId(feat ? (feat as CountryFeature).id : null)}
            onPolygonClick={handleClick}
            polygonLabel={(feat) => {
              const f = feat as CountryFeature;
              return SUPPORTED_NUMERIC_IDS.has(f.id) ? `<div style="font:600 12px Inter,sans-serif;padding:3px 8px;">${f.properties.name} — tap to explore</div>` : "";
            }}
          />
        )}
      </div>

      <div className="glow-card rounded-2xl border border-border bg-card p-6">
        {selected && selectedLanguages.length > 0 ? (
          <div className="flex flex-col gap-4">
            {selectedLanguages.map((language) => {
              const fact = LANGUAGE_FACTS[language.id];
              const sample = getLessons(language.id)[0]?.vocab[0];
              return (
                <div key={language.id} className={selectedLanguages.length > 1 ? "border-b border-border pb-4 last:border-0 last:pb-0" : ""}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" aria-hidden="true">
                      {language.flag}
                    </span>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{language.name}</h3>
                      <p className="text-xs text-muted-foreground">{language.nativeName}</p>
                    </div>
                  </div>
                  {sample && (
                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-muted p-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground" dir="auto">
                          {sample.front}
                        </p>
                        <p className="text-xs text-muted-foreground">{sample.back}</p>
                      </div>
                      {isTTSSupported() && (
                        <button
                          type="button"
                          onClick={() => speak(sample.front, language.speechLang)}
                          aria-label={`Listen to ${sample.front}`}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                        >
                          <Volume2 className="h-4 w-4" strokeWidth={2} />
                        </button>
                      )}
                    </div>
                  )}
                  {fact && (
                    <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                      <li>{fact.writingSystem}</li>
                      <li>{fact.speakerEstimate}</li>
                    </ul>
                  )}
                  <Link to={`/language/${language.id}`} className={buttonVariants({ size: "sm", className: "mt-3" })}>
                    Start learning {language.name} →
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">Tap a highlighted country</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Spain, France, Germany, Italy, Saudi Arabia, China, the Netherlands, Nigeria, Russia, Greece, and India
              are all glowing — tap one to hear a real word and see the language.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
