export const userValidateForm = (formData) => {
  const errors = {};

  if (!formData.name) {
    errors.name = 'Name is required';
  }

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password should be at least 6 characters long';
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!formData.phone) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10}$/.test(formData.phone)) {
    errors.phone = 'Phone number is invalid';
  }
  
  return errors;
};




export const validateForm = (formData) => {
    const errors = {};
  
    if (!formData.name) {
      errors.name = 'Name is required';
    }
  
    if (!formData.courtName) {
      errors.courtName = 'Court Name is required';
    }
  
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
  
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password should be at least 6 characters long';
    }
  
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

        if (!formData.number) {
        errors.number = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(formData.number)) {
        errors.number = "Mobile number is invalid";
    }
    if (!formData.sportsEvent) {
        errors.sportsEvent = 'Sports Events is required';
      }
      if (!formData.location) {
        errors.location = 'Location is required';
      }
    
      if (!formData.district) {
        errors.district = 'District is required';
      }
      if (!formData.state) {
        errors.state = 'State is required';
      }
      if (!formData.openingTime) {
        errors.openingTime = 'Opening Time is required';
      } else if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.openingTime)) {
        errors.openingTime = 'Opening Time format is invalid (HH:MM)';
      }
    
      if (!formData.closingTime) {
        errors.closingTime = 'Closing Time is required';
      } else if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.closingTime)) {
        errors.closingTime = 'Closing Time format is invalid (HH:MM)';
      }
    
  
    return errors;
  };














