export default function LianaAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' }
  return (
    <div
      className={`${dims[size]} rounded-full flex items-center justify-center shrink-0 shadow-md ring-2 ring-white/40`}
      style={{
        background: 'linear-gradient(135deg, #7C5CFC 0%, #5CA8FC 50%, #5CFCD6 100%)',
      }}
    >
      <span className="text-white font-extrabold tracking-tight drop-shadow-sm select-none">L</span>
    </div>
  )
}
