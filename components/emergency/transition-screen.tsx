interface TransitionScreenProps {
  message: string
}

export default function TransitionScreen({ message }: TransitionScreenProps) {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center space-y-6 px-4 animate-fade-in">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <div className="space-y-2">
          {message.split("\n").map((line, i) => (
            <p key={i} className={`text-xl ${i === 0 ? "font-semibold" : "text-muted-foreground"}`}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
