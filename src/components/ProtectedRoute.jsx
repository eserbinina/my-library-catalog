import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, allowedRole }) {
  // Смотрим, кто зашел (библиотекарь или нет)
  const userRole = localStorage.getItem('userRole')
  
  // Если никто не заходил — отправляем на страницу входа
  if (!userRole) {
    return <Navigate to="/login" replace />
  }
  
  // Если роль не подходит (например, библиотекарь лезет в админку) — на главную
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/" replace />
  }
  
  // Если всё хорошо — показываем страницу
  return children
}

export default ProtectedRoute