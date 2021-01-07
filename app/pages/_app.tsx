import { AppProps } from "blitz"
import "antd/dist/antd.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
