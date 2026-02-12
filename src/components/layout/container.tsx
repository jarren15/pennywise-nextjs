import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  variant?: "fullMobileConstrainedPadded" | "constrainedPadded" | "fullMobileConstrainedBreakpointPadded" | "constrainedBreakpointPadded" | "narrowConstrainedPadded";
};

const containerVariants = cva("mx-auto", {
  variants: {
    variant: {
      fullMobileConstrainedPadded: "max-w-7xl sm:px-6 lg:px-8",
      constrainedPadded: "max-w-7xl px-4 sm:px-6 lg:px-8",
      fullMobileConstrainedBreakpointPadded: "max-w-screen-xl sm:px-6 lg:px-8",
      constrainedBreakpointPadded: "max-w-screen-xl px-4 sm:px-6 lg:px-8",
      narrowConstrainedPadded: "max-w-3xl px-4 sm:px-6 lg:px-8",
    },
  },
  defaultVariants: { variant: "narrowConstrainedPadded" },
});

function Container({ children, className, variant, ...props }: ContainerProps, ref: React.Ref<HTMLDivElement>) {
  return (
    <div ref={ref} className={cn(containerVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
}

export default React.forwardRef(Container);
