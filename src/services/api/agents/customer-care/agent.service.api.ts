import axiosInstance from '@/config/axios';
import { CUSTOMER_CARE_AGENT_API_SERVICES } from '@/services/config/agents/customer-care/agent-api-service.config';
import {
    ToneStyleResponse,
    UpdateToneStyleRequest,
    BlockedKeywordsResponse,
    UpdateBlockedKeywordsRequest,
    LanguageConfigResponse,
    UpdateLanguageConfigRequest, 
} from '@/types/agents/customer-care/agent.types';

export const agentServiceApi = {

  getToneStyle: async (agentUid: string): Promise<ToneStyleResponse> => {
    const response = await axiosInstance.get(
      CUSTOMER_CARE_AGENT_API_SERVICES.AGENTS.GET_TONE_STYLE(agentUid)
    );
    return response.data;
  },

  updateToneStyle: async (
    agentUid: string,
    data: UpdateToneStyleRequest
  ): Promise<ToneStyleResponse> => {
    const response = await axiosInstance.put(
      CUSTOMER_CARE_AGENT_API_SERVICES.AGENTS.UPDATE_TONE_STYLE(agentUid),
      data
    );
    return response.data;
  },

  getBlockedKeywords: async (agentUid: string): Promise<BlockedKeywordsResponse> => {
    const response = await axiosInstance.get(
      CUSTOMER_CARE_AGENT_API_SERVICES.AGENTS.GET_BLOCKED_KEYWORDS(agentUid)
    );
    return response.data;
  },

  updateBlockedKeywords: async (
    agentUid: string,
    data: UpdateBlockedKeywordsRequest
  ): Promise<BlockedKeywordsResponse> => {
    const response = await axiosInstance.put(
      CUSTOMER_CARE_AGENT_API_SERVICES.AGENTS.UPDATE_BLOCKED_KEYWORDS(agentUid),
      data
    );
    return response.data;
  },

  getLanguageConfig: async (agentUid: string): Promise<LanguageConfigResponse> => {
    const response = await axiosInstance.get(
      CUSTOMER_CARE_AGENT_API_SERVICES.AGENTS.GET_LANGUAGE_CONFIG(agentUid)
    );
    return response.data;
  },

  updateLanguageConfig: async (
    agentUid: string,
    data: UpdateLanguageConfigRequest
  ): Promise<LanguageConfigResponse> => {
    const response = await axiosInstance.put(
      CUSTOMER_CARE_AGENT_API_SERVICES.AGENTS.UPDATE_LANGUAGE_CONFIG(agentUid),
      data
    );
    return response.data;
  },
};

export default agentServiceApi;