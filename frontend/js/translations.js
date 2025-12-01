// Global Translation System for PeopleHub HR
// Default language: Vietnamese (vi)

const translations = {
    vi: {
        // Common
        'welcome': 'Chào mừng',
        'logout': 'Đăng xuất',
        'save': 'Lưu',
        'cancel': 'Hủy',
        'edit': 'Sửa',
        'delete': 'Xóa',
        'add': 'Thêm',
        'search': 'Tìm kiếm',
        'filter': 'Lọc',
        'actions': 'Thao tác',
        'status': 'Trạng thái',
        'details': 'Chi tiết',
        'close': 'Đóng',
        'confirm': 'Xác nhận',
        'loading': 'Đang tải...',

        // Navigation
        'dashboard': 'Tổng quan',
        'employees': 'Nhân viên',
        'departments': 'Phòng ban',
        'leaveApplications': 'Đơn nghỉ phép',
        'contracts': 'Hợp đồng',
        'settings': 'Cài đặt',

        // Dashboard
        'totalEmployees': 'Tổng nhân viên',
        'activeEmployees': 'Đang làm việc',
        'onLeave': 'Đang nghỉ',
        'newHires': 'Nhân viên mới',
        'pendingRequests': 'Yêu cầu chờ duyệt',
        'upcomingBirthdays': 'Sinh nhật sắp tới',
        'recentActivities': 'Hoạt động gần đây',
        'quickActions': 'Thao tác nhanh',
        'addEmployee': 'Thêm nhân viên',
        'createDepartment': 'Tạo phòng ban',
        'viewReports': 'Xem báo cáo',

        // Employees
        'employeeList': 'Danh sách nhân viên',
        'addNewEmployee': 'Thêm nhân viên mới',
        'allEmployees': 'Tất cả',
        'active': 'Đang làm',
        'inactive': 'Nghỉ việc',
        'onProbation': 'Thử việc',
        'searchEmployees': 'Tìm nhân viên...',
        'allDepartments': 'Tất cả phòng ban',
        'name': 'Họ tên',
        'position': 'Chức vụ',
        'department': 'Phòng ban',
        'email': 'Email',
        'phone': 'Điện thoại',
        'startDate': 'Ngày bắt đầu',
        'salary': 'Lương',
        'employeeDetails': 'Thông tin nhân viên',
        'personalInfo': 'Thông tin cá nhân',
        'workInfo': 'Thông tin công việc',
        'firstName': 'Tên',
        'lastName': 'Họ',
        'dateOfBirth': 'Ngày sinh',
        'gender': 'Giới tính',
        'male': 'Nam',
        'female': 'Nữ',
        'other': 'Khác',
        'preferNot': 'Không tiết lộ',
        'address': 'Địa chỉ',
        'city': 'Thành phố',
        'state': 'Tỉnh/Thành',
        'zipCode': 'Mã bưu điện',
        'country': 'Quốc gia',
        'employeeId': 'Mã nhân viên',
        'jobTitle': 'Chức danh',
        'employmentType': 'Loại hợp đồng',
        'fullTime': 'Toàn thời gian',
        'partTime': 'Bán thời gian',
        'contract': 'Hợp đồng',
        'intern': 'Thực tập',
        'reportsTo': 'Báo cáo cho',
        'payFrequency': 'Chu kỳ lương',
        'monthly': 'Hàng tháng',
        'biWeekly': 'Hai tuần một lần',
        'weekly': 'Hàng tuần',
        'annually': 'Hàng năm',
        'performanceScore': 'Điểm đánh giá',

        // Departments
        'departmentList': 'Danh sách phòng ban',
        'createNewDepartment': 'Tạo phòng ban mới',
        'allDepartments': 'Tất cả phòng ban',
        'departmentName': 'Tên phòng ban',
        'manager': 'Quản lý',
        'employeeCount': 'Số nhân viên',
        'budget': 'Ngân sách',
        'departmentDetails': 'Chi tiết phòng ban',
        'description': 'Mô tả',
        'location': 'Địa điểm',
        'updateDepartment': 'Cập nhật phòng ban',
        'deleteDepartment': 'Xóa phòng ban',

        // Leave Applications
        'leaveApplications': 'Đơn nghỉ phép',
        'newRequest': 'Tạo đơn mới',
        'pending': 'Chờ duyệt',
        'approved': 'Đã duyệt',
        'rejected': 'Từ chối',
        'allRequests': 'Tất cả đơn',
        'searchRequests': 'Tìm đơn nghỉ...',
        'allTypes': 'Tất cả loại',
        'vacation': 'Nghỉ phép',
        'sick': 'Nghỉ ốm',
        'personal': 'Việc cá nhân',
        'maternity': 'Nghỉ thai sản',
        'paternity': 'Nghỉ chăm con',
        'unpaid': 'Không lương',
        'employee': 'Nhân viên',
        'type': 'Loại',
        'duration': 'Thời gian',
        'reason': 'Lý do',
        'leaveType': 'Loại nghỉ',
        'fromDate': 'Từ ngày',
        'toDate': 'Đến ngày',
        'days': 'Số ngày',
        'totalRequests': 'Tổng số đơn',
        'approve': 'Duyệt',
        'reject': 'Từ chối',
        'leaveDetails': 'Chi tiết đơn nghỉ',
        'appliedOn': 'Ngày nộp',
        'reviewedBy': 'Người duyệt',

        // Contracts
        'contracts': 'Hợp đồng',
        'newContract': 'Hợp đồng mới',
        'totalContracts': 'Tổng hợp đồng',
        'expiring': 'Sắp hết hạn',
        'expired': 'Đã hết hạn',
        'allContracts': 'Tất cả',
        'expiringSoon': 'Sắp hết hạn',
        'searchContracts': 'Tìm hợp đồng...',
        'permanent': 'Vô thời hạn',
        'fixedTerm': 'Có thời hạn',
        'freelance': 'Tự do',
        'internship': 'Thực tập',
        'contractType': 'Loại hợp đồng',
        'contractDetails': 'Chi tiết hợp đồng',
        'contractNumber': 'Số hợp đồng',
        'signedDate': 'Ngày ký',
        'expiryDate': 'Ngày hết hạn',

        // Settings
        'settings': 'Cài đặt',
        'profile': 'Hồ sơ',
        'company': 'Công ty',
        'security': 'Bảo mật',
        'preferences': 'Tùy chỉnh',
        'language': 'Ngôn ngữ',
        'timezone': 'Múi giờ',
        'dateFormat': 'Định dạng ngày',
        'profileSettings': 'Cài đặt hồ sơ',
        'updateProfile': 'Cập nhật hồ sơ',
        'companyInformation': 'Thông tin công ty',
        'companyName': 'Tên công ty',
        'industry': 'Ngành nghề',
        'companySize': 'Quy mô',
        'website': 'Website',
        'changePassword': 'Đổi mật khẩu',
        'currentPassword': 'Mật khẩu hiện tại',
        'newPassword': 'Mật khẩu mới',
        'confirmPassword': 'Xác nhận mật khẩu',
        'uploadPhoto': 'Tải ảnh lên',
        'removePhoto': 'Xóa ảnh',
        'saveChanges': 'Lưu thay đổi',

        // Messages
        'successMessage': 'Thành công!',
        'errorMessage': 'Có lỗi xảy ra!',
        'confirmDelete': 'Bạn có chắc muốn xóa?',
        'noDataAvailable': 'Không có dữ liệu',
        'loadingData': 'Đang tải dữ liệu...',
        'savedSuccessfully': 'Đã lưu thành công!',
        'deletedSuccessfully': 'Đã xóa thành công!',
        'updatedSuccessfully': 'Đã cập nhật thành công!',
        'addedSuccessfully': 'Đã thêm thành công!',
        'languageChanged': 'Ngôn ngữ đã được đổi sang Tiếng Việt',
        'dateFormatChanged': 'Định dạng ngày đã được thay đổi',
    },

    en: {
        // Common
        'welcome': 'Welcome',
        'logout': 'Logout',
        'save': 'Save',
        'cancel': 'Cancel',
        'edit': 'Edit',
        'delete': 'Delete',
        'add': 'Add',
        'search': 'Search',
        'filter': 'Filter',
        'actions': 'Actions',
        'status': 'Status',
        'details': 'Details',
        'close': 'Close',
        'confirm': 'Confirm',
        'loading': 'Loading...',

        // Navigation
        'dashboard': 'Dashboard',
        'employees': 'Employees',
        'departments': 'Departments',
        'leaveApplications': 'Leave Applications',
        'contracts': 'Contracts',
        'settings': 'Settings',

        // Dashboard
        'totalEmployees': 'Total Employees',
        'activeEmployees': 'Active',
        'onLeave': 'On Leave',
        'newHires': 'New Hires',
        'pendingRequests': 'Pending Requests',
        'upcomingBirthdays': 'Upcoming Birthdays',
        'recentActivities': 'Recent Activities',
        'quickActions': 'Quick Actions',
        'addEmployee': 'Add Employee',
        'createDepartment': 'Create Department',
        'viewReports': 'View Reports',

        // Employees
        'employeeList': 'Employee List',
        'addNewEmployee': 'Add New Employee',
        'allEmployees': 'All',
        'active': 'Active',
        'inactive': 'Inactive',
        'onProbation': 'On Probation',
        'searchEmployees': 'Search employees...',
        'allDepartments': 'All Departments',
        'name': 'Name',
        'position': 'Position',
        'department': 'Department',
        'email': 'Email',
        'phone': 'Phone',
        'startDate': 'Start Date',
        'salary': 'Salary',
        'employeeDetails': 'Employee Details',
        'personalInfo': 'Personal Information',
        'workInfo': 'Work Information',
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'dateOfBirth': 'Date of Birth',
        'gender': 'Gender',
        'male': 'Male',
        'female': 'Female',
        'other': 'Other',
        'preferNot': 'Prefer not to say',
        'address': 'Address',
        'city': 'City',
        'state': 'State',
        'zipCode': 'ZIP Code',
        'country': 'Country',
        'employeeId': 'Employee ID',
        'jobTitle': 'Job Title',
        'employmentType': 'Employment Type',
        'fullTime': 'Full-time',
        'partTime': 'Part-time',
        'contract': 'Contract',
        'intern': 'Intern',
        'reportsTo': 'Reports To',
        'payFrequency': 'Pay Frequency',
        'monthly': 'Monthly',
        'biWeekly': 'Bi-weekly',
        'weekly': 'Weekly',
        'annually': 'Annually',
        'performanceScore': 'Performance Score',

        // Departments
        'departmentList': 'Department List',
        'createNewDepartment': 'Create New Department',
        'allDepartments': 'All Departments',
        'departmentName': 'Department Name',
        'manager': 'Manager',
        'employeeCount': 'Employees',
        'budget': 'Budget',
        'departmentDetails': 'Department Details',
        'description': 'Description',
        'location': 'Location',
        'updateDepartment': 'Update Department',
        'deleteDepartment': 'Delete Department',

        // Leave Applications
        'leaveApplications': 'Leave Applications',
        'newRequest': 'New Request',
        'pending': 'Pending',
        'approved': 'Approved',
        'rejected': 'Rejected',
        'allRequests': 'All Requests',
        'searchRequests': 'Search requests...',
        'allTypes': 'All Types',
        'vacation': 'Vacation',
        'sick': 'Sick Leave',
        'personal': 'Personal',
        'maternity': 'Maternity',
        'paternity': 'Paternity',
        'unpaid': 'Unpaid',
        'employee': 'Employee',
        'type': 'Type',
        'duration': 'Duration',
        'reason': 'Reason',
        'leaveType': 'Leave Type',
        'fromDate': 'From Date',
        'toDate': 'To Date',
        'days': 'Days',
        'totalRequests': 'Total Requests',
        'approve': 'Approve',
        'reject': 'Reject',
        'leaveDetails': 'Leave Details',
        'appliedOn': 'Applied On',
        'reviewedBy': 'Reviewed By',

        // Contracts
        'contracts': 'Contracts',
        'newContract': 'New Contract',
        'totalContracts': 'Total Contracts',
        'expiring': 'Expiring Soon',
        'expired': 'Expired',
        'allContracts': 'All Contracts',
        'expiringSoon': 'Expiring Soon',
        'searchContracts': 'Search contracts...',
        'permanent': 'Permanent',
        'fixedTerm': 'Fixed-Term',
        'freelance': 'Freelance',
        'internship': 'Internship',
        'contractType': 'Contract Type',
        'contractDetails': 'Contract Details',
        'contractNumber': 'Contract Number',
        'signedDate': 'Signed Date',
        'expiryDate': 'Expiry Date',

        // Settings
        'settings': 'Settings',
        'profile': 'Profile',
        'company': 'Company',
        'security': 'Security',
        'preferences': 'Preferences',
        'language': 'Language',
        'timezone': 'Timezone',
        'dateFormat': 'Date Format',
        'profileSettings': 'Profile Settings',
        'updateProfile': 'Update Profile',
        'companyInformation': 'Company Information',
        'companyName': 'Company Name',
        'industry': 'Industry',
        'companySize': 'Company Size',
        'website': 'Website',
        'changePassword': 'Change Password',
        'currentPassword': 'Current Password',
        'newPassword': 'New Password',
        'confirmPassword': 'Confirm Password',
        'uploadPhoto': 'Upload Photo',
        'removePhoto': 'Remove Photo',
        'saveChanges': 'Save Changes',

        // Messages
        'successMessage': 'Success!',
        'errorMessage': 'An error occurred!',
        'confirmDelete': 'Are you sure you want to delete?',
        'noDataAvailable': 'No data available',
        'loadingData': 'Loading data...',
        'savedSuccessfully': 'Saved successfully!',
        'deletedSuccessfully': 'Deleted successfully!',
        'updatedSuccessfully': 'Updated successfully!',
        'addedSuccessfully': 'Added successfully!',
        'languageChanged': 'Language changed to English',
        'dateFormatChanged': 'Date format has been changed',
    }
};

// Get current language from localStorage or default to Vietnamese
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'vi';
}

// Translate a key
function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang][key] || translations['vi'][key] || key;
}

// Translate all elements with data-i18n attribute
function translatePage() {
    const lang = getCurrentLanguage();
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[lang][key] || translations['vi'][key] || key;

        // Handle different element types
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.hasAttribute('placeholder')) {
                element.placeholder = translation;
            } else {
                element.value = translation;
            }
        } else {
            element.textContent = translation;
        }
    });

    // Re-initialize lucide icons after text changes
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Initialize translation on page load
document.addEventListener('DOMContentLoaded', function() {
    translatePage();
});
