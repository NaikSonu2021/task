import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationPreferences = ({ preferences, onPreferenceChange }) => {
  const frequencyOptions = [
    { value: 'instant', label: 'तुरंत' },
    { value: 'hourly', label: 'प्रति घंटा' },
    { value: 'daily', label: 'दैनिक' },
    { value: 'weekly', label: 'साप्ताहिक' },
  ];

  const notificationCategories = [
    {
      id: 'taskAssignments',
      label: 'कार्य असाइनमेंट',
      description: 'जब आपको नया कार्य सौंपा जाता है',
      icon: 'CheckSquare',
    },
    {
      id: 'deadlineReminders',
      label: 'समय सीमा अनुस्मारक',
      description: 'कार्य समय सीमा से पहले अनुस्मारक',
      icon: 'Clock',
    },
    {
      id: 'systemAlerts',
      label: 'सिस्टम अलर्ट',
      description: 'महत्वपूर्ण सिस्टम अपडेट और रखरखाव',
      icon: 'Bell',
    },
    {
      id: 'payrollNotifications',
      label: 'पेरोल सूचनाएं',
      description: 'वेतन प्रसंस्करण और भुगतान अपडेट',
      icon: 'DollarSign',
    },
    {
      id: 'attendanceAlerts',
      label: 'उपस्थिति अलर्ट',
      description: 'उपस्थिति और कार्य घंटे अपडेट',
      icon: 'Calendar',
    },
    {
      id: 'hrUpdates',
      label: 'HR अपडेट',
      description: 'भर्ती और कर्मचारी अपडेट',
      icon: 'Users',
    },
  ];

  const channels = [
    { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle' },
    { id: 'browser', label: 'ब्राउज़र', icon: 'Monitor' },
    { id: 'email', label: 'ईमेल', icon: 'Mail' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="Settings" size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            सूचना प्राथमिकताएं
          </h2>
          <p className="text-sm text-muted-foreground">
            अपनी सूचना सेटिंग्स को अनुकूलित करें
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            सूचना आवृत्ति
          </label>
          <Select
            options={frequencyOptions}
            value={preferences?.frequency}
            onChange={(value) => onPreferenceChange('frequency', value)}
            placeholder="आवृत्ति चुनें"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            सूचना प्रकार
          </label>
          <div className="space-y-3">
            {notificationCategories?.map((category) => (
              <div
                key={category?.id}
                className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <Icon
                  name={category?.icon}
                  size={20}
                  className="text-muted-foreground mt-0.5"
                />
                <div className="flex-1">
                  <Checkbox
                    label={category?.label}
                    description={category?.description}
                    checked={preferences?.categories?.[category?.id]}
                    onChange={(e) =>
                      onPreferenceChange('categories', {
                        ...preferences?.categories,
                        [category?.id]: e?.target?.checked,
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            डिलीवरी चैनल
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {channels?.map((channel) => (
              <div
                key={channel?.id}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <Icon
                  name={channel?.icon}
                  size={20}
                  className="text-muted-foreground"
                />
                <Checkbox
                  label={channel?.label}
                  checked={preferences?.channels?.[channel?.id]}
                  onChange={(e) =>
                    onPreferenceChange('channels', {
                      ...preferences?.channels,
                      [channel?.id]: e?.target?.checked,
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Checkbox
            label="शांत घंटे सक्षम करें"
            description="रात 10:00 बजे से सुबह 8:00 बजे तक सूचनाएं म्यूट करें"
            checked={preferences?.quietHours}
            onChange={(e) => onPreferenceChange('quietHours', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;