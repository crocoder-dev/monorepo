"use client"

import { usePathname } from "next/navigation";
import { useEffect } from "react"

export default function Main({children} : {children: React.ReactNode}) {
    const currentUrl = usePathname();

    useEffect(()=> {
        const targetElement = document.getElementById(currentUrl || '');
        
        const handleChangedPage = () => {
            if (currentUrl?.includes('articles')) {
                localStorage.setItem('prevUrl', currentUrl || '');
            }
        }

        handleChangedPage();

        if (!currentUrl?.includes('articles')) {
            const prevUrl = localStorage.getItem('prevUrl');
            document.getElementById(prevUrl || '')?.scrollIntoView();
            //console.log(prevUrl)
        }

        targetElement?.scrollIntoView();
    }, [currentUrl]);

    return (
        <div className="relative top-12">{children}</div>
    )
}