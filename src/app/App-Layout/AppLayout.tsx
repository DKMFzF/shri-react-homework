import { CommonPage } from "@pages";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <CommonPage>
      <header>ХЕДР</header>
      <main id="main-content">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </CommonPage>
  )
}
