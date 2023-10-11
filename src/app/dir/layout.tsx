import { ErrorCatchProvider } from "@/components/error-catch-provider";
import { ReactNode } from "react";

export default function DirLayOut({ children }: { children: ReactNode }) {
  return (
    <div style={{ backgroundColor: "#123456" }}>
      <ErrorCatchProvider>{children}</ErrorCatchProvider>
    </div>
  );
}
