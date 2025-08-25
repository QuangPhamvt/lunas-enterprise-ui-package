"use client";
import { PackageOpenIcon } from "lucide-react";

import { Flex } from "../layouts/flex";

export const EmptyDisplay = () => {
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      gap="sm"
      className="size-full"
    >
      <PackageOpenIcon
        size={52}
        strokeWidth={1}
        className="text-muted-foreground"
      />
      <p className="text-muted-foreground text-sm">
        Không có dữ liệu nào để hiển thị.
      </p>
    </Flex>
  );
};
