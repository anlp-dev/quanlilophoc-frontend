export const STATUS = {
    INACTIVE: {code: '00', name: 'Không hoạt động', color: 'red'},
    ACTIVE: {code: '01', name: 'Hoạt động', color: 'green'},
    DELETED: {code: '02', name: 'Đã xóa', color: 'red'},
    UNKNOWN: {code: '??', name: 'Không xác định', color: 'grey'},
};

export const STATUS_OPTIONS = [
    {code: '00', name: 'Không hoạt động', color: 'red'},
    {code: '01', name: 'Hoạt động', color: 'green'},
    // { value: '02', label: 'Đã xóa', color: 'red' },
];

export const ROLE_OPTIONS = [
    {value: 'teacher', label: 'Giáo viên'},
    {value: 'admin', label: 'Admin'},
    {value: 'student', label: 'Học sinh'},
    {value: 'quanlihethong', label: 'Quản lí hệ thống'},
    {value: 'trogiang', label: 'Trợ giảng'},
];
