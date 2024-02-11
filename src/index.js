import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import { App } from "./App";
// import { Analytics } from '@vercel/analytics/react';
import "./index.css"

createRoot(document.getElementById("root")).render(
  <>
    <Suspense fallback={null}>
      <App />
      {/* <Analytics /> */}
    </Suspense>
  </>,
)
