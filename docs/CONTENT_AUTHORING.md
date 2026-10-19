# Shared page content

`pages/` owns URLs and `getStaticProps`. Forty English/Japanese route pairs
import the same component from the matching path in `components/`. The template
reads `pageData.language`; route-specific data and image manifests stay in the
route's static props. Site infrastructure remains in `site/components/`.

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
removing the need to share layouts and media. Importing one locale's Next route
from another would couple content to routing and server-only build functions.

Translation contribution links point to the shared component. The audit CSV
retains its original inspection locations as a historical snapshot; the audit
Markdown links point to current authoring files.
