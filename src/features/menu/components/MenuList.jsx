import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMenu } from '../menuSlice'
import MenuItem from './MenuItem'

const MenuList = () => {
  const dispatch = useDispatch()
  const menuItems = useSelector((state) => state.menu.items)
  const menuStatus = useSelector((state) => state.menu.status)
  const error = useSelector((state) => state.menu.error)

  useEffect(() => {
    if (menuStatus === 'idle') {
      dispatch(fetchMenu())
    }
  }, [menuStatus, dispatch])

  if (menuStatus === 'loading') {
    return <div>Loading menu...</div>
  }

  if (menuStatus === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  )
}

export default MenuList 