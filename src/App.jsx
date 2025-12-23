import { useState } from 'react'

export default function App() {
  const [bill, setBill] = useState('')
  const [percent, setPercent] = useState(15)
  const [custom, setCustom] = useState('')
  const [people, setPeople] = useState(1)
  const [rounding, setRounding] = useState('none')

  const tipPercent = custom && custom.trim() !== '' ? Number(custom) : percent
  const billNum = Number(bill) || 0
  const tip = billNum * tipPercent / 100
  const total = billNum + tip
  let per = total / people

  if (rounding === 'floor') per = Math.floor(per)
  if (rounding === 'ceil') per = Math.ceil(per)
  if (rounding === 'standard') per = Math.round(per)

  const formatCurrency = (amount) => {
    if (rounding === 'none') {
      return amount.toFixed(2)
    } else {
      return Math.round(amount).toFixed(0)
    }
  }

  const reset = () => {
    setBill('')
    setPercent(15)
    setCustom('')
    setPeople(1)
    setRounding('none')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${formatCurrency(per)} сом`)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full grid md:grid-cols-2 gap-8 p-8">
        {/* Левая секция - Входные данные */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            {/* Логотип */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">TIP</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Калькулятор чаевых</h1>
          </div>
          
          {/* Сумма счёта */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Сумма счёта
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="0.00"
              value={bill}
              onChange={e => setBill(e.target.value)}
            />
          </div>

          {/* Процент чаевых */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Процент чаевых
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[10, 15, 18, 20].map(p => (
                <button
                  key={p}
                  onClick={() => {
                    setPercent(p)
                    setCustom('')
                  }}
                  className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                    percent === p && !custom
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
              {p}%
            </button>
          ))}
        </div>
            <button
              onClick={() => {
                setCustom('')
                setPercent(15)
              }}
              className="w-full py-2 px-4 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-colors"
            >
              Custom
            </button>
            <input
              type="number"
              className="w-full border border-gray-300 p-3 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Введите процент (например: 12.5)"
              value={custom}
              onChange={e => {
                const value = e.target.value
                setCustom(value)
                if (value) {
                  setPercent(15) // Сбрасываем стандартный процент при вводе кастомного
                }
              }}
            />
          </div>

          {/* Количество людей */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Количество людей
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPeople(Math.max(1, people - 1))}
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                className="flex-1 border border-gray-300 p-3 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={people}
                onChange={e => setPeople(Math.max(1, Number(e.target.value) || 1))}
              />
              <button
                onClick={() => setPeople(people + 1)}
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700"
              >
                +
              </button>
              <span className="text-sm text-gray-500">Минимум 1</span>
            </div>
          </div>

          {/* Округление */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Округление
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rounding"
                  checked={rounding === 'none'}
                  onChange={() => setRounding('none')}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-gray-700">Без (2 знака)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rounding"
                  checked={rounding === 'floor'}
                  onChange={() => setRounding('floor')}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-gray-700">В меньшую</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rounding"
                  checked={rounding === 'ceil'}
                  onChange={() => setRounding('ceil')}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-gray-700">В большую</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rounding"
                  checked={rounding === 'standard'}
                  onChange={() => setRounding('standard')}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-gray-700">До стандарта</span>
              </label>
            </div>
          </div>

          {/* Подсказка */}
          <p className="text-xs text-gray-500">
            Подсказка: значения пересчитываются автоматически при изменении входных данных.
          </p>
          <p className="text-xs text-gray-400">
            Дизайн: чистый, минималистичный — легко адаптируется под мобильные экраны.
          </p>
        </div>

        {/* Правая секция - Результаты */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Быстро рассчитать и разделить счёт</h2>
          
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Сумма чаевых</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(tip)} сом</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Итоговая сумма</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(total)} сом</p>
        </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Сумма на человека</p>
              <p className="text-3xl font-bold text-purple-600">{formatCurrency(per)} сом</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={reset}
              className="flex-1 py-3 px-6 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
            >
              Сброс
            </button>
        <button
              onClick={copyToClipboard}
              className="flex-1 py-3 px-6 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
            >
              Копировать
        </button>
          </div>
        </div>
      </div>
    </div>
  )
}
