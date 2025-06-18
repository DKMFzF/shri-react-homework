import { Suspense } from "react"
import { Outlet } from "react-router-dom"

export const AppLayout = () => {
  return (
    <>
      <header>ХЕДР</header>
      <Suspense>
        <Outlet />
      </Suspense>
      <footer>ФУТЕР</footer>
    </>   
  )
}
