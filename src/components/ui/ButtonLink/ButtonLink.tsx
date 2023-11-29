import Link from 'next/link'
import { FC } from 'react'

const ButtonLink = ({href, children}: {href: string, children: string}) => {
  return <Link href={href} className='text-white p-2 relative inline-flex items-center justify-center text-sm bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xm dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 lg:p-3'>{children}</Link>
}

export default ButtonLink