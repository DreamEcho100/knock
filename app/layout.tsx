import Head from 'next/head'
import { ReactNode } from 'react'
import 'styles/globals.css'

interface Props {
  children: ReactNode
}

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <Head>
        <title>Next.js hello</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <div id="__next">{props.children}</div>
      </body>
    </html>
  )
}
