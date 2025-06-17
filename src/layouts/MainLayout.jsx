import { Outlet } from 'react-router-dom'
import Header from '@/components/ui/Header'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-green-900 bg-opacity-80" style={{backgroundImage: 'url(/leaf-bg.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout 