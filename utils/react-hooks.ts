import { useEffect } from "react"
import { Router } from "blitz"
import { rootStore } from "stores"
export function useAuth() {
  useEffect(() => {
    if (!rootStore.auth.user) {
      Router.push("/")
    }
  }, [])
  return {}
}
