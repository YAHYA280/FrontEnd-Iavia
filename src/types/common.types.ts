

  // ========== Base Entity ==========
  
  /**
   * Entity de base avec les champs communs à toutes les entités
   */
  export interface BaseEntity {
    id?: number;
    uid?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  // ========== Pagination ==========
  
  export interface SortObject {
    direction: string;
    nullHandling: string;
    ascending: boolean;
    property: string;
    ignoreCase: boolean;
  }
  
  export interface PageableObject {
    offset: number;
    sort: SortObject[];
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  }
  
  /**
   * Type générique pour les réponses paginées
   */
  export interface PageResponse<T> {
    totalElements: number;
    totalPages: number;
    size: number;
    content: T[];
    number: number;
    sort: SortObject[];
    first: boolean;
    last: boolean;
    pageable: PageableObject;
    numberOfElements: number;
    empty: boolean;
  }
  export interface TokenPayload {
    exp: number;
    iat: number;
    name: string;
    email: string;
    realm_access: {
      roles: string[];
    };
    isValid?: boolean;
    sub: string;
  }
  