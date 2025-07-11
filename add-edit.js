document.getElementById('employeeForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    id: Date.now(),  
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    email: document.getElementById('email').value.trim(),
    department: document.getElementById('department').value.trim(),
    role: document.getElementById('role').value.trim()
  };

  if (!validateForm(data)) return;

  let employees = JSON.parse(localStorage.getItem('employees')) || [];
  employees.push(data);
  localStorage.setItem('employees', JSON.stringify(employees));
  window.location.href = 'index.html';
});

function validateForm(data) {
  let isValid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  ['firstName', 'lastName', 'email', 'department', 'role'].forEach(field => {
    const el = document.getElementById(field);
    const errorEl = document.getElementById(field + 'Error');
    if (!data[field]) {
      errorEl.textContent = 'Required';
      isValid = false;
    } else {
      errorEl.textContent = '';
    }
  });

  if (!emailPattern.test(data.email)) {
    document.getElementById('emailError').textContent = 'Invalid email';
    isValid = false;
  }

  return isValid;
}
