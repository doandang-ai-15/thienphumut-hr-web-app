// Employees Page JavaScript - Integrate with Real API

// Check authentication
if (!requireAuth()) {
    throw new Error('Not authenticated');
}

let currentEmployees = [];
let currentFilters = {
    search: '',
    department: '',
    status: 'active'
};

// Load employees data
async function loadEmployees() {
    try {
        showLoading();

        const response = await api.getEmployees(currentFilters);

        if (response.success) {
            currentEmployees = response.data;
            renderEmployees(currentEmployees);
        }

        hideLoading();
    } catch (error) {
        hideLoading();
        console.error('Failed to load employees:', error);
        showError('Failed to load employees. Please refresh the page.');
    }
}

// Render employees grid
function renderEmployees(employees) {
    const container = document.querySelector('.grid.grid-cols-2');
    if (!container) return;

    if (employees.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <i data-lucide="users" class="w-10 h-10 text-gray-400"></i>
                </div>
                <p class="text-gray-500">No employees found</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    container.innerHTML = employees.map((emp, index) => {
        const initials = `${emp.first_name[0]}${emp.last_name[0]}`;
        const statusColors = {
            'active': 'bg-[#EDFFF0] text-green-600',
            'on-leave': 'bg-[#FDEDED] text-yellow-600',
            'inactive': 'bg-gray-100 text-gray-600'
        };
        const statusDots = {
            'active': 'bg-green-400',
            'on-leave': 'bg-yellow-400',
            'inactive': 'bg-gray-400'
        };
        const statusText = {
            'active': 'Active',
            'on-leave': 'On Leave',
            'inactive': 'Inactive'
        };

        const gradients = [
            'from-[#F875AA] to-[#AEDEFC]',
            'from-[#AEDEFC] to-[#EDFFF0]',
            'from-[#F875AA] to-[#FDEDED]',
            'from-[#AEDEFC] to-[#F875AA]',
            'from-[#EDFFF0] to-[#AEDEFC]'
        ];
        const gradient = gradients[index % gradients.length];

        return `
            <a href="#" onclick="viewEmployeeDetail(${emp.id}); return false;"
               class="employee-card bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 text-center cursor-pointer transition-all duration-300 fade-up stagger-${(index % 6) + 1}">
                <div class="avatar-ring w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${gradient} p-0.5 transition-all duration-300">
                    <div class="w-full h-full rounded-full bg-[#FDEDED] flex items-center justify-center text-2xl font-semibold text-[#F875AA]">
                        ${initials}
                    </div>
                </div>
                <h3 class="mt-4 text-sm font-semibold text-gray-800">${emp.first_name} ${emp.last_name}</h3>
                <p class="text-xs text-gray-500 mt-1">${emp.department_name || 'No Department'}</p>
                <div class="mt-3 inline-flex items-center gap-1 px-2 py-1 ${statusColors[emp.status]} rounded-full">
                    <span class="w-1.5 h-1.5 ${statusDots[emp.status]} rounded-full"></span>
                    <span class="text-xs">${statusText[emp.status]}</span>
                </div>
            </a>
        `;
    }).join('');

    lucide.createIcons();
}

// Search employees
function handleSearch(event) {
    const searchValue = event.target.value.toLowerCase();
    currentFilters.search = searchValue;
    loadEmployees();
}

// Filter by department
function handleDepartmentFilter(departmentId) {
    currentFilters.department = departmentId;
    loadEmployees();
}

// Filter by status
function handleStatusFilter(status) {
    currentFilters.status = status;
    loadEmployees();
}

// View employee detail
async function viewEmployeeDetail(id) {
    try {
        const response = await api.getEmployee(id);
        if (response.success) {
            showEmployeeDetailModal(response.data);
        }
    } catch (error) {
        console.error('Failed to load employee details:', error);
        showError('Failed to load employee details');
    }
}

// Show employee detail modal
function showEmployeeDetailModal(employee) {
    const modal = document.createElement('div');
    modal.id = 'employeeDetailModal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';

    const initials = `${employee.first_name[0]}${employee.last_name[0]}`;

    modal.innerHTML = `
        <div class="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onclick="closeEmployeeDetailModal()"></div>
        <div class="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div class="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-[#FDEDED]/50 to-[#EDFFF0]/50">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#F875AA] to-[#AEDEFC] flex items-center justify-center text-white text-2xl font-bold">
                            ${initials}
                        </div>
                        <div>
                            <h2 class="text-2xl font-semibold text-gray-800">${employee.first_name} ${employee.last_name}</h2>
                            <p class="text-gray-500">${employee.job_title}</p>
                        </div>
                    </div>
                    <button onclick="closeEmployeeDetailModal()" class="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <i data-lucide="x" class="w-5 h-5 text-gray-500"></i>
                    </button>
                </div>
            </div>

            <div class="px-8 py-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <p class="text-sm text-gray-500 mb-1">Employee ID</p>
                        <p class="font-medium text-gray-800">${employee.employee_id}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mb-1">Email</p>
                        <p class="font-medium text-gray-800">${employee.email}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mb-1">Phone</p>
                        <p class="font-medium text-gray-800">${employee.phone || 'N/A'}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mb-1">Department</p>
                        <p class="font-medium text-gray-800">${employee.department_name || 'N/A'}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mb-1">Employment Type</p>
                        <p class="font-medium text-gray-800 capitalize">${employee.employment_type}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mb-1">Start Date</p>
                        <p class="font-medium text-gray-800">${new Date(employee.start_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mb-1">Status</p>
                        <p class="font-medium text-gray-800 capitalize">${employee.status}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 mb-1">Performance</p>
                        <p class="font-medium text-gray-800">${employee.performance_score}%</p>
                    </div>
                </div>

                ${employee.subordinates && employee.subordinates.length > 0 ? `
                    <div class="mt-6 pt-6 border-t border-gray-100">
                        <h3 class="font-semibold text-gray-800 mb-3">Team Members (${employee.subordinates.length})</h3>
                        <div class="space-y-2">
                            ${employee.subordinates.map(sub => `
                                <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#AEDEFC] to-[#EDFFF0] flex items-center justify-center text-xs font-semibold">
                                        ${sub.first_name[0]}${sub.last_name[0]}
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-800">${sub.first_name} ${sub.last_name}</p>
                                        <p class="text-xs text-gray-500">${sub.job_title}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>

            <div class="px-8 py-5 border-t border-gray-100 bg-gray-50">
                <button onclick="closeEmployeeDetailModal()" class="w-full py-3 bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] text-white rounded-xl font-medium hover:shadow-lg transition-all">
                    Close
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    lucide.createIcons();
}

// Close employee detail modal
function closeEmployeeDetailModal() {
    const modal = document.getElementById('employeeDetailModal');
    if (modal) {
        modal.remove();
    }
}

// Open Add Employee Modal
async function openAddEmployeeModal() {
    try {
        // Fetch the modal HTML
        const response = await fetch('/employee-add-modal.html');
        const modalHTML = await response.text();

        // Inject into container
        const container = document.getElementById('modalContainer');
        container.innerHTML = modalHTML;

        // Show modal
        const modal = document.getElementById('addEmployeeModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            lucide.createIcons();

            // Load departments and setup form
            await loadDepartmentsForForm();
            setupModalFormHandler();
        }
    } catch (error) {
        console.error('Failed to load modal:', error);
        showError('Failed to open add employee form');
    }
}

// Setup form handler for dynamically loaded modal
function setupModalFormHandler() {
    const addForm = document.getElementById('addEmployeeForm');
    if (addForm) {
        addForm.addEventListener('submit', handleAddEmployee);
    }
}

// Close Add Employee Modal
function closeAddEmployeeModal() {
    const modal = document.getElementById('addEmployeeModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';

        // Clear modal container after animation
        setTimeout(() => {
            const container = document.getElementById('modalContainer');
            if (container) {
                container.innerHTML = '';
            }
        }, 300);
    }
}

// Load departments for form
async function loadDepartmentsForForm() {
    try {
        const response = await api.getDepartments();
        if (response.success) {
            const select = document.querySelector('#addEmployeeForm select[name="department"]');
            if (select) {
                select.innerHTML = '<option value="">Select department</option>' +
                    response.data.map(dept =>
                        `<option value="${dept.id}">${dept.name}</option>`
                    ).join('');
            }
        }
    } catch (error) {
        console.error('Failed to load departments:', error);
    }
}

// Handle add employee form submission
async function handleAddEmployee(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const employeeData = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        date_of_birth: formData.get('date_of_birth'),
        gender: formData.get('gender'),
        job_title: formData.get('job_title'),
        department_id: formData.get('department') ? parseInt(formData.get('department')) : null,
        employment_type: formData.get('employment_type'),
        start_date: formData.get('start_date'),
        salary: formData.get('salary') ? parseFloat(formData.get('salary')) : null,
        pay_frequency: formData.get('pay_frequency'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zip_code: formData.get('zip_code'),
        country: formData.get('country')
    };

    try {
        showLoading();
        const response = await api.createEmployee(employeeData);

        if (response.success) {
            hideLoading();
            showSuccess('Employee added successfully!');
            closeAddEmployeeModal();
            form.reset();

            // Reload employee list to show new employee immediately
            await loadEmployees();
        }
    } catch (error) {
        hideLoading();
        console.error('Failed to create employee:', error);
        showError(error.message || 'Failed to create employee');
    }
}

// Initialize employees page
document.addEventListener('DOMContentLoaded', function() {
    loadEmployees();
    lucide.createIcons();

    // Setup search
    const searchInput = document.querySelector('input[placeholder="Search employees..."]');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Close modal on escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAddEmployeeModal();
            closeEmployeeDetailModal();
        }
    });
});
