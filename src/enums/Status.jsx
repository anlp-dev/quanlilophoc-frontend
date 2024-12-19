export const STATUS = {
    INACTIVE: {code: '00', label: 'Không hoạt động', color: 'red'},
    ACTIVE: {code: '01', label: 'Hoạt động', color: 'green'},
    DELETED: {code: '02', label: 'Đã xóa', color: 'red'},
    UNKNOWN: {code: '??', label: 'Không xác định', color: 'grey'},
};

export const STATUS_OPTIONS = [
    {value: '00', label: 'Không hoạt động', color: 'red'},
    {value: '01', label: 'Hoạt động', color: 'green'},
    // { value: '02', label: 'Đã xóa', color: 'red' },
];

export const ROLE_OPTIONS = [
    {value: 'teacher', label: 'Giáo viên'},
    {value: 'admin', label: 'Admin'},
    {value: 'student', label: 'Học sinh'},
    {value: 'quanlihethong', label: 'Quản lí hệ thống'},
    {value: 'trogiang', label: 'Trợ giảng'},
];
