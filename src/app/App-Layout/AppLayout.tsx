import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { CommonPage } from "@pages";
import { HeaderUI } from '../../components/ui';

export const AppLayout = () => {
  return (
    <CommonPage>
      <HeaderUI />
      <main id="main-content">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </CommonPage>
  )
}
