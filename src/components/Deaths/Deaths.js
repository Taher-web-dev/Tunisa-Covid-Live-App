import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FLECHE from '../../assets/images/fleche.png';
import './Deaths.css';
import MonthDeathChart from './ChartDeathsMonth';

export const getDeathsDataLastDay = (lastDayData, lastDay) => {
  const updateData = lastDayData.dates[lastDay].countries.Tunisia;
  const todayVsYesterday = Math.round(updateData.today_vs_yesterday_deaths);
  const yesterdayTotalDeaths = updateData.yesterday_deaths;
  const newDeaths = updateData.today_new_deaths;
  const totalDeaths = updateData.today_deaths;
  return [todayVsYesterday, yesterdayTotalDeaths, newDeaths, totalDeaths];
};

export const computeGrowingRate = (dayData, previousDay, newDeaths) => {
  const dayBeforeData = dayData.dates[previousDay].countries.Tunisia;
  const newDeathsDayBefore = dayBeforeData.today_new_deaths;
  let growingRate = ((newDeaths - newDeathsDayBefore) / Math.max(1, newDeathsDayBefore)) * 100;
  growingRate = Math.floor(growingRate);
  return growingRate;
};
const DeathsCases = () => {
  const dayFormat = (day) => {
    const rightDay = parseInt(day, 10) <= 0 ? 30 - day : day;
    const rightFormat = rightDay < 10 ? `0${rightDay}` : rightDay;
    return rightFormat;
  };
  const monthFormat = (month) => (month <= 10 ? `0${month}` : month);
  const toDay = new Date();
  const lastDay = `${toDay.getFullYear()}-${monthFormat(toDay.getMonth() + 1)}-${dayFormat(toDay.getDate() - 1)}`;
  const previousDay = `${toDay.getFullYear()}-${monthFormat(toDay.getMonth() + 1)}-${dayFormat(toDay.getDate() - 2)}`;
  const updateData = useSelector((state) => state.latest);
  const dayBeforeData = useSelector((state) => state.dayBefore);
  let growingRate = 1.2;
  let totalDeaths = 20;
  let newDeaths = 20;
  let yesterdayTotalDeaths = 12;
  let todayVsYesterday = 0.5;
  if (Object.keys(updateData).length > 0) {
    [todayVsYesterday, yesterdayTotalDeaths,
      newDeaths, totalDeaths] = getDeathsDataLastDay(updateData, lastDay);
    if (Object.keys(dayBeforeData).length > 0) {
      growingRate = computeGrowingRate(dayBeforeData, previousDay, newDeaths);
      /* dayBeforeData = dayBeforeData.dates[previousDay].countries.Tunisia;
      const newDeathsDayBefore = dayBeforeData.today_new_deaths;
      growingRate = ((newDeaths - newDeathsDayBefore) / Math.max(1, newDeathsDayBefore)) * 100;
      growingRate = Math.floor(growingRate); */
    }
  }
  const adjustHeight = () => {
    const home = document.querySelector('.confirmed-cases-page').offsetHeight;
    const chartHeight = 220;
    const subtitleHeight = document.querySelector('.sub-title').offsetHeight;
    const indicators = document.querySelector('.indicator-breakdown');
    indicators.style.height = `${home - chartHeight - subtitleHeight}px`;
  };
  useEffect(() => adjustHeight(), []);
  return (
    <div className="confirmed-cases-page">
      <MonthDeathChart />
      <p
        className="sub-title"
        style={{
          backgroundColor: 'rgb(226, 77, 120)', fontSize: '18px', margin: '0 ', padding: '2.5% 0 2.5% 2.5%',
        }}
      >
        DEATHS BREAKDOWN
        {' '}
        {lastDay}
      </p>
      <div className="indicator-breakdown">
        <div className="confirmed-case-item total-cases">
          <p style={{
            fontWeight: '700', fontSize: '18px', margin: '0 20% 0 5%', width: '190px',
          }}
          >
            Total Deaths
          </p>
          <span style={{
            marginRight: '8%', fontSize: '18px', fontWeight: '700', width: '116px',
          }}
          >
            {totalDeaths}
            {' '}
            cases
          </span>
          <img src={FLECHE} alt="back icone" style={{ marginRight: '2.5%' }} />
        </div>
        <div className=" confirmed-case-item  yesterday-total-cases">
          <p style={{
            fontWeight: '700', fontSize: '18px', margin: '0 20% 0 5%', width: '190px',
          }}
          >
            Yesterday Total Deaths
          </p>
          <span style={{
            marginRight: '8%', fontSize: '18px', fontWeight: '700', width: '116px',
          }}
          >
            {yesterdayTotalDeaths}
            {' '}
            cases
          </span>
          <img src={FLECHE} alt="back icone" style={{ marginRight: '2.5%' }} />
        </div>
        <div className=" confirmed-case-item today-vs-yesterday-confirmed">
          <p style={{
            fontWeight: '700', fontSize: '18px', margin: '0 20% 0 5%', width: '190px',
          }}
          >
            Today Vs Yesterday New Deaths
          </p>
          <span style={{
            marginRight: '8%', fontSize: '18px', fontWeight: '700', width: '116px',
          }}
          >
            {todayVsYesterday}
          </span>
          <img src={FLECHE} alt="back icone" style={{ marginRight: '2.5%' }} />
        </div>
        <div className=" confirmed-case-item growing-cases">
          <p style={{
            fontWeight: '700', fontSize: '18px', margin: '0 20% 0 5%', width: '190px',
          }}
          >
            New Deaths Daily Growing Rate
          </p>
          <span style={{
            marginRight: '8%', fontSize: '18px', fontWeight: '700', width: '116px',
          }}
          >
            {growingRate}
            {' '}
            %
          </span>
          <img src={FLECHE} alt="back icone" style={{ marginRight: '2.5%' }} />
        </div>

      </div>
    </div>
  );
};
export default DeathsCases;
