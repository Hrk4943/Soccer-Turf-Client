export const getTimeSlot = (startTime, endTime, gap) => {
    const timeSlots = [];
    const startMatch = startTime.match(/^(\d{1,2}):(\d{2})$/);
    const endMatch = endTime.match(/^(\d{1,2}):(\d{2})$/);
    if (!startMatch) {
      throw new Error(`Invalid start time format: ${startTime}`);
    }
    if (!endMatch) {
      throw new Error(`Invalid end time format: ${endTime}`);
    }
    const startHour = parseInt(startMatch[1], 10);
    const startMinute = parseInt(startMatch[2], 10);
    const startDate = new Date(2000, 0, 1, startHour, startMinute);
    const endHour = parseInt(endMatch[1], 10);
    const endMinute = parseInt(endMatch[2], 10);
    const endDate = new Date(2000, 0, 1, endHour, endMinute);
    
    if (endDate < startDate) {
      throw new Error(`End time (${endTime}) cannot be earlier than start time (${startTime})`);
    }
    
    const duration = endDate - startDate;
    const numSlots = Math.floor(duration / (gap * 60 * 1000));
    
    for (let i = 0; i < numSlots; i++) {
      const slotTime = new Date(startDate.getTime() + (i * gap * 60 * 1000));
      let time = slotTime.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' });
      if (time.split(':')[0].length === 1) time = '0' + time;
      timeSlots.push(time);
    }
    
    return timeSlots;
  };
  




// export const getTimeSlot = (startTime, endTime, gap) => {
//     const timeSlots = [];
//     const startMatch = startTime.match(/^(\d{1,2}):(\d{2})$/);
//     if (!startMatch) {
//       throw new Error(`Invalid start time format: ${startTime}`);
//     }
//     const startHour = parseInt(startMatch[1], 10);
//     const startMinute = parseInt(startMatch[2], 10);
//     const startDate = new Date(2000, 0, 1, startHour, startMinute);
//     const endDate = new Date(`2000-01-01T${endTime}:00`);
    
//     const duration = endDate - startDate;
//     const numSlots = Math.floor(duration / (gap * 60 * 1000));
    
//     for (let i = 0; i < numSlots; i++) {
//       const slotTime = new Date(startDate.getTime() + (i * gap * 60 * 1000));
//       let time = slotTime.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' });
//       if (time.split(':')[0].length === 1) time = '0' + time;
//       timeSlots.push(time);
//     }
    
//     return timeSlots;
//   };









