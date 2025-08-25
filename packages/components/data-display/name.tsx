import React from "react";

import { Paragraph } from "../typography/paragraph";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type NameDisplayProps = {
  name: string;
};

export const NameDisplay: React.FC<
  React.PropsWithChildren<NameDisplayProps>
> = ({ name }) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Paragraph variant="sm" className="line-clamp-2 cursor-help">
          {name}
        </Paragraph>
      </TooltipTrigger>
      <TooltipContent className="max-w-80 text-wrap break-keep whitespace-pre-line">
        {name}
      </TooltipContent>
    </Tooltip>
  );
};
