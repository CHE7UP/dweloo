// types/tawk-messenger-react.d.ts
declare module '@tawk.to/tawk-messenger-react' {
    import { ComponentType, MutableRefObject } from 'react';
  
    interface AgentData {
      name: string;
      position?: string;
      image?: string;
      id: string;
    }
  
    interface ChatMessageData {
      text: string;
      timestamp: number;
      [key: string]: unknown;
    }
  
    interface FormData {
      [key: string]: string | number | boolean | null;
    }
  
    // Reference type for the component's methods
    export interface TawkMessengerRef {
      maximize: () => void;
      minimize: () => void;
      toggle: () => void;
      popup: () => void;
      showWidget: () => void;
      hideWidget: () => void;
      toggleVisibility: () => void;
      endChat: () => void;
      setAttributes: (attributes: Record<string, unknown>, callback?: (error: Error | null) => void) => void;
      addEvent: (eventName: string, metadata?: Record<string, unknown>, callback?: (error: Error | null) => void) => void;
      addTags: (tags: string[], callback?: (error: Error | null) => void) => void;
      removeTags: (tags: string[], callback?: (error: Error | null) => void) => void;
    }
  
    interface TawkMessengerReactProps {
      propertyId: string;
      widgetId: string;
      customStyle?: {
        zIndex?: number | string;
        visibility?: string;
      };
      onLoad?: () => void;
      onStatusChange?: (status: 'online' | 'away' | 'offline') => void;
      onBeforeLoad?: () => void;
      onChatMaximized?: () => void;
      onChatMinimized?: () => void;
      onChatHidden?: () => void;
      onChatStarted?: () => void;
      onChatEnded?: () => void;
      onPrechatSubmit?: (data: FormData) => void;
      onOfflineSubmit?: (data: FormData) => void;
      onChatMessageVisitor?: (message: ChatMessageData) => void;
      onChatMessageAgent?: (message: ChatMessageData) => void;
      onChatMessageSystem?: (message: ChatMessageData) => void;
      onAgentJoinChat?: (data: AgentData) => void;
      onAgentLeaveChat?: (data: Pick<AgentData, 'name' | 'id'>) => void;
      onChatSatisfaction?: (satisfaction: -1 | 0 | 1) => void;
      onVisitorNameChanged?: (visitorName: string) => void;
      onFileUpload?: (link: string) => void;
      onTagsUpdated?: (tags: string[]) => void;
    }
  
    const TawkMessengerReact: ComponentType<TawkMessengerReactProps> & {
      ref?: MutableRefObject<TawkMessengerRef | null>;
    };
    
    export default TawkMessengerReact;
  }