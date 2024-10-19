export interface DataTableFilteredDto<T> {
  draw?: number;            
  recordsTotal: number;     
  recordsFiltered: number;  
  aaData: T[];             
}
