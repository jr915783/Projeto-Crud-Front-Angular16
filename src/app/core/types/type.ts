
export interface PessoaUsuaria {
    userName: string;
    password: string;
    email: string;  
}

export class Heroi {
    id!: number;
    name!: string;
    description!: string;     
    userId!:  number;
    category!: Category;    
}                                       

export class Category {
  id!: number;
  name!: string;
  descripstion!: string;
  userId!:  number     
}

export class Pagination {
    currentPage!: number;
    itemsPerPage!: number;
    totalItems!: number;
    totalPages!: number;
  }
  
  export class PaginatedResult<T> {
    result: T | undefined; ;
    pagination!: Pagination;
  }

  

