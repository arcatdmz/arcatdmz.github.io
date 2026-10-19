# Fomantic React component review

The authored React site uses `react-fomantic-ui` with the existing custom
Fomantic stylesheet. This extends the initial grid migration to the shared
content templates, Japanese-only pages, talks, site shell, and reusable widgets.
Historical HTML assets remain archival documents. The résumé's independent
print layout keeps its own `row`, `date`, and `content` classes.

## Choice and tradeoffs

The [upstream project](https://github.com/Fomantic-UI-React/react-fomantic-ui)
is an independent community fork supporting React 18/19 and the Semantic UI
React component API. It supplies no CSS, so the site retains its current theme.
Typed props make layouts and variations easier to read and reduce spelling and
nesting mistakes. Component composition also supports Next links and responsive
images. The costs are another runtime dependency, upstream peer warnings, and
occasional behavior or markup differences that require checking the exported
site. In particular, image links with responsive children need the adapter below.

Raw classes cover every CSS variation and carry no component dependency, but
repeat framework details throughout authored content. A private set of wrappers
would require maintaining those APIs ourselves. Replacing the CSS framework
would add a redesign and offer little benefit to this content refactor. Prefer
the library for standard primitives and retain small adapters for site behavior.

## Coverage

| Previous markup                           | Component API                                                              |
| ----------------------------------------- | -------------------------------------------------------------------------- |
| `ui ... grid`, columns, rows              | `Grid`, `GridColumn`, `GridRow`                                            |
| `ui ... header`, subheaders               | `Header`, `HeaderContent`, `HeaderSubheader`                               |
| `ui ... label`, divider, segment, message | `Label`, `Divider`, `Segment`, `SegmentGroup`, `Message`                   |
| Lists and their content                   | `List`, `ListItem`, `ListContent`, `ListHeader`, `ListDescription`         |
| Cards and project items                   | `Card`, `CardGroup`, card subcomponents, `Item`, item subcomponents        |
| Feeds                                     | `Feed`, `FeedEvent`, `FeedContent`, `FeedDate`, `FeedLabel`, `FeedSummary` |
| Menus and breadcrumbs                     | `Menu`, `MenuItem`, `MenuMenu`, `DropdownMenu`, breadcrumb subcomponents   |
| Tables and forms                          | `Table` and its subcomponents, `Form`, `FormField`, `TextArea`             |
| Buttons, icons, images                    | `Button`, `Icon`, `Image` through the responsive/link adapters             |
| Embedded media                            | `Embed`; `DeferredEmbed` adds keyboard access and responsive placeholders  |
| Sidebar and pusher                        | `Sidebar` rendered as `Menu`, `SidebarPusher`                              |
| Clipboard feedback                        | `Popup` supplies positioning and portal behavior                           |
| Modal and popup content                   | `ModalHeader`, `ModalContent`, `PopupHeader`, `PopupContent`               |

Generated HTML remains the source for CSS purging, so library-generated classes
are retained. Unsupported variations (such as a divided feed), responsive
visibility utilities, Devicon classes, and site-specific slots keep their classes.
List/feed `meta` and `header` slots without equivalent library subcomponents also
remain native elements. Navigable `Button` and `ListItem` elements explicitly
keep the link role; controls retain button semantics.

## Remaining adapters

These components add site behavior; standard rendering delegates to Fomantic
where the APIs fit:

- `SiteImage` chooses responsive sources and reserves intrinsic dimensions;
  styled images render through Fomantic `Image`.
- `LinkedImage` forwards the destination through a custom root to `SiteLink`.
  Fomantic's `Image` children branch currently drops its consumed `href` prop.
  This adapter preserves responsive child images and client navigation.
- `DeferredEmbed` delegates markup and activation to `Embed`, while adding
  Enter/Space activation and responsive placeholder rendering. The former
  private `Embed` implementation was removed.
- `SiteSidebarPanel` connects shared navigation state to Fomantic `Sidebar`.
  The previous sidebar markup and transition timer were removed.
- `HistoryMore`, `CopyButton`, `Avatar`, and `ModalImage` retain data fetching,
  clipboard operations, or site image interactions around library components.
- `NavigationDropdown` keeps anchor navigation, typeahead, and focus restoration.
  The library dropdown is an option-selection control whose Enter handler
  prevents the default action of a focused link. The site adapter uses
  `MenuItem` and `DropdownMenu` and owns its navigation state and transitions.
- `SitePopup` keeps authored sibling content in static HTML, shared popup
  exclusivity, trigger focus restoration, and reduced-motion transitions.
- `SiteModal` keeps static closed content, a focus trap, focus restoration,
  document scroll locking, image selection, and separately timed dimmer/modal
  transitions. It uses library content subcomponents. Its outer dialog/dimmer
  classes remain centralized here because the library modal's portal lifecycle
  is different and does not provide the site's focus trap.

`SiteWidgets` resets shared state when navigation commits. Pending or cancelled
navigation must leave the current widgets usable. The domain names distinguish
these behaviors from the imported Fomantic primitives.
