import axiosInstance from '@/config/axios';
import { API_SERVICES } from '../config/api-services.config';
import { BackendFaqItem, FAQ } from '@/shared/types/faq';

export const faqServiceApi = {
  
  getAll: async (agentUid: string, searchKeyword: string = '', currentPage: number, pageSize: number,category:string): Promise<FAQ[]> => {
    const response = await axiosInstance.get(API_SERVICES.FAQ.LIST, {
      params: {
        search: searchKeyword,
        page: currentPage-1,
        size: 10,
        agentUid,
        category
      },
    });

    const data = response.data;
    
    const result: FAQ[] = [];

    Object.keys(data).forEach((categoryKey) => {
      const faqList = data[categoryKey] || [];
      faqList.forEach((faq: any) => {
        result.push({
          id: faq.uid,
          question: faq.question,
          answer: faq.response,
          category: faq.categoryName || categoryKey,
        });
      });
    });

    return result;
  },

  create: async (faq: { question: string; response: string; agentUid?: string; faqCategoryUid?: string }) => {
    const response = await axiosInstance.post(API_SERVICES.FAQ.CREATE, {
      question: faq.question,
      response: faq.response,
      ...(faq.agentUid ? { agentUid: faq.agentUid } : {}),
      ...(faq.faqCategoryUid !== undefined ? { faqCategoryUid: faq.faqCategoryUid } : {}),
    });

    return response.data;
  },

  update: async (
    faqUid: string,
    faq: { question: string; response: string; categoryName: string }
  ) => {
    const response = await axiosInstance.put(API_SERVICES.FAQ.UPDATE(faqUid), faq);
    return response.data;
  },


  delete: async (faqUid: string) => {
    const response = await axiosInstance.delete(API_SERVICES.FAQ.DELETE(faqUid));
    return response.data;
  },


getStatistics: async (agentUid: string): Promise<{ totalFaqs: number; lastUpdated: string }> => {
    const response = await axiosInstance.get(API_SERVICES.FAQ.FAQ_STATISTIC(agentUid));
    
    return {
      totalFaqs: response.data.totalFaqs || 0,
      lastUpdated: response.data.lastUpdated || '',
    };
  },

};


export default faqServiceApi;