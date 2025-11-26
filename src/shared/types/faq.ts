export interface BackendFaqItem {
    uid: string;
    question: string;
    response: string;
    active: boolean;
    categoryName: string;
  }
  
  export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
  }
  