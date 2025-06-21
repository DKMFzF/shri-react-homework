import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { CommonPage } from "@pages";
import { CommonSection, HeaderUI } from '../../components/ui';

export const AppLayout = () => {
  return (
    <CommonPage>
      <HeaderUI />
      <main id="main-content" style={{ height: 'calc(-140px + 100vh)' }}>
        <CommonSection>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </CommonSection>
      </main>
    </CommonPage>
  )
}
