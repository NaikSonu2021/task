import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CandidateCard = ({ candidate, onSelect, isSelected, onStatusChange }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div
      onClick={() => onSelect(candidate)}
      className={`bg-card border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-elevation-2 ${
        isSelected ? 'border-primary shadow-elevation-2' : 'border-border'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <Image
            src={candidate?.avatar}
            alt={candidate?.avatarAlt}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div
            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${
              candidate?.availability === 'available' ?'bg-success'
                : candidate?.availability === 'interview-scheduled' ?'bg-warning' :'bg-muted'
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">
                {candidate?.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {candidate?.position}
              </p>
            </div>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-lg ${getScoreBgColor(
                candidate?.aiScore
              )}`}
            >
              <Icon name="Sparkles" size={14} className={getScoreColor(candidate?.aiScore)} />
              <span className={`text-xs font-semibold ${getScoreColor(candidate?.aiScore)}`}>
                {candidate?.aiScore}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={14} />
              <span>{candidate?.appliedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Briefcase" size={14} />
              <span>{candidate?.experience}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                candidate?.stage === 'new' ?'bg-primary/10 text-primary'
                  : candidate?.stage === 'screening' ?'bg-warning/10 text-warning'
                  : candidate?.stage === 'interview' ?'bg-accent/10 text-accent'
                  : candidate?.stage === 'offer' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
              }`}
            >
              {candidate?.stage === 'new' && 'नया आवेदन'}
              {candidate?.stage === 'screening' && 'स्क्रीनिंग'}
              {candidate?.stage === 'interview' && 'साक्षात्कार'}
              {candidate?.stage === 'offer' && 'ऑफर'}
              {candidate?.stage === 'rejected' && 'अस्वीकृत'}
            </span>
            {candidate?.interviewDate && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Icon name="Clock" size={12} />
                {candidate?.interviewDate}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {candidate?.skills?.slice(0, 3)?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
            {candidate?.skills?.length > 3 && (
              <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-md">
                +{candidate?.skills?.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="xs"
              iconName="Eye"
              iconPosition="left"
              onClick={(e) => {
                e?.stopPropagation();
                onSelect(candidate);
              }}
            >
              विवरण देखें
            </Button>
            {candidate?.stage !== 'rejected' && (
              <Button
                variant="ghost"
                size="xs"
                iconName="MoreVertical"
                onClick={(e) => {
                  e?.stopPropagation();
                  onStatusChange(candidate);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;