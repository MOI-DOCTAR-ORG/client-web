import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 bg-surface-container-low rounded-full flex items-center justify-center text-primary">
          <Icon icon="error" className="text-5xl" />
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">404</h1>
        <p className="font-headline-md text-headline-md text-secondary mb-4">Page not found</p>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/app"
          className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md hover:bg-primary/90 transition-colors"
        >
          <Icon icon="arrow_back" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
