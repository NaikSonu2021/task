import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const MessageComposer = ({ onSend, onCancel }) => {
  const [message, setMessage] = useState({
    recipients: [],
    subject: '',
    content: '',
    channels: {
      whatsapp: true,
      browser: true,
      email: false,
    },
    attachments: [],
  });

  const recipientOptions = [
    { value: 'all', label: 'सभी कर्मचारी' },
    { value: 'managers', label: 'सभी प्रबंधक' },
    { value: 'developers', label: 'सभी डेवलपर' },
    { value: 'finance', label: 'वित्त टीम' },
    { value: 'hr', label: 'HR टीम' },
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e?.target?.files);
    setMessage({
      ...message,
      attachments: [...message?.attachments, ...files],
    });
  };

  const removeAttachment = (index) => {
    setMessage({
      ...message,
      attachments: message?.attachments?.filter((_, i) => i !== index),
    });
  };

  const handleSend = () => {
    onSend(message);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Send" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              नया संदेश बनाएं
            </h2>
            <p className="text-sm text-muted-foreground">
              कर्मचारियों को सूचना भेजें
            </p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <Icon name="X" size={20} className="text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-4">
        <Select
          label="प्राप्तकर्ता"
          options={recipientOptions}
          value={message?.recipients}
          onChange={(value) => setMessage({ ...message, recipients: value })}
          multiple
          searchable
          placeholder="प्राप्तकर्ता चुनें"
          required
        />

        <Input
          label="विषय"
          type="text"
          placeholder="संदेश विषय दर्ज करें"
          value={message?.subject}
          onChange={(e) => setMessage({ ...message, subject: e?.target?.value })}
          required
        />

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            संदेश सामग्री
          </label>
          <textarea
            className="w-full min-h-[150px] px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            placeholder="अपना संदेश यहाँ लिखें..."
            value={message?.content}
            onChange={(e) => setMessage({ ...message, content: e?.target?.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            डिलीवरी चैनल
          </label>
          <div className="flex items-center gap-6">
            <Checkbox
              label="WhatsApp"
              checked={message?.channels?.whatsapp}
              onChange={(e) =>
                setMessage({
                  ...message,
                  channels: { ...message?.channels, whatsapp: e?.target?.checked },
                })
              }
            />
            <Checkbox
              label="ब्राउज़र"
              checked={message?.channels?.browser}
              onChange={(e) =>
                setMessage({
                  ...message,
                  channels: { ...message?.channels, browser: e?.target?.checked },
                })
              }
            />
            <Checkbox
              label="ईमेल"
              checked={message?.channels?.email}
              onChange={(e) =>
                setMessage({
                  ...message,
                  channels: { ...message?.channels, email: e?.target?.checked },
                })
              }
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            अटैचमेंट
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Icon name="Upload" size={32} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                फ़ाइलें अपलोड करने के लिए क्लिक करें
              </span>
              <span className="text-xs text-muted-foreground">
                PDF, DOC, XLS, JPG, PNG (अधिकतम 10MB)
              </span>
            </label>
          </div>

          {message?.attachments?.length > 0 && (
            <div className="mt-3 space-y-2">
              {message?.attachments?.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="File" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{file?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(file?.size / 1024)?.toFixed(2)} KB)
                    </span>
                  </div>
                  <button
                    onClick={() => removeAttachment(index)}
                    className="p-1 rounded hover:bg-background transition-colors"
                  >
                    <Icon name="X" size={16} className="text-error" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={onCancel}>
            रद्द करें
          </Button>
          <Button
            variant="default"
            iconName="Send"
            iconPosition="left"
            onClick={handleSend}
          >
            संदेश भेजें
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;