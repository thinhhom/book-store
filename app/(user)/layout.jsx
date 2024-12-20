import { cookies } from 'next/headers'
import Head from 'next/head'
import '@/public/styles/reset.scss'
import '../globals.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AppProvider from '@/app/AppProvider'
import Providers from '@/redux/Provider'
import { UserProvider } from '../../context/user-context'

export const metadata = {
    title: 'Book store',
    description: 'Generated by create next app'
}

export default function RootLayout({ children }) {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken')

    return (
        <html lang="en">
            <Head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Book Store</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body suppressHydrationWarning={true}>
                <Providers>
                    <AppProvider initialUserSessionToken={sessionToken?.value}>
                        <UserProvider>{children}</UserProvider>
                    </AppProvider>
                </Providers>
            </body>
        </html>
    )
}
