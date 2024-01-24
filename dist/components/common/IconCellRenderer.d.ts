export declare class IconCellRenderer {
    eGui: any;
    params: any;
    init(params: any): void;
    getGui(): any;
    destroy(): void;
    btnClickedHandler(event: any): void;
    refresh(params: any): boolean;
}
export declare const buildIconColDef: (icon: any, onClick: any) => {
    hide: boolean;
    headerName: string;
    minWidth: number;
    maxWidth: number;
    flex: number;
    cellStyle: {
        padding: string;
    };
    cellRenderer: string;
    cellRendererParams: {
        onClick: any;
        path: any;
    };
};
