import Image from 'next/image'
import coffe from '@/public/images/coffee.jpg'
import { Metadata } from 'next'

export default async function Home() {
  return (
    <main className='relative h-screen'>
      <h1>Hello World</h1>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const product = await fetch('');

  return {
    title: 'product.title',
    description: '....'
  }
}