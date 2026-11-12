import { Embed } from "react-fomantic-ui";

export function EmbedYoutube({ src }: { src?: string }) {
  return (
    <>
      <Embed active icon={false}>
        <iframe
          src={src}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen={Boolean(true)}
        ></iframe>
      </Embed>
    </>
  );
}
