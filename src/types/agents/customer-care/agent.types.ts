// ==================== ENUMS ====================

export enum ResponseStyle {
    CONCISE_DIRECT = 'CONCISE_DIRECT',
    DETAILED_COMPREHENSIVE = 'DETAILED_COMPREHENSIVE',
    STEP_BY_STEP = 'STEP_BY_STEP',
    CONVERSATIONAL = 'CONVERSATIONAL',
    STRUCTURED = 'STRUCTURED'
}

export enum ToneVoice {
    PROFESSIONAL = 'PROFESSIONAL',
    FRIENDLY = 'FRIENDLY',
    CASUAL = 'CASUAL',
    EMPATHETIC = 'EMPATHETIC',
    DIRECT = 'DIRECT',
    ENTHUSIASTIC = 'ENTHUSIASTIC',
    CALM = 'CALM',
    PEDAGOGICAL = 'PEDAGOGICAL'
}

// ==================== ENUM LABELS (FRENCH) ====================

export const ResponseStyleLabels: Record<ResponseStyle, string> = {
    [ResponseStyle.CONCISE_DIRECT]: 'Concis et Direct',
    [ResponseStyle.DETAILED_COMPREHENSIVE]: 'Détaillé et Complet',
    [ResponseStyle.STEP_BY_STEP]: 'Étape par Étape',
    [ResponseStyle.CONVERSATIONAL]: 'Conversationnel',
    [ResponseStyle.STRUCTURED]: 'Structuré'
};

export const ToneVoiceLabels: Record<ToneVoice, string> = {
    [ToneVoice.PROFESSIONAL]: 'Professionnel',
    [ToneVoice.FRIENDLY]: 'Amical',
    [ToneVoice.CASUAL]: 'Décontracté',
    [ToneVoice.EMPATHETIC]: 'Empathique',
    [ToneVoice.DIRECT]: 'Direct',
    [ToneVoice.ENTHUSIASTIC]: 'Enthousiaste',
    [ToneVoice.CALM]: 'Calme',
    [ToneVoice.PEDAGOGICAL]: 'Pédagogue'
};

export const ToneVoiceDescriptions: Record<ToneVoice, string> = {
    [ToneVoice.PROFESSIONAL]: 'Formel et corporatif',
    [ToneVoice.FRIENDLY]: 'Chaleureux et accessible',
    [ToneVoice.CASUAL]: 'Informel et convivial',
    [ToneVoice.EMPATHETIC]: 'Compréhensif et bienveillant',
    [ToneVoice.DIRECT]: 'Concis et efficace',
    [ToneVoice.ENTHUSIASTIC]: 'Dynamique et motivant',
    [ToneVoice.CALM]: 'Posé et rassurant',
    [ToneVoice.PEDAGOGICAL]: 'Explicatif et détaillé'
};

// ==================== ENUM OPTIONS (FOR SELECT/DROPDOWN) ====================

export interface SelectOption<T = string> {
    value: T;
    label: string;
    description?: string;
    disabled?: boolean;
}

export const ResponseStyleOptions: SelectOption<ResponseStyle>[] = [
    {
        value: ResponseStyle.CONCISE_DIRECT,
        label: ResponseStyleLabels[ResponseStyle.CONCISE_DIRECT],
        description: 'Réponses courtes et directes'
    },
    {
        value: ResponseStyle.DETAILED_COMPREHENSIVE,
        label: ResponseStyleLabels[ResponseStyle.DETAILED_COMPREHENSIVE],
        description: 'Réponses complètes et détaillées'
    },
    {
        value: ResponseStyle.STEP_BY_STEP,
        label: ResponseStyleLabels[ResponseStyle.STEP_BY_STEP],
        description: 'Instructions progressives et guidées'
    },
    {
        value: ResponseStyle.CONVERSATIONAL,
        label: ResponseStyleLabels[ResponseStyle.CONVERSATIONAL],
        description: 'Style dialogué et naturel'
    },
    {
        value: ResponseStyle.STRUCTURED,
        label: ResponseStyleLabels[ResponseStyle.STRUCTURED],
        description: 'Réponses organisées avec sections claires'
    }
];

export const ToneVoiceOptions: SelectOption<ToneVoice>[] = [
    {
        value: ToneVoice.PROFESSIONAL,
        label: ToneVoiceLabels[ToneVoice.PROFESSIONAL],
        description: ToneVoiceDescriptions[ToneVoice.PROFESSIONAL]
    },
    {
        value: ToneVoice.FRIENDLY,
        label: ToneVoiceLabels[ToneVoice.FRIENDLY],
        description: ToneVoiceDescriptions[ToneVoice.FRIENDLY]
    },
    {
        value: ToneVoice.CASUAL,
        label: ToneVoiceLabels[ToneVoice.CASUAL],
        description: ToneVoiceDescriptions[ToneVoice.CASUAL]
    },
    {
        value: ToneVoice.EMPATHETIC,
        label: ToneVoiceLabels[ToneVoice.EMPATHETIC],
        description: ToneVoiceDescriptions[ToneVoice.EMPATHETIC]
    },
    {
        value: ToneVoice.DIRECT,
        label: ToneVoiceLabels[ToneVoice.DIRECT],
        description: ToneVoiceDescriptions[ToneVoice.DIRECT]
    },
    {
        value: ToneVoice.ENTHUSIASTIC,
        label: ToneVoiceLabels[ToneVoice.ENTHUSIASTIC],
        description: ToneVoiceDescriptions[ToneVoice.ENTHUSIASTIC]
    },
    {
        value: ToneVoice.CALM,
        label: ToneVoiceLabels[ToneVoice.CALM],
        description: ToneVoiceDescriptions[ToneVoice.CALM]
    },
    {
        value: ToneVoice.PEDAGOGICAL,
        label: ToneVoiceLabels[ToneVoice.PEDAGOGICAL],
        description: ToneVoiceDescriptions[ToneVoice.PEDAGOGICAL]
    }
];

// ==================== AGENT LANGUAGE ====================

export interface LanguageResponse {
    languageName: string;
    languageIsoCode: string;
    isDefault: boolean;
    active: boolean;
}

export interface LanguageRequest {
    languageIsoCode: string;
    active: boolean;
}

export interface LanguageConfigResponse {
    agentUid: string;
    autoLanguageDetection: boolean;
    languages: LanguageResponse[];
    totalLanguages: number;
    defaultLanguage: string;
}

export interface UpdateLanguageConfigRequest {
    autoLanguageDetection: boolean;
    defaultLanguageIsoCode?: string;
    languages?: LanguageRequest[];
}

// ========== BLOCKED KEYWORDS Types ==========

export interface BlockedKeywordsResponse {
    agentUid: string;
    blockedKeywords: string[];
    totalKeywords: number;
}

export interface UpdateBlockedKeywordsRequest {
    blockedKeywords?: string[] | null;
}

// ========== TONE & STYLE Types ==========

export interface ToneStyleResponse {
    agentUid: string;
    toneVoice: ToneVoice;
    responseStyle: ResponseStyle;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateToneStyleRequest {
    toneVoice: ToneVoice;
    responseStyle: ResponseStyle;
}