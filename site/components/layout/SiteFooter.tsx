import { Container, Divider, Icon, List, Segment } from "react-fomantic-ui";

import { buildYear } from "@/site/clock";
import { SiteComponentProps } from "@/site/components/layout/types";
import { SiteLink } from "@/site/components/links/SiteLink";
import { alternateLanguageHref } from "@/site/navigation";

export function SiteFooter({ context }: SiteComponentProps) {
  const { basePath, en } = context;
  const languageHref = alternateLanguageHref(context);
  return (
    <Segment basic textAlign="center" as="footer">
      <Container>
        <Divider />
        <List divided horizontal>
          <List.Item>
            ©{" "}
            <SiteLink href={`${basePath}#contact`}>
              {en ? "Jun Kato" : "加藤 淳"}
            </SiteLink>
          </List.Item>
          <List.Item>{`2012-${buildYear}`}</List.Item>
          <List.Item>
            <SiteLink href={`${basePath}privacy`}>
              <Icon name="envelope open outline" />
              {` ${en ? "Privacy Policy" : "プライバシーポリシー"}`}
            </SiteLink>
          </List.Item>
          {languageHref && (
            <List.Item>
              <List.Item role="link" as={SiteLink} href={languageHref}>
                <Icon name="translate" />
                {en ? " 日本語" : "English"}
              </List.Item>
            </List.Item>
          )}
        </List>
      </Container>
    </Segment>
  );
}
