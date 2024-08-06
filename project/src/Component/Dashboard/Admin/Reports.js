import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { CSVLink } from 'react-csv';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './Reports.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Table component
const ReportTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <table className="reports-table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Chart component with static data
const ReportChart = ({ data }) => {
  const staticData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    values: [65, 59, 80, 81, 56, 55, 40],
  };

  const chartData = {
    labels: staticData.labels,
    datasets: [
      {
        label: 'Event Attendance',
        data: staticData.values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return <Line data={chartData} />;
};

// Export Button component
const ExportButton = ({ data }) => (
  <CSVLink data={data} filename="report.csv">
    <button className="btn">Export to CSV</button>
  </CSVLink>
);

// Mock function to fetch report data
const fetchReportData = async (type, filters) => {
  // Return mock data for testing
  return [
    { event: 'Event 1', participants: 120, revenue: 5000, satisfaction: 4.5 },
    { event: 'Event 2', participants: 95, revenue: 3000, satisfaction: 4.2 },
    { event: 'Event 3', participants: 150, revenue: 7000, satisfaction: 4.8 },
  ];
};

// Report Filters component (mock implementation)
const ReportFilters = ({ onChange }) => {
  // Sample filter update
  const updateFilters = () => {
    onChange({}); // Update with real filters as needed
  };

};

// Main Reports component
const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const loadReportData = async () => {
      try {
        const data = await fetchReportData('attendance', filters);
        setReportData(data);
      } catch (error) {
        console.error('Failed to load report data:', error);
      }
    };

    loadReportData();
  }, [filters]);

  // Calculate summary statistics
  const totalParticipants = reportData.reduce((total, event) => total + event.participants, 0);
  const totalRevenue = reportData.reduce((total, event) => total + event.revenue, 0);
  const averageSatisfaction = (reportData.reduce((total, event) => total + event.satisfaction, 0) / reportData.length).toFixed(2);

  const handleCustomReport = () => {
    // Logic for generating custom reports
    console.log('Generating custom report...');
  };

  const handleDownloadReport = () => {
    // Logic for downloading reports
    console.log('Downloading report...');
  };

  return (
    <div className="reports-widget">
      <h2 className="header">Reports</h2>
      <p>Generate and view reports and analytics for corporate events.</p>

      <div className="summary">
        <h3>Summary</h3>
        <p><strong>Total Participants:</strong> {totalParticipants}</p>
        <p><strong>Total Revenue:</strong> ${totalRevenue}</p>
        <p><strong>Average Satisfaction:</strong> {averageSatisfaction} / 5</p>
      </div>

      <ReportFilters onChange={setFilters} />
      <ReportTable data={reportData} />
      <ReportChart data={reportData} />
      <ExportButton data={reportData} />
    </div>
  );
};

export default Reports;
