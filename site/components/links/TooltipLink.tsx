import { type ReactElement } from "react";
import { Popup as FomanticPopup } from "react-fomantic-ui";

import { SitePopup } from "@/site/components/widgets/SitePopup";

export function TooltipLink({ trigger }: { trigger: ReactElement<any> }) {
  return (
    <SitePopup
      portal
      trigger={trigger}
      position={trigger.props["data-position"] || "top center"}
    >
      <FomanticPopup.Content>
        {trigger.props["data-content"]}
      </FomanticPopup.Content>
    </SitePopup>
  );
}
