import '@/styles/styles.css'
export default function Card({ children }: { children: React.ReactNode }) 
{
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            {children}
        </div>
    )
}