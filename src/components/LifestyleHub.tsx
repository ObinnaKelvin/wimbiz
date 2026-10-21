import React from 'react';
import { ScreenId } from '../types';
import { WomensHealthHub } from './WomensHealthHub';

interface LifestyleHubProps {
  onOpenArticle: (articleId: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const LifestyleHub: React.FC<LifestyleHubProps> = ({
  onOpenArticle,
  onNavigate,
}) => {
  return (
    <WomensHealthHub
      initialTab="lifestyle"
      onOpenArticle={onOpenArticle}
      onNavigate={onNavigate}
    />
  );
};
