import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const UsersManagement = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrations();
    fetchEvents();
  }, []);

  useEffect(() => {
    filterRegistrations();
  }, [selectedEvent, registrations]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/registration/all');
      const data = await response.json();
      setRegistrations(data);
      setFilteredRegistrations(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setLoading(false);
    }
  };

  const filterRegistrations = () => {
    if (selectedEvent === 'all') {
      setFilteredRegistrations(registrations);
    } else {
      const filtered = registrations.filter(reg => reg.selectedEvent === selectedEvent);
      setFilteredRegistrations(filtered);
    }
  };

  const exportToPDF = () => {
    try {
      // Create new document
      const doc = new jsPDF();

      // Add title
      const title = selectedEvent === 'all' ? 
        'All Event Registrations' : 
        `Registrations for ${selectedEvent}`;

      doc.setFontSize(20);
      doc.text(title, 14, 15);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

      // Prepare table data
      const tableColumn = ["Name", "Email", "Event", "Registration Date"];
      const tableRows = filteredRegistrations.map(registration => [
        registration.userName,
        registration.userEmail,
        registration.selectedEvent,
        new Date(registration.registrationDate).toLocaleDateString()
      ]);

      // Generate table
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        styles: { 
          fontSize: 8,
          cellPadding: 2
        },
        headStyles: { 
          fillColor: [66, 139, 202],
          textColor: [255, 255, 255]
        },
        alternateRowStyles: { 
          fillColor: [245, 245, 245] 
        }
      });

      // Save the PDF
      doc.save(`event-registrations-${selectedEvent === 'all' ? 'all' : selectedEvent}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Event Registrations</h2>
        <div className="flex gap-4">
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="all">All Events</option>
            {events.map(event => (
              <option key={event._id} value={event.name}>
                {event.name}
              </option>
            ))}
          </select>
          <button
            onClick={exportToPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registration Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRegistrations.map((registration) => (
              <tr key={registration._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {registration.userName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {registration.userEmail}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {registration.selectedEvent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(registration.registrationDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;