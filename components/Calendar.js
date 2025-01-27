// components/FullPageCalendar.js
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FullPageCalendar = () => {
  const [appointments, setAppointments] = useState([]);
  const daysOfWeek = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          'https://bewash-bb768-default-rtdb.europe-west1.firebasedatabase.app/reservations.json'
        );

        // Trasformazione dei dati da oggetto a array
        const data = response.data;
        if (data) {
          const appointmentsArray = Object.keys(data).map((key) => ({
            date: data[key].date, // Assumi che la data sia in formato "YYYY-MM-DD"
            time: data[key].time, // Assumi che l'ora sia in formato "HH:mm"
            title: data[key].title,
          }));
          setAppointments(appointmentsArray);
        }
      } catch (error) {
        console.error('Errore nel recupero degli appuntamenti:', error);
      }
    };

    fetchAppointments();
  }, []);

  // Funzione per raggruppare gli appuntamenti per giorno
  const getAppointmentsForDay = (day) => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.dataOra);
      return appointmentDate.getDay() === day;
    });
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="calendar-day">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-body">
        <div className="calendar-hours">
          {hours.map((hour, index) => (
            <div key={index} className="hour">
              {hour}
            </div>
          ))}
        </div>
        <div className="calendar-grid">
          {daysOfWeek.map((_, dayIndex) => (
            <div key={dayIndex} className="calendar-column">
              {getAppointmentsForDay(dayIndex).map((appointment, index) => (
                <div
                  key={index}
                  className="appointment"
                  style={{
                    top: `${parseInt(appointment.dataOra.split(':')[0]) * 50}px`,
                  }}
                >
                  {appointment.macchina}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .calendar-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          font-family: Arial, sans-serif;
        }

        .calendar-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          background:rgb(0, 0, 0);
          border-bottom: 1px solid #ddd;
          text-align: center;
          font-weight: bold;
          padding: 10px 0;
        }

        .calendar-day {
          border-right: 1px solid #ddd;
        }

        .calendar-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .calendar-hours {
          width: 60px;
          border-right: 1px solid #ddd;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding-right: 10px;
          background:rgb(0, 0, 0);
        }

        .hour {
          height: 50px;
          border-bottom: 1px solid #eee;
          font-size: 12px;
          line-height: 50px;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          flex: 1;
          position: relative;
        }

        .calendar-column {
          position: relative;
          border-right: 1px solid #ddd;
        }

        .appointment {
          position: absolute;
          left: 10px;
          right: 10px;
          background: #00bcd4;
          color: white;
          padding: 5px;
          border-radius: 4px;
          font-size: 12px;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default FullPageCalendar;
