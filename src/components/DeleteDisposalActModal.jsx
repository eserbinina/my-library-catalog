import { useState } from 'react'

function DeleteDisposalActModal({ act, onClose, onConfirm }) {
  const [selectedMode, setSelectedMode] = useState(null)

  const handleSystemDelete = () => {
    if (onConfirm) onConfirm('system', act)
    onClose()
  }

  const handlePhysicalDelete = () => {
    if (onConfirm) onConfirm('physical', act)
    onClose()
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
        
        <h2 style={{ fontSize: '24px', margin: '0 0 20px 0', color: '#d32f2f' }}>Удаление акта</h2>
        
        {/* Информация об акте */}
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '16px', 
          borderRadius: '8px', 
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '13px', color: '#999', marginBottom: '4px' }}>Номер акта:</div>
              <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>{act?.actNumber || '—'}</div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#999', marginBottom: '4px' }}>Дата акта:</div>
              <div style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>{act?.date || '—'}</div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#999', marginBottom: '4px' }}>Статус:</div>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: '500',
                color: act?.status === 'Проведен' ? '#2e7d32' : act?.status === 'Редактируется' ? '#ed6c02' : '#757575'
              }}>
                {act?.status || '—'}
              </div>
            </div>
          </div>
        </div>

        {/* Предупреждение */}
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
          <span style={{ color: '#d32f2f', fontWeight: '500' }}>Внимание! Удаление акта необратимо</span>
        </div>

        {/* СИСТЕМНОЕ УДАЛЕНИЕ - ЖЁЛТОЕ */}
        <div style={{
          border: '1px solid #ffe0b2',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          backgroundColor: selectedMode === 'system' ? '#fff8e1' : '#fff'
        }}
        onClick={() => setSelectedMode('system')}>
          <h3 style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#f5a623' }}>Системное удаление</h3>
          <p style={{ fontSize: '13px', color: '#f5a623', margin: '0 0 16px 0' }}>
            Перевести в статус "Черновик". История сохранится.
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
                backgroundColor: '#f5a623',
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

        {/* ФИЗИЧЕСКОЕ УДАЛЕНИЕ - КРАСНОЕ */}
        <div style={{
          border: '1px solid #ffcdd2',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          backgroundColor: selectedMode === 'physical' ? '#ffebee' : '#fff'
        }}
        onClick={() => setSelectedMode('physical')}>
          <h3 style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#d32f2f' }}>Физическое удаление</h3>
          <p style={{ fontSize: '13px', color: '#d32f2f', margin: '0 0 16px 0' }}>
            Полное удаление из БД без возможности восстановления.
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
                backgroundColor: '#d32f2f',
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

export default DeleteDisposalActModal