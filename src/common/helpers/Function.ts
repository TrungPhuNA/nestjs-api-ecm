export function toSlug(str: string, character?: string) {
    character = character ? character : '-';
    // Chuyển hết sang chữ thường
    let strSlug = str.toLowerCase();

    // xóa dấu
    strSlug = strSlug
        .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
        .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

    // Thay ký tự đĐ
    strSlug = strSlug.replace(/[đĐ]/g, 'd');

    // Xóa ký tự đặc biệt
    strSlug = strSlug.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự character
    strSlug = strSlug.replace(/(\s+)/g, character);

    // Xóa ký tự character liên tiếp
    strSlug = strSlug.replace(/-+/g, character);

    // xóa phần dư character ở đầu & cuối
    strSlug = strSlug.replace(/^-+|-+$/g, '');
    strSlug = strSlug.replace(/^_+|_+$/g, '');

    // return
    return strSlug;
}
