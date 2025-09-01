import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";

export default function LoadingOverlay({ className, ...props }: React.ComponentProps<"div"> & { message: string }) {
  const { message } = props;

  return (
    <div className={className}>
      <span>{message}</span>
      <Spinner variant="ellipsis" />
    </div>
  );
}
