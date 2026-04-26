import { useState } from 'react'

function DeleteSupplyModal({ onClose, onConfirm, supplyData }) {
  const handleSystemDelete = () => {
    if (onConfirm) onConfirm('system', supplyData)
    onClose()
  }

  const handlePhysicalDelete = () => {
    if (onConfirm) onConfirm('physical', supplyData)
    onClose()
  }

  const getSpecialtyInfo = () => {
    const specialtyMap = {
      '08.02.01': 'Строительство и эксплуатация зданий и сооружений',
      '07.02.01': 'Архитектура',
      '09.02.07': 'Информационные системы и программирование'
    }
    
    if (supplyData?.specialtyName) {
      return supplyData.specialtyName
    }
    
    if (supplyData?.specialty) {
      return specialtyMap[supplyData.specialty] || supplyData.specialty
    }
    
    return 'Не указана'
  }

  const getBookInfo = () => {
    if (supplyData?.selectedBooks && supplyData.selectedBooks.length > 0) {
      const book = supplyData.selectedBooks[0]
      return book.title || book.book || 'Нет информации'
    }
    if (supplyData?.book) {
      return supplyData.book
    }
    if (supplyData?.bookTitle) {
      return supplyData.bookTitle
    }
    if (supplyData?.title) {
      return supplyData.title
    }
    return 'Нет информации'
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        maxWidth: '600px',
        width: '90%',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        
        <h2 style={{ fontSize: '24px', margin: '0 0 20px 0', color: '#d32f2f' }}>Удаление записи из картотеки</h2>
        
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '16px', 
          borderRadius: '8px', 
          marginBottom: '20px'
        }}>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '13px', color: '#999', marginBottom: '4px' }}>Специальность:</div>
            <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
              {getSpecialtyInfo()}
            </div>
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '13px', color: '#999', marginBottom: '4px' }}>Предмет:</div>
            <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>
              {supplyData?.subject || 'Не указан'}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '13px', color: '#999', marginBottom: '4px' }}>Книга:</div>
            <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.4' }}>
              {getBookInfo()}
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffebee',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <img 
            src="/images/warning-icon.png" 
            alt="Внимание"
            style={{ width: '20px', height: '20px', objectFit: 'contain' }}
          />
          <span style={{ color: '#d32f2f', fontWeight: '500' }}>Внимание! Удаление записи необратимо</span>
        </div>

        <div style={{
          border: '1px solid #eee',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <h3 style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#333' }}>Системное удаление</h3>
          <p style={{ fontSize: '13px', color: '#666', margin: '0 0 16px 0' }}>
            Запись будет удалена из картотеки. История привязки к книгам сохранится в системе.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/images/system-delete-icon.png" 
              alt="Системное удаление"
              style={{ width: '30px', height: '30px', objectFit: 'contain' }}
            />
            <button 
              onClick={handleSystemDelete}
              style={{
                padding: '8px 20px',
                backgroundColor: '#ff9800',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Системное удаление
            </button>
          </div>
        </div>

        <div style={{
          border: '1px solid #eee',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#333' }}>Физическое удаление</h3>
          <p style={{ fontSize: '13px', color: '#666', margin: '0 0 16px 0' }}>
            Запись будет удалена из базы данных безвозвратно. Доступно только если нет привязки к книгам.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/images/physical-delete-icon.png" 
              alt="Физическое удаление"
              style={{ width: '30px', height: '30px', objectFit: 'contain' }}
            />
            <button 
              onClick={handlePhysicalDelete}
              style={{
                padding: '8px 20px',
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Физическое удаление
            </button>
          </div>
        </div>

        <button 
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            marginTop: '8px'
          }}
        >
          Отмена
        </button>

      </div>
    </div>
  )
}

export default DeleteSupplyModal