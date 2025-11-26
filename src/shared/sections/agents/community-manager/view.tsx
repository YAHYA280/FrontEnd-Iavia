import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    useTheme,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import { AgentProfileCardMini } from '@/shared/components';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import { SectionHeader } from './components/ui';
import { IntegrationSection } from './components/features/integrations';
import { IdeasSection } from './components/features/ideas';
import { ConfigurationSection } from './components/features/configuration';
import { menuOptions } from '@/shared/_mock/community-manager-config';
import ConditionalComponent from '@/shared/components/conditionalComponent';
import { styles } from './view.styles';
import { CalendarSection } from './components/features/calendar';
import { GallerySection } from './components/features/gallery/gallery-section';
import { useIdeasStore, useAgentStore } from '@/shared/api';
import { StatisticsSection } from './components/features/statistics/statistics-section';


interface SectionContent {
    title: string;
    subtitle: string;
}

const getSectionContent = (optionId: string): SectionContent => {
    const contentMap: Record<string, SectionContent> = {
        integrations: {
            title: "Intégrations d'agent",
            subtitle: 'Connectez des outils externes et des canaux de communication pour cet agent.',
        },
        configuration: {
            title: 'Configuration',
            subtitle: 'Configurez les paramètres et les préférences de votre agent.',
        },
        idees: {
            title: 'Idées',
            subtitle: 'Gérez et organisez vos idées et suggestions pour la communauté.',
        },
        calendar: {
            title: 'Calendrier',
            subtitle: 'Planifiez et gérez votre contenu',
        },
        galerie: {
            title: 'Galerie',
            subtitle: 'Parcourez et gérez votre bibliothèque de médias.',
        },
        statistiques: {
            title: 'Statistiques',
            subtitle: 'Analysez les performances et les métriques de votre communauté.',
        },
    };

    return contentMap[optionId] || { title: '', subtitle: '' };
};

const MOCK_AGENT_UID = '6b15cae1-0d41-4756-9593-a5a9906f4e09';

export const CommunityManagerView: React.FC = () => {
    const theme = useTheme();
    const [selectedOption, setSelectedOption] = useState<string>('integrations');
    const calendarCreatePostRef = useRef<(() => void) | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const { generateIdeas } = useIdeasStore();
    const { agent, toggleAgentStatus, fetchByUid, error: agentError } = useAgentStore();
    const sectionContent = getSectionContent(selectedOption);

    // Fetch agent data on mount
    useEffect(() => {
        fetchByUid(MOCK_AGENT_UID);
    }, [fetchByUid]);

    // Handle agent errors
    useEffect(() => {
        if (agentError) {
            setSnackbarMessage(agentError);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    }, [agentError]);

    const handleGenerateIdeas = () => {
        return;
    };

    const handleCreatePost = () => {
        calendarCreatePostRef.current?.();
    };

    const handleToggleAgent = async (newStatus: boolean) => {
        try {
            await toggleAgentStatus(MOCK_AGENT_UID);
            setSnackbarMessage(newStatus ? 'Agent activé avec succès' : 'Agent désactivé avec succès');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error: any) {
            setSnackbarMessage(error.response?.data?.message || 'Erreur lors du changement de statut');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={styles.root}>
            <Box sx={styles.outer}>
                <Box sx={styles.frame}>
                    <Box sx={styles.frameOverlay} />

                    <Box sx={styles.contentRow}>
                        <Box sx={styles.sidebar}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '0' }}>
                                <AgentProfileCardMini
                                    agentName="Ziri"
                                    agentTitle="Community Manager"
                                    avatar={"/avatars/ziri-avatar.png"}
                                    backgroundColor="#069eff"
                                    titleColor="#069eff"
                                    isActive={agent?.active ?? true}
                                    onToggleActive={handleToggleAgent}
                                />
                            </Box>
                            <Box sx={styles.sidebarMenu}>
                                {menuOptions.map((option) => {
                                    const isActive = selectedOption === option.id;
                                    return (
                                        <Box
                                            key={option.id}
                                            component="button"
                                            onClick={() => setSelectedOption(option.id)}
                                            sx={styles.menuButton(theme, isActive)}
                                        >
                                            <FontAwesomeIcon icon={option.icon as any} style={{ fontSize: '18px', flexShrink: 0 }} />
                                            <Typography
                                                sx={styles.menuButtonLabel(theme, isActive)}
                                            >
                                                {option.label}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                        <Box sx={styles.main}>
                            <Box sx={styles.scrollArea}>
                                <ConditionalComponent isValid={selectedOption === 'integrations'}>
                                    <IntegrationSection />
                                </ConditionalComponent>

                                <ConditionalComponent isValid={selectedOption === 'idees'}>
                                    <Box sx={styles.ideasHeaderRow}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                variant="h5"
                                                sx={styles.ideasTitle(theme)}
                                            >
                                                {sectionContent.title}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={styles.ideasSubtitle(theme)}
                                            >
                                                {sectionContent.subtitle}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ flexShrink: 0 }}>
                                            <Button
                                                onClick={handleGenerateIdeas}
                                                variant="contained"
                                                disabled={isGenerating}
                                                startIcon={
                                                    isGenerating ? (
                                                        <CircularProgress size={20} sx={{ color: '#FFF' }} />
                                                    ) : (
                                                        <FontAwesomeIcon
                                                            icon="wand-magic-sparkles"
                                                            style={{ fontSize: '20px', color: '#FFF' }}
                                                        />
                                                    )
                                                }
                                                sx={styles.genIdeasBtn(theme)}
                                            >
                                                <ConditionalComponent isValid={isGenerating}>
                                                    Génération...
                                                </ConditionalComponent>
                                                <ConditionalComponent isValid={!isGenerating}>
                                                    Générer des idées
                                                </ConditionalComponent>
                                            </Button>
                                        </Box>
                                    </Box>
                                    <IdeasSection agentUid={MOCK_AGENT_UID} />
                                </ConditionalComponent>

                                <ConditionalComponent isValid={selectedOption === 'configuration'}>
                                    <SectionHeader title={sectionContent.title} subtitle={sectionContent.subtitle} />
                                    <ConfigurationSection />
                                </ConditionalComponent>

                                <ConditionalComponent isValid={selectedOption === 'calendar'}>
                                    <Box sx={styles.ideasHeaderRow}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                variant="h5"
                                                sx={styles.ideasTitle(theme)}
                                            >
                                                {sectionContent.title}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={styles.ideasSubtitle(theme)}
                                            >
                                                {sectionContent.subtitle}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ flexShrink: 0 }}>
                                            <Button
                                                onClick={handleCreatePost}
                                                variant="contained"
                                                startIcon={
                                                    <FontAwesomeIcon
                                                        icon="plus"
                                                        style={{ fontSize: '20px', color: '#FFF' }}
                                                    />
                                                }
                                                sx={styles.genIdeasBtn(theme)}
                                            >
                                                Créer un post
                                            </Button>
                                        </Box>
                                    </Box>
                                    <CalendarSection onCreatePostRef={calendarCreatePostRef} />
                                </ConditionalComponent>

                                <ConditionalComponent isValid={selectedOption === 'galerie'}>
                                    <SectionHeader title={sectionContent.title} subtitle={sectionContent.subtitle} />
                                    <GallerySection />
                                </ConditionalComponent>

                                <ConditionalComponent isValid={selectedOption === 'statistiques'}>
                                    <SectionHeader title={sectionContent.title} subtitle={sectionContent.subtitle} />
                                    <StatisticsSection />
                                </ConditionalComponent>

                                <ConditionalComponent isValid={selectedOption !== 'integrations' && selectedOption !== 'idees' && selectedOption !== 'configuration' && selectedOption !== 'calendar' && selectedOption !== 'galerie' && selectedOption !== 'statistiques'}>
                                    <SectionHeader title={sectionContent.title} subtitle={sectionContent.subtitle} />
                                </ConditionalComponent>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CommunityManagerView;
