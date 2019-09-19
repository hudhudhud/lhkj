
/**
 * 分页
 */
export default class Pager<T> {

    /**
     * 作者没写注释!!
     */
    public begin!: number;

    /**
     * 当前页码
     */
    public currentPage!: number;

    /**
     * 分页数据
     */
    public list!: T[];

    /**
     * 页面大小
     */
    public pageSize!: number;

    /**
     * 总条数
     */
    public totalCount!: number;

}
