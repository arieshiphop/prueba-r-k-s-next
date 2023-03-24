'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { isLoading } from '@/store/isLoading.store'
export default function CustomLink({ href, children }) {
    const loadingStore = isLoading.getInstance();
    const handleClick = () => {
        loadingStore.setLoading(true)
        console.log('loading')
    }
    useEffect(() => {
        return () => {
            loadingStore.setLoading(false)
        }
    }, [])

    return (
        <>
            <Link href={href} onClick={() => handleClick}>
                {children}
            </Link>
        </>
    )
}