# Shared page content

`pages/` owns URLs and build-time data selection. Author one route and its
matching shared component. `localizedPageProps` opts the route into bilingual
output; `npm run dev`, `npm run build`, and `npm run typecheck` create the other
language's entry automatically. The template reads `pageData.language`.

Generated `*.localized.tsx` entries are ignored by Git. They import the shared
component directly and delegate data selection to the authored route, overriding
only the language. There is no copied configuration or central route list to
maintain. An explicit counterpart page takes precedence. Either English or
Japanese can be the authored route; dynamic timeline routes retain their own
explicit `getStaticPaths`.

## Adding a project

First add its title, description, dates, and other project metadata to
`src/data/projects.json`, as for existing projects. Then add these two files:

```tsx
// pages/example/index.tsx
import Page from "@/components/example";
import { localizedPageProps } from "@/site/page-props.server";

export default Page;
export const getStaticProps = localizedPageProps(Page, "/example/", {
  projects: ["example"],
  publicationProjects: ["example"],
});
```

```tsx
// components/example/index.tsx
import { Header, Segment } from "react-fomantic-ui";
import { ProjectPage } from "@/site/components/ProjectPage";
import { LocalizedContent } from "@/site/components/LocalizedContent";
import type { PageDataProps } from "@/site/page-data";

export default function Page({ pageData }: PageDataProps) {
  return (
    <ProjectPage pageData={pageData} project="example">
      <Header as="h2">Overview</Header>
      <Segment basic>
        <LocalizedContent ja={<p>日本語の紹介。</p>}>
          <p>The default project description.</p>
        </LocalizedContent>
      </Segment>
    </ProjectPage>
  );
}
```

This produces `/example/` and `/ja/example/`, their localized metadata and data,
and the language-switch links. `ProjectPage` supplies the standard project
header, layout, and publications. Use `useSiteContext` in child components for
localized labels, links, or project data. Keep custom layouts for pages that
need them. For uncommon locale-specific data references, the factory accepts a
fourth argument such as `{ ja: { projects: [...], publications: [...] } }`.
`npm run routes` refreshes entries and route metadata without rebuilding assets.

The original Pug sources, immediately before their removal in `7814f69`, define
the content ownership. Japanese pages extend the default page and replace only
named blocks. In particular:

| Template                        | Japanese overrides in Pug       | Current ownership                                                  |
| ------------------------------- | ------------------------------- | ------------------------------------------------------------------ |
| DeployGround                    | Only `lang`                     | One shared template; English prose in both locales                 |
| Homehack and its three projects | Only `lang`                     | Japanese default prose in both locales; one shared Homehack layout |
| Griffith                        | `abstract`                      | Shared presentation and layout, localized abstract                 |
| VisionSketch                    | `message`, `abstract`           | Localized message and abstract; shared presentation                |
| Live Programming                | Title and description in `lang` | Localized metadata; inherited page sections                        |

Other shared templates note their original Japanese block names in their leading
comment. Japanese-only pages and English redirects to them retain their existing
behavior. A default template's language is determined by its source content; do
not assume that an English URL makes all of its prose English.

## Editing defaults and translations

Edit the matching `components/` file. Put shared prose, images, embeds, and
layout there once. A missing translation inherits that same content, including
future corrections. Use ordinary conditional expressions for short labels.
For rich sections, `LocalizedContent` supplies an optional locale override:

```tsx
<LocalizedContent ja={<p>日本語の概要。</p>}>
  <p>The default English abstract.</p>
</LocalizedContent>
```

Omitting `ja` inherits the children. Japanese default content can likewise have
an `en` override. An explicit `null` or `false` override suppresses the section;
`undefined` inherits it. The component renders no extra DOM element and reads
the locale from `SiteLayout` context. Keep JSX construction free of mutations:
React evaluates props and children before selecting which content to render.

This uses React composition to preserve Pug's default/override behavior. It
avoids maintaining a second page tree or a separate translation of shared media.
Related translations stay beside their default content. The tradeoff is larger
template files and browser modules containing both languages' authored prose.
Large future translations can be extracted into named section components;
shared layout and fallback content should still have one owner.

String dictionaries work well for repeated interface labels, but rich paragraphs
with links and differing structures are easier to edit as JSX. MDX or a full i18n
framework would add parsing, message keys, and build configuration without
removing the need to share layouts and media. Keeping shared JSX inside a Next route would couple content to routing and
server-only build functions. Shared JSX lives in `components/`; generated route
entries delegate only the build-time data function to the authored route.

Translation contribution links point to the shared component. The audit CSV
retains its original inspection locations as a historical snapshot; the audit
Markdown links point to current authoring files.

## Fomantic React components

The site already builds its custom CSS from `fomantic-ui`. Use the pinned
`react-fomantic-ui` components with that stylesheet:

```tsx
import { Grid } from "react-fomantic-ui";

<Grid stackable columns={2}>
  <Grid.Column>...</Grid.Column>
  <Grid.Column>...</Grid.Column>
</Grid>;
```

The library offers concise, typed props and familiar Fomantic markup. It ships
no CSS, so it can use the current theme. Its stable 3.x line supports React 19;
it is an independent community fork. Its dependencies can still print React 19
peer warnings. See the [upstream README](https://github.com/Fomantic-UI-React/react-fomantic-ui)
and [Fomantic's package listing](https://github.com/fomantic/Fomantic-UI#-other-packages).

Raw classes are lightweight and support every Fomantic variation, but are
verbose and untyped. Local wrappers could shorten them without dependencies,
but would create another API to maintain as requirements expand. The maintained
React component API is a better fit here. Use it for headers, labels, dividers,
segments, lists, cards, items, feeds, menus, tables, forms, buttons, icons, grids,
and embeds. For example, use `<Label horizontal>` and `<Divider hidden />`,
with `as` when a heading, anchor, or list needs a specific HTML tag. Import
only the parent for compound components: `Item.Content`, `Item.Header`,
`Grid.Column`, and `List.Item` rather than individual subcomponent imports. Keep custom
classes only for site styling and variations without library props.

Use `SiteLink` through a component's `as` prop for internal navigation. Use
`LinkedImage` for images with linked responsive children; upstream `Image`
currently consumes `href` without forwarding it to a custom root in that branch.
Use `SiteImage` for responsive sources, with Fomantic image props such as `fluid`
and `bordered`. Use `DeferredEmbed` for click/keyboard-activated embeds.
See the [UI migration review](FOMANTIC_UI_REVIEW.md) for the few domain adapters
that retain additional state, focus handling, and static content.

Production CSS purging reads rendered HTML, so classes generated by these
components are retained without a source-code class scanner or a broad safelist.
