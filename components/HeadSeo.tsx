import Head from 'next/head'

type Props = {
  title?: string
  description?: string
}

export function HeadSeo({ title, description }: Props) {
  return (
    <Head>
      <title>{title ?? 'Интерент магазин'}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta
        name="description"
        content={description ?? 'Интернет магазин для портфолио'}
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
