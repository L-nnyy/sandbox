import {
  Alert,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardEyebrow,
  CardFooter,
  CardHeader,
  CardTitle,
  InputField,
  NotebookSection,
  ResponsiveGrid,
  Stack,
  atelierTokens,
} from '@acme/ui';
import { optionalEnv } from '@acme/shared';
import { ThemeToggle } from './theme-toggle';

type PaletteContrast = 'light' | 'dark';

type PaletteSwatch = {
  name: string;
  token: string;
  hex: string;
  usage: string;
  contrast: PaletteContrast;
};

const classNames = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(' ');

const palette: readonly PaletteSwatch[] = [
  {
    name: 'Paper',
    token: 'colors.background.paper',
    hex: atelierTokens.colors.background.paper,
    usage: 'Primary canvas for reading experiences and note-taking.',
    contrast: 'dark',
  },
  {
    name: 'Parchment',
    token: 'colors.background.parchment',
    hex: atelierTokens.colors.background.parchment,
    usage: 'Layered surface for cards and secondary containers.',
    contrast: 'dark',
  },
  {
    name: 'Terracotta',
    token: 'colors.brand.primary',
    hex: atelierTokens.colors.brand.primary,
    usage: 'Primary action color, focus rings, and key annotations.',
    contrast: 'light',
  },
  {
    name: 'Moss',
    token: 'colors.brand.secondary',
    hex: atelierTokens.colors.brand.secondary,
    usage: 'Secondary actions and affirmative feedback states.',
    contrast: 'light',
  },
  {
    name: 'Highlight',
    token: 'colors.brand.highlight',
    hex: atelierTokens.colors.brand.highlight,
    usage: 'Call-outs, annotation highlights, and pedagogical cues.',
    contrast: 'dark',
  },
  {
    name: 'Night',
    token: 'colors.background.night',
    hex: atelierTokens.colors.background.night,
    usage: 'Dark mode canvas with parchment typography.',
    contrast: 'light',
  },
];

const spacingEntries = Object.entries(atelierTokens.spacing);
const breakpointEntries = Object.entries(atelierTokens.breakpoints);

const alertExamples = [
  {
    tone: 'success' as const,
    title: 'Submission saved',
    description: 'All annotations are archived for the cohort review.',
  },
  {
    tone: 'info' as const,
    title: 'Draft synced',
    description: 'Live edits update classmates in real time.',
  },
  {
    tone: 'warning' as const,
    title: 'Review required',
    description: 'One rubric item still needs feedback before publishing.',
  },
  {
    tone: 'danger' as const,
    title: 'Sync failed',
    description: 'Check your connection or retry after refreshing credentials.',
  },
];

const layoutTiles = [
  {
    title: 'Daily log',
    description: 'Track studio sessions with timestamps, reflections, and attachments.',
  },
  {
    title: 'Critique queue',
    description: 'Surface the next submission requiring mentor feedback.',
  },
  {
    title: 'Reference shelf',
    description: 'Pin readings, precedents, and material explorations.',
  },
  {
    title: 'Workshop roster',
    description: 'Keep the collaborator list visible and searchable.',
  },
] as const;

export default function HomePage() {
  const apiUrl = optionalEnv('NEXT_PUBLIC_API_URL', 'http://localhost:3000/api');

  return (
    <div className="container flex flex-1 flex-col gap-18 py-12">
      <header className="flex flex-col gap-5">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-atelier-shadow/80 dark:text-atelier-haze/80">
          Atelier de travail
        </span>
        <h1 className="max-w-3xl text-balance text-4xl xs:text-5xl">
          Identity & components for warm, scholarly product experiences
        </h1>
        <p className="max-w-3xl text-lg text-atelier-shadow dark:text-atelier-haze">
          The Atelier system translates annotated notebooks and worktables into a Tailwind-driven component library.
          Colors stay warm and grounded, typography balances character with legibility, and every component honors the
          rhythm of thoughtful study.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg">Primary workshop action</Button>
          <Button variant="tonal" size="lg">
            Secondary reference
          </Button>
          <Button variant="ghost" size="lg">
            Quiet action
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <NotebookSection surface="mist" className="flex flex-col gap-6">
        <Stack space="relaxed">
          <Card variant="outline" className="bg-white/70 dark:bg-atelier-charcoal/70">
            <CardHeader>
              <CardEyebrow>Identity narrative</CardEyebrow>
              <CardTitle>Pedagogical, annotated, human</CardTitle>
              <CardDescription>
                Built for teams who think in drafts, marginalia, and structured critique. Atelier brings warmth without
                resorting to clichés—embracing paper textures, pencil annotations, and earnest collaboration.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-3 text-sm text-atelier-shadow dark:text-atelier-haze">
              <ul className="grid gap-2 sm:grid-cols-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-atelier-terracotta" aria-hidden />
                  <span>Warm parchment surfaces evoke studio desks and working documents.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-atelier-moss" aria-hidden />
                  <span>Measured serif headlines pair with Work Sans body copy for clarity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-atelier-highlight" aria-hidden />
                  <span>Annotation highlights favor amber and terracotta instead of neon accents.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-atelier-berry" aria-hidden />
                  <span>Strict WCAG AA contrast is preserved for both light and dark surfaces.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card variant="tonal">
            <CardHeader>
              <CardEyebrow>Typography stack</CardEyebrow>
              <CardTitle>Fraunces & Work Sans</CardTitle>
              <CardDescription>
                Fraunces carries the academic voice for display and headings, while Work Sans keeps running text
                approachable for long-form reading.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <p className="font-display text-3xl text-atelier-ink dark:text-atelier-parchment">
                “Design for inquiry, craft for clarity.”
              </p>
              <p className="text-base text-atelier-shadow dark:text-atelier-haze">
                Body copy uses Work Sans at 16px with a 1.6 line-height, maintaining relaxed readability across mobile
                and desktop breakpoints.
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-atelier-shadow/70 dark:text-atelier-haze/70">
                Labels adopt letter-spaced caps for notebook-inspired cues.
              </p>
            </CardContent>
          </Card>
        </Stack>
      </NotebookSection>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-display">Color palette</h2>
          <p className="max-w-2xl text-base text-atelier-shadow dark:text-atelier-haze">
            A grounded palette avoids SaaS gradients in favor of tactile hues. Primary and secondary actions maintain
            AA contrast in both modes.
          </p>
        </div>
        <ResponsiveGrid sm={2} lg={3} className="gap-6">
          {palette.map((swatch) => (
            <Card key={swatch.name} variant="outline" className="overflow-hidden">
              <div
                className={classNames(
                  'relative flex h-24 items-center justify-between rounded-2xl border border-white/30 px-4 font-medium uppercase tracking-[0.08em] shadow-inner',
                  swatch.contrast === 'light' ? 'text-white' : 'text-atelier-ink',
                )}
                style={{ backgroundColor: swatch.hex }}
              >
                <span>{swatch.hex}</span>
                <span className="text-xs">{swatch.token}</span>
              </div>
              <CardContent className="gap-1.5">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-atelier-shadow dark:text-atelier-haze">
                  {swatch.name}
                </p>
                <p className="text-sm text-atelier-shadow/80 dark:text-atelier-haze/90">{swatch.usage}</p>
              </CardContent>
            </Card>
          ))}
        </ResponsiveGrid>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-display">Core UI components</h2>
          <p className="max-w-2xl text-base text-atelier-shadow dark:text-atelier-haze">
            Components are mobile-first, accessible, and map directly to exported variants in the Figma kit.
          </p>
        </div>
        <ResponsiveGrid sm={1} lg={2} className="gap-6">
          <Card>
            <CardHeader>
              <CardEyebrow>Buttons</CardEyebrow>
              <CardTitle>Action hierarchy</CardTitle>
              <CardDescription>
                Primary terracotta actions, moss secondary buttons, tonal fills, and quiet ghost states keep emphasis
                balanced.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tonal">Tonal</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button isLoading loadingLabel="Saving…">
                  Saving
                </Button>
              </div>
              <p className="text-sm text-atelier-shadow/80 dark:text-atelier-haze/80">
                Focus states add a warm ring-offset to echo annotation highlights.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardEyebrow>Inputs</CardEyebrow>
              <CardTitle>Annotation-ready forms</CardTitle>
              <CardDescription>
                Labels use uppercase caps, optional indicators stay subtle, and error states shift to berry without
                compromising contrast.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <InputField
                label="Workshop title"
                placeholder="Autumn studio · Session 03"
                helperText="Displayed on participant dashboards."
              />
              <InputField
                label="API endpoint"
                value={apiUrl}
                helperText="Sourced from NEXT_PUBLIC_API_URL for parity with implementation."
                readOnly
              />
              <InputField
                label="Submission slug"
                defaultValue="atelier-identity"
                error="Use kebab-case to generate shareable URLs."
                required
              />
            </CardContent>
            <CardFooter>
              <Button size="sm">Save draft</Button>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardEyebrow>Feedback states</CardEyebrow>
              <CardTitle>Contextual messaging</CardTitle>
              <CardDescription>
                Alerts respect tone without leaning on blues—success leans moss, warning uses amber sunlight, danger taps
                berry.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              {alertExamples.map((alert) => (
                <Alert key={alert.tone} tone={alert.tone} title={alert.title} description={alert.description} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardEyebrow>Layouts</CardEyebrow>
              <CardTitle>Mobile-first rhythm</CardTitle>
              <CardDescription>
                Responsive grids collapse elegantly at the 864px breakpoint while preserving notebook spacing.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <ResponsiveGrid sm={2} lg={2} className="gap-4">
                {layoutTiles.map((tile) => (
                  <div
                    key={tile.title}
                    className="rounded-xl border border-atelier-sand/70 bg-white/80 p-4 text-sm text-atelier-shadow dark:border-atelier-shadow/70 dark:bg-atelier-charcoal/60 dark:text-atelier-haze"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-atelier-shadow dark:text-atelier-haze">
                      {tile.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">{tile.description}</p>
                  </div>
                ))}
              </ResponsiveGrid>
              <p className="text-sm text-atelier-shadow/80 dark:text-atelier-haze/80">
                Base spacing follows the 4pt scale, with generous 24–36px gutters to echo workbook margins.
              </p>
            </CardContent>
          </Card>
        </ResponsiveGrid>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-display">System foundations</h2>
          <p className="max-w-2xl text-base text-atelier-shadow dark:text-atelier-haze">
            Design tokens map 1:1 to the exported JSON file for implementation.
          </p>
        </div>
        <ResponsiveGrid sm={1} lg={3} className="gap-6">
          <Card variant="outline">
            <CardHeader>
              <CardEyebrow>Spacing</CardEyebrow>
              <CardTitle>4pt anatomical scale</CardTitle>
              <CardDescription>
                Tokens align to the workbook grid so vertical rhythm stays consistent across viewports.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                {spacingEntries.map(([token, value]) => (
                  <div
                    key={token}
                    className="flex items-center justify-between rounded-lg bg-white/70 px-3 py-2 text-atelier-ink dark:bg-atelier-charcoal/70 dark:text-atelier-parchment"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-atelier-shadow/80 dark:text-atelier-haze/80">
                      {token}
                    </dt>
                    <dd className="text-sm font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <Card variant="outline">
            <CardHeader>
              <CardEyebrow>Breakpoints</CardEyebrow>
              <CardTitle>Intentional thresholds</CardTitle>
              <CardDescription>
                Atelier optimizes for a focused mobile experience first, then expands into multi-column workspaces.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <dl className="grid gap-3">
                {breakpointEntries.map(([token, value]) => (
                  <div key={token} className="rounded-lg border border-atelier-sand/70 p-3 dark:border-atelier-shadow/60">
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-atelier-shadow/80 dark:text-atelier-haze/70">
                      {token}
                    </dt>
                    <dd className="mt-1 text-sm text-atelier-shadow dark:text-atelier-haze">
                      min-width {value} · aligns with {token === 'xs' ? 'handheld' : token === 'lg' ? 'dual column layout' : `${token}-level`} experiences
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <Card variant="outline">
            <CardHeader>
              <CardEyebrow>Typography</CardEyebrow>
              <CardTitle>Serious yet accessible</CardTitle>
              <CardDescription>
                Fraunces handles display moments while Work Sans keeps long-form content approachable.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <p className="font-display text-3xl leading-tight text-atelier-ink dark:text-atelier-parchment">
                Atelier critiques → thoughtful product
              </p>
              <p className="text-base leading-relaxed text-atelier-shadow dark:text-atelier-haze">
                Work Sans at 16 / 1.6 maintains readability, with 18 / 1.55 for dense forms and labels using 12px
                uppercase caps at 0.18em tracking.
              </p>
              <code className="block w-fit rounded-lg bg-atelier-charcoal/90 px-3 py-2 font-mono text-xs text-atelier-parchment dark:bg-black/60">
                font-family: {atelierTokens.typography.families.display}
              </code>
            </CardContent>
          </Card>
        </ResponsiveGrid>
      </section>

      <NotebookSection surface="night" className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-display text-atelier-parchment">Dark studio preview</h2>
          <p className="max-w-2xl text-base text-atelier-haze">
            Dark mode retains the same tonal hierarchy and meets WCAG AA. Buttons shift to parchment text while alerts
            use translucent overlays to stay grounded.
          </p>
        </div>
        <ResponsiveGrid sm={1} lg={2} className="gap-5">
          <Card variant="outline" className="border-atelier-charcoal bg-atelier-charcoal/60">
            <CardHeader>
              <CardEyebrow className="text-atelier-haze/80">Dark mode actions</CardEyebrow>
              <CardTitle className="text-atelier-parchment">Buttons & inputs</CardTitle>
              <CardDescription className="text-atelier-haze">
                Tone shifts preserve contrast with parchment text and charcoal surfaces.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <InputField
                label="Workspace focus"
                placeholder="Night critique session"
                helperText="Inputs adopt charcoal fills with parchment text."
              />
            </CardContent>
          </Card>

          <Card variant="outline" className="border-atelier-charcoal bg-atelier-charcoal/60">
            <CardHeader>
              <CardEyebrow className="text-atelier-haze/80">Messaging</CardEyebrow>
              <CardTitle className="text-atelier-parchment">Alerts under low light</CardTitle>
              <CardDescription className="text-atelier-haze">
                Feedback overlays rely on translucent fills rather than glow effects.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <Alert tone="success" title="Saved to archive" description="Night mode shows subtle moss overlays." />
              <Alert tone="warning" title="Pending critique" description="One teammate still needs to review." />
            </CardContent>
          </Card>
        </ResponsiveGrid>
      </NotebookSection>
    </div>
  );
}
