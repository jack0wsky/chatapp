import Head from "next/head"

type Props = {
  title: string | string[]
}

const HTMLHead = ({ title }: Props): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default HTMLHead
