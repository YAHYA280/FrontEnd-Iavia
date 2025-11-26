import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { AgentProfileCardMini } from '@/shared/components';
import { FontAwesomeIcon } from '@/shared/components/fontawesome';
import ConditionalComponent from '@/shared/components/conditionalComponent';

import { NewChatInterface } from './components/NewChatInterface';
import { ChatHistory } from './components/ChatHistory';
import { IntegrationSection } from './components/integrations-section';
import { LegalAgentConfiguration } from './components/AgentConfiguration';
import { useChat } from '@/hooks/use-chat';
import { styles } from './view.styles';


export const LegalAgentView: React.FC = () => {
    const theme = useTheme();
    const [isAgentActive, setIsAgentActive] = useState(true);
    const [selectedOption, setSelectedOption] = useState<string>('nouveau-chat');
    const [searchQuery, setSearchQuery] = useState('');

    const {
        chats,
        currentChat,
        messages,
        startNewChat,
        sendMessage,
        loadChat,
        renameChat,
        deleteChat,
    } = useChat();

    const menuOptions = [
        { id: 'integrations', label: 'Intégrations', icon: 'link' },
        { id: 'configuration', label: 'Configuration', icon: 'cog' },
    ];

    const filteredChatHistory = chats
        .map(chat => ({
            id: chat.id,
            title: chat.title,
        }))
        .filter(chat =>
            chat.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const handleMenuClick = (optionId: string) => {
        setSelectedOption(optionId);
    };

    const handleNewChat = () => {
        startNewChat();
        setSelectedOption('nouveau-chat');
    };

    const handleHistoryItemClick = (itemId: string) => {
        loadChat(itemId);
        setSelectedOption('nouveau-chat');
    };

    const handleChatRename = (chatId: string, newTitle: string) => {
        renameChat(chatId, newTitle);
    };

    const handleChatDelete = (chatId: string) => {
        deleteChat(chatId);
    };

    const handleSendMessage = (content: string, files?: File[]) => {
        sendMessage(content, files);
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
                                    agentName="Aqal"
                                    agentTitle="Agent juridique"
                                    avatar={"/avatars/ziri-avatar.png"}
                                    backgroundColor="#5d2eff"
                                    titleColor="#5d2eff"
                                    isActive={isAgentActive}
                                    onToggleActive={setIsAgentActive}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box
                                    component="button"
                                    onClick={handleNewChat}
                                    sx={styles.newChatButton}
                                >
                                    <FontAwesomeIcon
                                        icon="square-plus"
                                        style={{ fontSize: '18px', color: '#5D2EFF', flexShrink: 0 }}
                                    />
                                    <Typography sx={styles.newChatText}>
                                        Nouveau Chat
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={styles.sidebarMenu}>
                                {menuOptions.map((option) => {
                                    const isActive = selectedOption === option.id;
                                    return (
                                        <Box
                                            key={option.id}
                                            component="button"
                                            onClick={() => handleMenuClick(option.id)}
                                            sx={styles.menuButton(theme, isActive)}
                                        >
                                            <FontAwesomeIcon
                                                icon={option.icon as any}
                                                style={{ fontSize: '18px', flexShrink: 0 }}
                                            />
                                            <Typography sx={styles.menuButtonLabel(theme, isActive)}>
                                                {option.label}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box sx={styles.searchContainer}>
                                    <FontAwesomeIcon
                                        icon="search"
                                        style={{ fontSize: '18px', color: '#5D2EFF', flexShrink: 0 }}
                                    />
                                    <Box
                                        component="input"
                                        type="text"
                                        placeholder="Rechercher..."
                                        value={searchQuery}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                        sx={styles.searchInput}
                                    />
                                </Box>
                            </Box>
                            <ChatHistory
                                chats={filteredChatHistory}
                                selectedChatId={currentChat?.id}
                                onChatSelect={handleHistoryItemClick}
                                onChatRename={handleChatRename}
                                onChatDelete={handleChatDelete}
                            />
                        </Box>

                        <Box sx={styles.main}>
                            <Box sx={styles.scrollArea}>
                                <ConditionalComponent isValid={selectedOption === 'nouveau-chat'}>
                                    <NewChatInterface
                                        messages={messages}
                                        onSendMessage={handleSendMessage}

                                    />

                                </ConditionalComponent>

                                <ConditionalComponent isValid={selectedOption === 'integrations'}>
                                    <Box>
                                        <IntegrationSection />
                                    </Box>
                                </ConditionalComponent>

                                <ConditionalComponent isValid={selectedOption === 'configuration'}>
                                    <Box>
                                        <LegalAgentConfiguration />
                                    </Box>
                                </ConditionalComponent>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LegalAgentView;
