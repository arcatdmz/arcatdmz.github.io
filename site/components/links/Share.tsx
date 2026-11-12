import { SiteLink } from "@/site/components/links/SiteLink";
import { SiteImage } from "@/site/components/media/SiteImage";
import { DeferredScript } from "@/site/components/runtime/DeferredScript";
import { useSiteContext } from "@/site/hooks/useSiteContext";
import { href } from "@/site/rendering";

export function Share() {
  const { rootPath, protocol, domain, en, basePath, me, title } =
    useSiteContext();

  const URI = `${protocol}://${domain}${basePath}${me}`;
  const encodedURI = encodeURIComponent(URI);
  const hashtag = undefined;
  return (
    <>
      <div className="share">
        <SiteLink
          className="hatena-bookmark-button"
          href={href(
            `https://b.hatena.ne.jp/entry/${
              protocol === "https" ? "s/" : ""
            }${domain}${rootPath}${me}`,
          )}
          data-hatena-bookmark-url={URI}
          data-hatena-bookmark-layout="standard-balloon"
          data-hatena-bookmark-lang="ja"
          title="このエントリーをはてなブックマークに追加"
        >
          <SiteImage
            src="https://b.st-hatena.com/images/entry-button/button-only@2x.png"
            alt="このエントリーをはてなブックマークに追加"
            width="20"
            height="20"
            style={{ border: "none" }}
          />
        </SiteLink>

        <DeferredScript
          type="text/javascript"
          src="https://b.st-hatena.com/js/bookmark_button.js"
          charSet="utf-8"
          async={Boolean("async")}
          dangerouslySetInnerHTML={{ __html: "" }}
        />

        <SiteLink
          className="twitter-share-button"
          href={href(`https://twitter.com/intent/tweet?url=${encodedURI}`)}
          data-text={title}
          data-count="horizontal"
          data-hashtag={hashtag}
          data-counturl={URI}
        >
          {en ? "" : "ツイート"}
        </SiteLink>

        <DeferredScript
          dangerouslySetInnerHTML={{
            __html:
              'window.twttr = (function(d, s, id) {\n  var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};\n  if (d.getElementById(id)) return t;\n  js = d.createElement(s);\n  js.id = id;\n  js.src = "https://platform.twitter.com/widgets.js";\n  fjs.parentNode.insertBefore(js, fjs);\n  t._e = [];\n  t.ready = function(f) {\n    t._e.push(f);\n  };\n  return t;\n}(document, "script", "twitter-wjs"));',
          }}
        />

        <div
          className="fb-share-button"
          style={{ verticalAlign: "top" }}
          data-href={URI}
          data-layout="button_count"
        ></div>

        <div id="fb-root"></div>

        <DeferredScript
          dangerouslySetInnerHTML={{
            __html:
              "(function(d, s, id) {\n  var js, fjs = d.getElementsByTagName(s)[0];\n  if (d.getElementById(id)) return;\n  js = d.createElement(s); js.id = id;\n  js.src = \"//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=488785607828009\";\n  fjs.parentNode.insertBefore(js, fjs);\n}(document, 'script', 'facebook-jssdk'));\n",
          }}
        />
      </div>
    </>
  );
}
