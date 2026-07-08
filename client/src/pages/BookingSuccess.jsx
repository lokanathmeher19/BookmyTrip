import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: '#ffffff' },
  header: { fontSize: 24, marginBottom: 20, textAlign: 'center', color: '#2F80ED' },
  section: { margin: 10, padding: 10, border: '1px solid #eeeeee' },
  text: { fontSize: 12, marginBottom: 5 },
  bold: { fontSize: 12, fontWeight: 'bold', marginBottom: 5 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 }
});

const TicketPDF = ({ booking }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>TripEase E-Ticket</Text>
      <View style={styles.section}>
        <Text style={styles.title}>Booking Details</Text>
        <Text style={styles.bold}>PNR Number: {booking.pnr}</Text>
        <Text style={styles.text}>Status: {booking.status}</Text>
        <Text style={styles.text}>Date of Journey: {new Date(booking.travelDate).toLocaleDateString()}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Passengers</Text>
        {booking.passengers.map((p, idx) => (
          <Text key={idx} style={styles.text}>{idx + 1}. {p.name} ({p.age}, {p.gender})</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Fare Breakdown</Text>
        <Text style={styles.text}>Base Fare: Rs. {booking.fareBreakdown.baseFare}</Text>
        <Text style={styles.text}>Tax: Rs. {booking.fareBreakdown.tax}</Text>
        {booking.fareBreakdown.discount && <Text style={styles.text}>Discount: Rs. {booking.fareBreakdown.discount}</Text>}
        <Text style={styles.bold}>Total Fare: Rs. {booking.fareBreakdown.total}</Text>
      </View>
    </Page>
  </Document>
);

const BookingSuccess = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await api.get(`/bookings/${id}`);
        setBooking(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooking();
  }, [id]);

  if (!booking) return <div className="min-h-screen flex items-center justify-center">Loading Ticket...</div>;

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-[var(--color-status-confirmed-bg)] p-8 text-center border-b border-[var(--color-status-confirmed-text)]/20">
          <CheckCircle className="w-16 h-16 text-[var(--color-status-confirmed-text)] mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-[var(--color-status-confirmed-text)] font-semibold">Your ticket has been booked successfully.</p>
        </div>
        
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
            <div className="flex-1 space-y-4 w-full">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">PNR Number</p>
                <p className="text-2xl font-bold text-brand-blue tracking-widest">{booking.pnr}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-bold text-gray-900">₹{booking.fareBreakdown.total}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Journey Date</p>
                  <p className="font-bold text-gray-900">{new Date(booking.travelDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mt-4">
                <p className="text-sm text-gray-500 font-semibold mb-2 uppercase">Passengers</p>
                {booking.passengers.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1">
                    <span className="font-medium text-gray-800">{p.name}</span>
                    <span className="text-sm text-gray-500">{p.age} Yrs, {p.gender}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <QRCodeSVG value={`https://tripease.com/ticket/${booking.pnr}`} size={150} level="H" />
              <p className="text-xs text-gray-500 mt-4 font-medium text-center">Scan QR code for<br/>live ticket status</p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-center">
            <PDFDownloadLink 
              document={<TicketPDF booking={booking} />} 
              fileName={`TripEase-Ticket-${booking.pnr}.pdf`}
              className="flex items-center justify-center gap-2 bg-brand-blue text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto"
            >
              {({ blob, url, loading, error }) => (
                loading ? 'Generating PDF...' : <><Download className="w-5 h-5"/> Download PDF Ticket</>
              )}
            </PDFDownloadLink>
            
            <Link to="/" className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors w-full sm:w-auto">
              <ArrowLeft className="w-5 h-5"/> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
