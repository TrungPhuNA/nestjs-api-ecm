export class Paging {
    private readonly page: number
    private readonly page_size: number
    private readonly total_page: number
    private readonly total: number

    constructor(page: number, page_size: number, total: number) {
        this.page = page
        this.page_size = page_size
        this.total = total
        this.total_page = Math.ceil(total % page_size === 0 ? total / page_size + 1 : total / page_size)
    }
}
