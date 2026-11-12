export function popupTags(tags: string[]) {
  return tags.map((tag) =>
    tag.replace(
      /<a class="(.+)" data-tag="(.+)">/,
      '<a class="$1" data-tag="$2" data-position="bottom center">',
    ),
  );
}
