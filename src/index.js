import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './App.css'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import { IgrFinancialChart } from 'igniteui-react-charts'
import { IgrFinancialChartModule } from 'igniteui-react-charts'
import { data } from './StocksUtility'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faChartLine, faTimesCircle } from '@fortawesome/free-solid-svg-icons'


IgrFinancialChartModule.register()


const FinancialChartPanes = () => {
  const [value, onChange] = useState(new Date())
  const [chartType, setChartType] = useState("Candle")

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

  const generateDays = () => {
    const days = []
    for (let i = 1; i <= 31; ++i) {
      days.push(i)
    }

    return days
  }


  return (
    <>
      <div className="main-menu">
        <a>Главное меню с гамбургером и кнопками</a>
      </div>
      <div className="list-of-stocks">
        <div style={{ color: '#90dc5c' }}>APPL &nbsp;&nbsp;<FontAwesomeIcon style={{ color: '#ddd' }} icon={ faTimesCircle } /> </div>
        <div style={{ color: '#8e5eb4' }}>MSFT &nbsp;&nbsp;<FontAwesomeIcon style={{ color: '#ddd' }} icon={ faTimesCircle } /> </div>
      </div>
      <div className="chart-menu">
        <select className="date">
          <option>2018</option>
          <option>2019</option>
          <option>2020</option>
          <option>2021</option>
          <option>2022</option>
        </select>
        <select className="date">
          {
            months.map((month) => <option>{ month }</option>)
          }
        </select>
        <select className="date">
          <option>—</option>
          {
            generateDays().map((day) => <option>{ day }</option>)
          }
        </select>

        <button style={{ marginLeft: 'calc(100% - 400px)', color: chartType === "Candle" ? '#90dc5c' : 'grey' }} onClick={ () => setChartType("Candle") }>
          <FontAwesomeIcon icon={ faChartBar } />
        </button>
        <button style={{ color: chartType === "Line" ? '#90dc5c' : 'grey' }} onClick={ () => setChartType("Line") }>
          <FontAwesomeIcon icon={ faChartLine } />
        </button>
      </div>
      <div className="stocks-menu">
        <p>Тут список акций и фильтр для их выгрузки (цена акции от-до, показывать акции иностранных компаний, чет еще возможно)</p>
      </div>
      <div className="container sample" >
        <div className="container">
          <IgrFinancialChart
            width="100%"
            height="100%"
            zoomSliderType="Line"
            isToolbarVisible={ false }
            chartType={ chartType }
            yAxisTitle="Financial Prices"
            negativeBrushes="Transparent"
            xAxisTitle="Months"
            overlayBrushes="rgba(5, 138, 0, 0.17)"
            overlayOutlines="rgba(5, 138, 0, 0.4)"
            overlayThickness={ 2 }
            dataSource={ data }
          />
        </div>
      </div>
    </>
  )
}

ReactDOM.render(<FinancialChartPanes />, document.getElementById('root'))
