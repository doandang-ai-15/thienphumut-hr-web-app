// Dashboard JavaScript - Integrate with Real API

// Check authentication
if (!requireAuth()) {
    throw new Error('Not authenticated');
}

// Load dashboard data
async function loadDashboard() {
    try {
        showLoading();

        // Get current user
        const userResponse = await api.getMe();
        const user = userResponse.data;

        // Update user info in header
        updateUserInfo(user);

        // Load dashboard stats
        const statsResponse = await api.getDashboardStats();
        const dashboardData = statsResponse.data;

        // Update stats cards
        updateStatsCards(dashboardData.stats);

        // Update charts
        updateNewEmployeesChart(dashboardData.newEmployeesByMonth);
        updateDepartmentChart(dashboardData.departmentDistribution);

        // Update top performers
        updateTopPerformers(dashboardData.topEmployees);

        hideLoading();
    } catch (error) {
        hideLoading();
        console.error('Failed to load dashboard:', error);
        showError('Failed to load dashboard data. Please refresh the page.');
    }
}

// Update user info in header
function updateUserInfo(user) {
    const userNameElement = document.querySelector('header .text-sm.font-medium');
    if (userNameElement) {
        userNameElement.textContent = `${user.first_name} ${user.last_name}`;
    }

    // Update user initials
    const avatarElement = document.querySelector('header .w-8.h-8');
    if (avatarElement && !avatarElement.querySelector('img')) {
        const initials = `${user.first_name[0]}${user.last_name[0]}`;
        avatarElement.textContent = initials;
    }
}

// Update stats cards
function updateStatsCards(stats) {
    // Total Employees
    const totalEmpElement = document.querySelector('.text-2xl.font-semibold.text-gray-800');
    if (totalEmpElement && totalEmpElement.textContent === '248') {
        totalEmpElement.textContent = stats.total_employees || 0;
    }

    // New This Month
    const newEmployees = document.querySelectorAll('.text-2xl.font-semibold.text-gray-800')[1];
    if (newEmployees) {
        newEmployees.textContent = stats.new_this_month || 0;
    }

    // Departments
    const departments = document.querySelectorAll('.text-2xl.font-semibold.text-gray-800')[2];
    if (departments) {
        departments.textContent = stats.total_departments || 0;
    }

    // Satisfaction
    const satisfaction = document.querySelectorAll('.text-2xl.font-semibold.text-gray-800')[3];
    if (satisfaction) {
        const satValue = stats.avg_satisfaction || 0;
        satisfaction.textContent = `${satValue}%`;
    }
}

// Update new employees chart
function updateNewEmployeesChart(data) {
    const ctx = document.getElementById('newEmployeesChart');
    if (!ctx) return;

    const labels = data.map(d => d.month.trim());
    const values = data.map(d => parseInt(d.count) || 0);

    const colors = ['rgba(248, 117, 170, 0.8)', 'rgba(174, 222, 252, 0.8)', 'rgba(237, 255, 240, 0.9)'];
    const borderColors = ['#F875AA', '#AEDEFC', '#a8e6b0'];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'New Employees',
                data: values,
                backgroundColor: colors.slice(0, values.length),
                borderColor: borderColors.slice(0, values.length),
                borderWidth: 2,
                borderRadius: 12,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'white',
                    titleColor: '#1f2937',
                    bodyColor: '#6b7280',
                    borderColor: '#F875AA',
                    borderWidth: 1,
                    cornerRadius: 12,
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(248, 117, 170, 0.1)' },
                    ticks: { color: '#9ca3af' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#9ca3af' }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Update department distribution chart
function updateDepartmentChart(data) {
    const ctx = document.getElementById('departmentChart');
    if (!ctx) return;

    const labels = data.map(d => d.name);
    const values = data.map(d => parseInt(d.employee_count) || 0);
    const colors = data.map(d => d.color || '#F875AA');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
                borderColor: 'white',
                borderWidth: 4,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        color: '#6b7280',
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    backgroundColor: 'white',
                    titleColor: '#1f2937',
                    bodyColor: '#6b7280',
                    borderColor: '#F875AA',
                    borderWidth: 1,
                    cornerRadius: 12,
                    padding: 12
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Update top performers list
function updateTopPerformers(employees) {
    const container = document.querySelector('.space-y-4');
    if (!container) return;

    container.innerHTML = '';

    const rankColors = [
        'from-yellow-400 to-yellow-500',
        'from-gray-300 to-gray-400',
        'from-amber-600 to-amber-700',
        'from-[#F875AA]/60 to-[#F875AA]/80',
        'from-[#AEDEFC]/60 to-[#AEDEFC]/80'
    ];

    const bgColors = [
        'from-[#F875AA]/5',
        'from-[#AEDEFC]/5',
        'from-[#EDFFF0]/30',
        'from-[#FDEDED]/30',
        'from-[#AEDEFC]/5'
    ];

    employees.forEach((emp, index) => {
        const initials = `${emp.first_name[0]}${emp.last_name[0]}`;
        const score = emp.performance_score || 0;

        const html = `
            <div class="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${bgColors[index]} to-transparent hover:from-[#F875AA]/10 transition-all group">
                <div class="rank-badge w-10 h-10 rounded-full bg-gradient-to-br ${rankColors[index]} flex items-center justify-center text-white font-bold shadow-lg">
                    ${index + 1}
                </div>
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#F875AA] to-[#AEDEFC] p-0.5">
                    <div class="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <span class="text-sm font-medium text-gray-600">${initials}</span>
                    </div>
                </div>
                <div class="flex-1">
                    <p class="font-medium text-gray-800">${emp.first_name} ${emp.last_name}</p>
                    <p class="text-sm text-gray-500">${emp.job_title}</p>
                </div>
                <div class="flex-1 hidden sm:block">
                    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div class="progress-bar h-full bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] rounded-full" style="width: ${score}%"></div>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-semibold text-gray-800">${score}%</p>
                    <p class="text-xs text-gray-500">Performance</p>
                </div>
            </div>
        `;

        container.innerHTML += html;
    });

    // Animate progress bars
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100 + (index * 100));
        });
    }, 500);
}

// Logout function
async function handleLogout() {
    try {
        await api.logout();
        window.location.href = '/login.html';
    } catch (error) {
        console.error('Logout failed:', error);
        // Force logout anyway
        api.removeToken();
        window.location.href = '/login.html';
    }
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
    lucide.createIcons();

    // Animate progress bars on load
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500 + (index * 100));
        });
    }, 1000);
});
