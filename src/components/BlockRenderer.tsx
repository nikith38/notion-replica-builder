
import React, { useState, useRef, useEffect } from 'react';
import { BaseBlock } from '@/types/blocks';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface BlockRendererProps {
  block: BaseBlock;
  isActive: boolean;
  onUpdate: (content: any) => void;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isActive,
  onUpdate,
  onFocus,
  onKeyDown
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isActive && isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive, isEditing]);

  const handleTextChange = (text: string) => {
    onUpdate({ ...block.content, text });
  };

  const handleClick = () => {
    onFocus();
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const getBackgroundStyle = () => {
    const bg = block.properties?.backgroundColor;
    if (!bg || bg === 'default') return '';
    
    const bgColors: Record<string, string> = {
      gray: 'bg-gray-100',
      brown: 'bg-amber-50',
      orange: 'bg-orange-50',
      yellow: 'bg-yellow-50',
      green: 'bg-green-50',
      blue: 'bg-blue-50',
      purple: 'bg-purple-50',
      pink: 'bg-pink-50',
      red: 'bg-red-50'
    };
    
    return bgColors[bg] || '';
  };

  const getTextStyle = () => {
    const color = block.properties?.textColor;
    if (!color || color === 'default') return '';
    
    const textColors: Record<string, string> = {
      gray: 'text-gray-600',
      brown: 'text-amber-700',
      orange: 'text-orange-600',
      yellow: 'text-yellow-600',
      green: 'text-green-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      pink: 'text-pink-600',
      red: 'text-red-600'
    };
    
    return textColors[color] || '';
  };

  const commonProps = {
    onClick: handleClick,
    onBlur: handleBlur,
    onKeyDown,
    className: `w-full border-none bg-transparent outline-none resize-none ${getTextStyle()}`
  };

  const containerClass = `${getBackgroundStyle()} ${getBackgroundStyle() ? 'p-2 rounded' : ''}`;

  switch (block.type) {
    case 'paragraph':
      return (
        <div className={containerClass}>
          {isEditing ? (
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={block.content?.text || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Type something..."
              {...commonProps}
            />
          ) : (
            <div 
              className={`min-h-[24px] cursor-text ${!block.content?.text ? 'text-notion-text-secondary' : 'text-notion-text'} ${getTextStyle()}`}
              onClick={handleClick}
            >
              {block.content?.text || 'Type something...'}
            </div>
          )}
        </div>
      );

    case 'heading-1':
      return (
        <div className={containerClass}>
          {isEditing ? (
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={block.content?.text || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Heading 1"
              className={`${commonProps.className} text-3xl font-bold`}
              {...commonProps}
            />
          ) : (
            <h1 
              className={`text-3xl font-bold cursor-text ${!block.content?.text ? 'text-notion-text-secondary' : 'text-notion-text'} ${getTextStyle()}`}
              onClick={handleClick}
            >
              {block.content?.text || 'Heading 1'}
            </h1>
          )}
        </div>
      );

    case 'heading-2':
      return (
        <div className={containerClass}>
          {isEditing ? (
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={block.content?.text || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Heading 2"
              className={`${commonProps.className} text-2xl font-semibold`}
              {...commonProps}
            />
          ) : (
            <h2 
              className={`text-2xl font-semibold cursor-text ${!block.content?.text ? 'text-notion-text-secondary' : 'text-notion-text'} ${getTextStyle()}`}
              onClick={handleClick}
            >
              {block.content?.text || 'Heading 2'}
            </h2>
          )}
        </div>
      );

    case 'heading-3':
      return (
        <div className={containerClass}>
          {isEditing ? (
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={block.content?.text || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Heading 3"
              className={`${commonProps.className} text-xl font-medium`}
              {...commonProps}
            />
          ) : (
            <h3 
              className={`text-xl font-medium cursor-text ${!block.content?.text ? 'text-notion-text-secondary' : 'text-notion-text'} ${getTextStyle()}`}
              onClick={handleClick}
            >
              {block.content?.text || 'Heading 3'}
            </h3>
          )}
        </div>
      );

    case 'bulleted-list':
      return (
        <div className={`flex items-start gap-2 ${containerClass}`}>
          <span className="text-notion-text mt-1">•</span>
          {isEditing ? (
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={block.content?.text || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="List item"
              className={`${commonProps.className} flex-1`}
              {...commonProps}
            />
          ) : (
            <div 
              className={`flex-1 cursor-text ${!block.content?.text ? 'text-notion-text-secondary' : 'text-notion-text'} ${getTextStyle()}`}
              onClick={handleClick}
            >
              {block.content?.text || 'List item'}
            </div>
          )}
        </div>
      );

    case 'numbered-list':
      return (
        <div className={`flex items-start gap-2 ${containerClass}`}>
          <span className="text-notion-text mt-1">1.</span>
          {isEditing ? (
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={block.content?.text || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="List item"
              className={`${commonProps.className} flex-1`}
              {...commonProps}
            />
          ) : (
            <div 
              className={`flex-1 cursor-text ${!block.content?.text ? 'text-notion-text-secondary' : 'text-notion-text'} ${getTextStyle()}`}
              onClick={handleClick}
            >
              {block.content?.text || 'List item'}
            </div>
          )}
        </div>
      );

    case 'quote':
      return (
        <div className={`border-l-4 border-notion-text-secondary pl-4 ${containerClass}`}>
          {isEditing ? (
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={block.content?.text || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Quote"
              className={`${commonProps.className} italic`}
              {...commonProps}
            />
          ) : (
            <div 
              className={`italic cursor-text ${!block.content?.text ? 'text-notion-text-secondary' : 'text-notion-text'} ${getTextStyle()}`}
              onClick={handleClick}
            >
              {block.content?.text || 'Quote'}
            </div>
          )}
        </div>
      );

    case 'callout':
      return (
        <div className={`flex items-start gap-3 p-3 bg-gray-50 rounded border ${containerClass}`}>
          <span className="text-xl">{block.content?.icon || '💡'}</span>
          {isEditing ? (
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={block.content?.text || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Callout text"
              className={`${commonProps.className} flex-1 bg-transparent`}
              {...commonProps}
            />
          ) : (
            <div 
              className={`flex-1 cursor-text ${!block.content?.text ? 'text-notion-text-secondary' : 'text-notion-text'} ${getTextStyle()}`}
              onClick={handleClick}
            >
              {block.content?.text || 'Callout text'}
            </div>
          )}
        </div>
      );

    case 'checkbox':
      return (
        <div className={`flex items-start gap-2 ${containerClass}`}>
          <Checkbox
            checked={block.content?.checked || false}
            onCheckedChange={(checked) => onUpdate({ ...block.content, checked })}
            className="mt-1"
          />
          {isEditing ? (
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={block.content?.text || ''}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="To-do item"
              className={`${commonProps.className} flex-1 ${block.content?.checked ? 'line-through text-notion-text-secondary' : ''}`}
              {...commonProps}
            />
          ) : (
            <div 
              className={`flex-1 cursor-text ${!block.content?.text ? 'text-notion-text-secondary' : 'text-notion-text'} ${block.content?.checked ? 'line-through text-notion-text-secondary' : ''} ${getTextStyle()}`}
              onClick={handleClick}
            >
              {block.content?.text || 'To-do item'}
            </div>
          )}
        </div>
      );

    case 'code':
      return (
        <div className={`bg-gray-100 rounded p-3 ${containerClass}`}>
          <div className="text-xs text-notion-text-secondary mb-2">
            {block.content?.language || 'javascript'}
          </div>
          {isEditing ? (
            <Textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={block.content?.code || ''}
              onChange={(e) => onUpdate({ ...block.content, code: e.target.value })}
              placeholder="Code"
              className={`${commonProps.className} font-mono text-sm bg-transparent min-h-[60px]`}
              {...commonProps}
            />
          ) : (
            <pre 
              className={`font-mono text-sm cursor-text ${!block.content?.code ? 'text-notion-text-secondary' : 'text-notion-text'}`}
              onClick={handleClick}
            >
              {block.content?.code || 'Code'}
            </pre>
          )}
        </div>
      );

    case 'toggle':
      return (
        <div className={containerClass}>
          <div className="flex items-start gap-2">
            <button
              className="mt-1 hover:bg-notion-hover rounded p-0.5"
              onClick={() => onUpdate({ ...block.content, isOpen: !block.content?.isOpen })}
            >
              {block.content?.isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {isEditing ? (
              <Input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                value={block.content?.text || ''}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Toggle heading"
                className={`${commonProps.className} flex-1`}
                {...commonProps}
              />
            ) : (
              <div 
                className={`flex-1 cursor-text ${!block.content?.text ? 'text-notion-text-secondary' : 'text-notion-text'} ${getTextStyle()}`}
                onClick={handleClick}
              >
                {block.content?.text || 'Toggle heading'}
              </div>
            )}
          </div>
          {block.content?.isOpen && block.children && (
            <div className="ml-6 mt-2 space-y-1">
              {/* Render nested blocks here */}
            </div>
          )}
        </div>
      );

    case 'divider':
      return (
        <div className={`my-4 ${containerClass}`}>
          <hr className="border-notion-border" />
        </div>
      );

    default:
      return (
        <div className={containerClass}>
          <div className="text-notion-text-secondary italic">
            Unsupported block type: {block.type}
          </div>
        </div>
      );
  }
};

export default BlockRenderer;
