import EventEmitter from 'events';

class NotificationEmitter extends EventEmitter {}

export const notificationService = new NotificationEmitter();

notificationService.on('bookingConfirmed', (booking, user) => {
  // Simulate an asynchronous email/SMS notification
  console.log(`[Notification Service] 📧 Sending Email to ${user.email} for PNR: ${booking.pnr}...`);
  console.log(`[Notification Service] 📱 Sending SMS to ${user.phone || 'registered phone'} for PNR: ${booking.pnr}...`);
  
  setTimeout(() => {
    console.log(`[Notification Service] ✅ Notifications sent successfully for PNR: ${booking.pnr}`);
  }, 2000);
});
