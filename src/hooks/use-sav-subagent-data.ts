import { useMemo } from 'react';
import { savSubagentsConfig, commonData } from '@/shared/_mock/sav-subagents-config';

export const useSavSubagentData = (subagentId: string = 'sav-general') => {
  return useMemo(() => {
    const agentData = savSubagentsConfig[subagentId] || savSubagentsConfig['sav-general'];

    const platforms = agentData.platforms.map(platformId => ({
      id: platformId,
      name: commonData.platforms[platformId as keyof typeof commonData.platforms]?.name || platformId,
      logoSrc: commonData.platforms[platformId as keyof typeof commonData.platforms]?.logoSrc || '',
      isConnected: true,
    }));

    const languages = agentData.languages.map(langId => ({
      id: langId,
      name: commonData.languages[langId as keyof typeof commonData.languages]?.name || langId,
      enabled: true,
    }));

    // Stabiliser les références des tableaux pour éviter les re-renders inutiles
    const instructions = agentData.instructions || [];
    const standardInstructions = agentData.standardInstructions || [];

    return {
      ...agentData,
      platforms,
      languages,
      instructions,
      standardInstructions,
      toneOptions: commonData.toneOptions,
      styleOptions: commonData.styleOptions,
      priorityOptions: commonData.priorityOptions,
      channelOptions: commonData.channelOptions,
    };
  }, [subagentId]);
};
