export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <main className="flex flex-col items-center p-6">
            <div className="flex w-[600px] max-w-[100%] flex-col items-stretch gap-4">
                {children}
            </div>
        </main>
    );
}
