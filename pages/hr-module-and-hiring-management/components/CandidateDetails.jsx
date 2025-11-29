import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CandidateDetails = ({ candidate, onClose, onStatusUpdate, onScheduleInterview }) => {
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [notes, setNotes] = useState('');
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const stageOptions = [
    { value: 'new', label: 'नया आवेदन' },
    { value: 'screening', label: 'स्क्रीनिंग' },
    { value: 'interview', label: 'साक्षात्कार' },
    { value: 'offer', label: 'ऑफर' },
    { value: 'rejected', label: 'अस्वीकृत' },
  ];

  const handleScheduleInterview = () => {
    if (interviewDate && interviewTime) {
      onScheduleInterview(candidate?.id, {
        date: interviewDate,
        time: interviewTime,
        notes: notes,
      });
      setShowScheduleForm(false);
      setInterviewDate('');
      setInterviewTime('');
      setNotes('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">उम्मीदवार विवरण</h2>
        <Button variant="ghost" size="icon" iconName="X" onClick={onClose} />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="flex items-start gap-4">
          <Image
            src={candidate?.avatar}
            alt={candidate?.avatarAlt}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-1">{candidate?.name}</h3>
            <p className="text-muted-foreground mb-2">{candidate?.position}</p>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${candidate?.email}`}
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <Icon name="Mail" size={14} />
                {candidate?.email}
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href={`tel:${candidate?.phone}`}
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <Icon name="Phone" size={14} />
                {candidate?.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Sparkles" size={20} className="text-accent" />
            <h4 className="font-semibold text-foreground">AI मूल्यांकन स्कोर</h4>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted-foreground">कुल स्कोर</span>
                <span className="text-sm font-semibold text-foreground">
                  {candidate?.aiScore}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${candidate?.aiScore}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted-foreground">कौशल मिलान</span>
                <span className="text-sm font-semibold text-foreground">
                  {candidate?.skillMatch}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success transition-all duration-300"
                  style={{ width: `${candidate?.skillMatch}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted-foreground">अनुभव स्तर</span>
                <span className="text-sm font-semibold text-foreground">
                  {candidate?.experienceLevel}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${candidate?.experienceLevel}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted-foreground">सांस्कृतिक फिट</span>
                <span className="text-sm font-semibold text-foreground">
                  {candidate?.culturalFit}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-warning transition-all duration-300"
                  style={{ width: `${candidate?.culturalFit}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="FileText" size={18} />
            AI सारांश
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {candidate?.aiSummary}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Award" size={18} />
            कौशल
          </h4>
          <div className="flex flex-wrap gap-2">
            {candidate?.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Briefcase" size={18} />
            अनुभव
          </h4>
          <div className="space-y-3">
            {candidate?.workHistory?.map((work, index) => (
              <div key={index} className="border-l-2 border-primary pl-4">
                <h5 className="font-medium text-foreground">{work?.position}</h5>
                <p className="text-sm text-muted-foreground">{work?.company}</p>
                <p className="text-xs text-muted-foreground mt-1">{work?.duration}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="GraduationCap" size={18} />
            शिक्षा
          </h4>
          <div className="space-y-3">
            {candidate?.education?.map((edu, index) => (
              <div key={index} className="border-l-2 border-accent pl-4">
                <h5 className="font-medium text-foreground">{edu?.degree}</h5>
                <p className="text-sm text-muted-foreground">{edu?.institution}</p>
                <p className="text-xs text-muted-foreground mt-1">{edu?.year}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="MessageSquare" size={18} />
            साक्षात्कार नोट्स
          </h4>
          {candidate?.interviewNotes?.length > 0 ? (
            <div className="space-y-3">
              {candidate?.interviewNotes?.map((note, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      {note?.date}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-medium text-foreground">
                      {note?.interviewer}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{note?.note}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">कोई साक्षात्कार नोट्स उपलब्ध नहीं</p>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Paperclip" size={18} />
            दस्तावेज़
          </h4>
          <div className="space-y-2">
            <a
              href={candidate?.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">Resume.pdf</p>
                <p className="text-xs text-muted-foreground">2.4 MB</p>
              </div>
              <Icon name="Download" size={18} className="text-muted-foreground" />
            </a>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-border space-y-3">
        <Select
          label="स्थिति अपडेट करें"
          options={stageOptions}
          value={candidate?.stage}
          onChange={(value) => onStatusUpdate(candidate?.id, value)}
        />

        {!showScheduleForm ? (
          <Button
            variant="outline"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
            onClick={() => setShowScheduleForm(true)}
          >
            साक्षात्कार शेड्यूल करें
          </Button>
        ) : (
          <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
            <Input
              type="date"
              label="साक्षात्कार तिथि"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e?.target?.value)}
            />
            <Input
              type="time"
              label="समय"
              value={interviewTime}
              onChange={(e) => setInterviewTime(e?.target?.value)}
            />
            <Input
              type="text"
              label="नोट्स (वैकल्पिक)"
              placeholder="साक्षात्कार के बारे में कोई नोट्स..."
              value={notes}
              onChange={(e) => setNotes(e?.target?.value)}
            />
            <div className="flex gap-2">
              <Button
                variant="default"
                fullWidth
                iconName="Check"
                iconPosition="left"
                onClick={handleScheduleInterview}
              >
                शेड्यूल करें
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowScheduleForm(false)}
              >
                रद्द करें
              </Button>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="success"
            fullWidth
            iconName="UserPlus"
            iconPosition="left"
            onClick={() => onStatusUpdate(candidate?.id, 'offer')}
          >
            ऑफर भेजें
          </Button>
          <Button
            variant="destructive"
            fullWidth
            iconName="UserX"
            iconPosition="left"
            onClick={() => onStatusUpdate(candidate?.id, 'rejected')}
          >
            अस्वीकार करें
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;