"use client";
import React from "react";
import type { FieldPath, FieldValues } from "react-hook-form";
import { ChevronDownIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  isShowErrorMsg?: boolean;
  modal?: boolean;
  description?: string;
  onAddNewItem?: () => void;
};

export const ComboboxField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label = "Combobox",
  placeholder = "Chọn một mục",
  description,
  options,
  onAddNewItem,
}: Props<TFieldValues>) => {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "flex justify-between rounded-md px-3",
                      "font-normal outline-offset-0",
                      "focus-visible:outline-[3px]",
                      "[&_div]:justify-between",
                      "data-[state=open]:border-primary",
                      "data-[state=open]:ring-ring",
                      "data-[state=open]:ring-4",
                      "focus:border-primary",
                      "focus:ring-ring",
                      "focus:ring-4",
                    )}
                  >
                    {field.value ? (
                      <span className="flex min-w-0 items-center gap-2">
                        {
                          options?.find(({ value }) => value === field.value)
                            ?.label
                        }
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        {placeholder}
                      </span>
                    )}
                    <ChevronDownIcon
                      size={16}
                      className="text-muted-foreground/80 shrink-0"
                      aria-hidden="true"
                    />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="border-input w-full max-w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                  <CommandInput placeholder={placeholder ?? "Tìm kiếm"} />
                  <CommandList>
                    <CommandGroup className="max-h-40 overflow-y-auto">
                      {options?.map(({ value, label }) => (
                        <CommandItem
                          key={value}
                          value={label}
                          onSelect={() => field.onChange(value)}
                        >
                          {label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    {onAddNewItem && (
                      <React.Fragment>
                        <CommandSeparator />
                        <CommandGroup>
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full justify-start font-normal"
                          >
                            <PlusIcon
                              size={14}
                              className="-ms-2 opacity-60"
                              aria-hidden="true"
                            />
                            Thêm mới
                          </Button>
                        </CommandGroup>
                      </React.Fragment>
                    )}
                  </CommandList>
                  <CommandEmpty>Không có kết quả</CommandEmpty>
                </Command>
              </PopoverContent>
            </Popover>
            {!!description && <FormDescription>{description}</FormDescription>}
          </FormItem>
        );
      }}
    />
  );
};
