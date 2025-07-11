const employeeListEl = document.getElementById('employeeList');
const searchInput = document.getElementById('searchInput');
const sortBy = document.getElementById('sortBy');
const pageSizeEl = document.getElementById('pageSize');
const paginationControls = document.getElementById('paginationControls');

let employees = [];
let currentPage = 1;

async function loadEmployees() {
  const stored = localStorage.getItem('employees');
  if (stored) {
    employees = JSON.parse(stored);
    renderEmployees();
  } else {
    try {
      const response = await fetch('data/employees.json');
      employees = await response.json();
      localStorage.setItem('employees', JSON.stringify(employees));
      renderEmployees();
    } catch (error) {
      console.error("Failed to load employees.json", error);
    }
  }
}

function renderEmployees(customList = employees) {
  const searchTerm = searchInput.value.toLowerCase();
  const pageSize = parseInt(pageSizeEl.value);

  let filtered = customList.filter(emp => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    const email = emp.email.toLowerCase();
    return fullName.includes(searchTerm) || email.includes(searchTerm);
  });

  const sortKey = sortBy.value;
  if (sortKey) {
    filtered.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  }

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  employeeListEl.innerHTML = paginated.map(emp => `
    <div class="card">
      <p><strong>ID:</strong> ${emp.id}</p>
      <p><strong>Name:</strong> ${emp.firstName} ${emp.lastName}</p>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    </div>
  `).join('');

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  paginationControls.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = (i === currentPage) ? 'active' : '';
    btn.onclick = () => {
      currentPage = i;
      renderEmployees();
    };
    paginationControls.appendChild(btn);
  }
}

function editEmployee(id) {
  window.location.href = `add-edit.html?id=${id}`;
}

function deleteEmployee(id) {
  if (confirm('Are you sure you want to delete this employee?')) {
    employees = employees.filter(emp => emp.id !== id);
    localStorage.setItem('employees', JSON.stringify(employees));
    renderEmployees();
  }
}

[searchInput, sortBy, pageSizeEl].forEach(el => {
  el && el.addEventListener('change', () => {
    currentPage = 1;
    renderEmployees();
  });
});


const filterBtn = document.querySelector('.filter-btn');
const filterBox = document.getElementById('filterBox');

filterBtn.addEventListener('click', () => {
  filterBox.classList.toggle('hidden');
});

function closeFilter() {
  filterBox.classList.add('hidden');
}

function applyFilters() {
  const name = document.getElementById('filterFirstName').value.toLowerCase();
  const dept = document.getElementById('filterDepartment').value;
  const role = document.getElementById('filterRole').value;

  currentPage = 1;

  const filtered = employees.filter(emp => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    return (
      (!name || fullName.includes(name)) &&
      (!dept || emp.department === dept) &&
      (!role || emp.role === role)
    );
  });

  renderEmployees(filtered);
  closeFilter();
}


loadEmployees();
