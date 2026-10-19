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

Use `react-fomantic-ui` components for standard UI. The site layout already loads
the theme; content templates do not need additional framework styles or jQuery
initialization.

```tsx
import { Grid } from "react-fomantic-ui";

<Grid stackable columns={2}>
  <Grid.Column>...</Grid.Column>
  <Grid.Column>...</Grid.Column>
</Grid>;
```

Use props for variations: `<Label horizontal>` and `<Divider hidden />` replace
handwritten `ui horizontal label` and `ui hidden divider` classes. The same rule
applies to headers, segments, lists, cards, items, feeds, menus, tables, forms,
buttons, and icons. Import only the parent for compound components:
`Item.Content`, `Item.Header`, `Grid.Column`, and `List.Item`, rather than
individual subcomponent imports.

Choose appropriate HTML elements with `as`, such as `<Header as="h2">` for a
section heading. Use `SiteLink` directly for links, or through a UI component's
`as` prop. Navigable `Button` and `List.Item` components also need `role="link"`;
actions should retain button semantics. Build localized destinations from
`useSiteContext().basePath`:

```tsx
import { Button } from "react-fomantic-ui";
import { SiteLink } from "@/site/components/SiteLink";
import { useSiteContext } from "@/site/components/SiteContext";

function ProjectLink() {
  const { basePath, en } = useSiteContext();
  return (
    <Button as={SiteLink} href={`${basePath}projects/`} role="link">
      {en ? "Projects" : "プロジェクト"}
    </Button>
  );
}
```

Keep custom classes for site styling and variations without library props, such
as responsive visibility utilities, Devicon icons, divided feeds, and list/feed
slots without matching subcomponents. Production CSS purging reads rendered HTML,
so ordinary classes generated by components are retained automatically.

### Images, embeds, and interactive content

Use the existing site components for these behaviors:

| Content to add                | Component and usage                                                                                                                                                               |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Responsive image              | `SiteImage` from `site/components/SiteImage`; provide meaningful `alt` text and use image props such as `fluid` and `bordered`.                                                   |
| Linked image                  | `LinkedImage` from `site/components/LinkedImage`, wrapping `SiteImage`; put `href` and outer styling props on `LinkedImage`.                                                      |
| Video or other embedded media | `DeferredEmbed` from `site/components/DeferredEmbed`; supply the source or URL and placeholder. It supports click and keyboard activation without loading the iframe immediately. |
| Popup with authored content   | `SitePopup` from `site/components/SiteWidgets`; pass the interactive element as `trigger` and popup content as children.                                                          |
| Image enlarged in a modal     | `ModalImage` from `site/components/SiteWidgets`, wrapping `SiteImage`; include one `SiteModal` in the page, as in `components/design/index.tsx`.                                  |
| Navigation dropdown           | `NavigationDropdown` from `site/components/SiteWidgets`, with `Dropdown.Menu` and linked `Menu.Item` children; see `site/components/SiteLayout.tsx`.                              |
| Copy-to-clipboard control     | `CopyButton` from `site/components/InteractiveLinks`; set `data-clipboard-text` and `lang` for localized feedback.                                                                |

For example:

```tsx
import { LinkedImage } from "@/site/components/LinkedImage";
import { SiteImage } from "@/site/components/SiteImage";

<LinkedImage fluid href="/example/detail.jpg">
  <SiteImage
    src="/example/detail-thumbnail.jpg"
    alt="Close-up of the prototype"
  />
</LinkedImage>;
```

`ProjectPage` and `SiteLayout` provide the shared widget context. Use these site
components within that layout to preserve keyboard access, focus restoration,
and page navigation behavior. Popup and custom modal content should be ordinary
JSX children so it is also present in the static HTML. Within `SiteModal`, use
`Modal.Header` and `Modal.Content` for its contents.
