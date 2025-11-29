import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Sidebar, { SidebarProvider } from '../../components/ui/Sidebar';
import MobileMenuButton from '../../components/ui/MobileMenuButton';
import NotificationBadge from '../../components/ui/NotificationBadge';
import QuickActionDropdown from '../../components/ui/QuickActionDropdown';
import NotificationCard from './components/NotificationCard';
import WhatsAppIntegrationPanel from './components/WhatsAppIntegrationPanel';
import FilterToolbar from './components/FilterToolbar';
import NotificationPreferences from './components/NotificationPreferences';
import DeliveryAnalytics from './components/DeliveryAnalytics';
import MessageComposer from './components/MessageComposer';
import Button from '../../components/ui/Button';

const NotificationCenterAndCommunicationHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('notifications');
  const [showComposer, setShowComposer] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    channel: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    preset: 'all'
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      senderName: 'Rajesh Kumar',
      senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17de2c40c-1763294952850.png",
      senderAvatarAlt: 'Professional headshot of Indian man with short black hair wearing blue formal shirt',
      type: 'task',
      typeLabel: 'Task Assignment',
      message: 'You have been assigned a new task: "Update Website Design". Please complete by November 25, 2025.',
      timestamp: '2 minutes ago',
      channel: 'whatsapp',
      deliveryStatus: 'delivered',
      isRead: false
    },
    {
      id: 2,
      senderName: 'System Alert',
      senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10012a366-1764447326994.png",
      senderAvatarAlt: 'System notification icon with blue background and bell symbol',
      type: 'system',
      typeLabel: 'System Alert',
      message: 'System maintenance scheduled for November 30, 2025 from 11:00 PM to 2:00 AM. Please save your work.',
      timestamp: '15 minutes ago',
      channel: 'browser',
      deliveryStatus: 'delivered',
      isRead: false
    },
    {
      id: 3,
      senderName: 'Priya Sharma (Finance)',
      senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1947937c9-1763297984932.png",
      senderAvatarAlt: 'Professional headshot of Indian woman with long black hair wearing red formal blazer',
      type: 'payroll',
      typeLabel: 'Payroll Notification',
      message: 'November 2025 salary has been processed. Your salary slip is available for download.',
      timestamp: '1 hour ago',
      channel: 'email',
      deliveryStatus: 'delivered',
      isRead: true
    },
    {
      id: 4,
      senderName: 'Amit Patel',
      senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17c3cbb98-1763291944258.png",
      senderAvatarAlt: 'Professional headshot of Indian man with glasses wearing white formal shirt',
      type: 'deadline',
      typeLabel: 'Deadline Reminder',
      message: 'Reminder: "Mobile App Testing" task deadline is in 2 days.',
      timestamp: '3 hours ago',
      channel: 'whatsapp',
      deliveryStatus: 'pending',
      isRead: false
    },
    {
      id: 5,
      senderName: 'HR Department',
      senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d9ddc757-1763297359216.png",
      senderAvatarAlt: 'Professional headshot of Indian woman with short hair wearing green formal dress',
      type: 'hr',
      typeLabel: 'HR Update',
      message: 'New recruitment policy will be effective from December 1, 2025. Please review updated documents.',
      timestamp: '5 hours ago',
      channel: 'browser',
      deliveryStatus: 'failed',
      isRead: true
    },
    {
      id: 6,
      senderName: 'Sunita Verma',
      senderAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12c4ad9ff-1763298094776.png",
      senderAvatarAlt: 'Professional headshot of Indian woman with long hair wearing yellow formal top',
      type: 'attendance',
      typeLabel: 'Attendance',
      message: 'Your attendance for today has been recorded at 9:15 AM. Total work hours: 8 hours 30 minutes.',
      timestamp: '1 day ago',
      channel: 'whatsapp',
      deliveryStatus: 'read',
      isRead: true
    }
  ]);

  const [integrationData, setIntegrationData] = useState({
    connectionStatus: 'connected',
    deliveryRate: 98.5,
    messagesSentToday: 247,
    lastSync: '5 minutes ago'
  });

  const [preferences, setPreferences] = useState({
    frequency: 'instant',
    categories: {
      taskAssignments: true,
      deadlineReminders: true,
      systemAlerts: true,
      payrollNotifications: true,
      attendanceAlerts: false,
      hrUpdates: true
    },
    channels: {
      whatsapp: true,
      browser: true,
      email: false
    },
    quietHours: true
  });

  const [analyticsData, setAnalyticsData] = useState({
    deliveryRate: 98.5,
    openRate: 87.3,
    avgResponseTime: '45 minutes',
    totalSent: 1247,
    channelEffectiveness: [
      { channel: 'WhatsApp', delivered: 450, opened: 420 },
      { channel: 'Browser', delivered: 380, opened: 310 },
      { channel: 'Email', delivered: 417, opened: 280 }
    ],
    typeDistribution: [
      { name: 'Tasks', value: 450 },
      { name: 'System', value: 280 },
      { name: 'Payroll', value: 320 },
      { name: 'Others', value: 197 }
    ]
  });

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications?.map((notif) =>
      notif?.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications(notifications?.filter((notif) => notif?.id !== id));
  };

  const handleRetry = (id) => {
    setNotifications(
      notifications?.map((notif) =>
      notif?.id === id ? { ...notif, deliveryStatus: 'pending' } : notif
      )
    );
    setTimeout(() => {
      setNotifications((prev) =>
      prev?.map((notif) =>
      notif?.id === id ? { ...notif, deliveryStatus: 'delivered' } : notif
      )
      );
    }, 2000);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleSearch = (value) => {
    setFilters({ ...filters, search: value });
  };

  const handleBulkAction = (action) => {
    if (action === 'markRead') {
      setNotifications(
        notifications?.map((notif) =>
        selectedNotifications?.includes(notif?.id) ?
        { ...notif, isRead: true } :
        notif
        )
      );
    } else if (action === 'delete') {
      setNotifications(
        notifications?.filter((notif) => !selectedNotifications?.includes(notif?.id))
      );
    }
    setSelectedNotifications([]);
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const handleSendMessage = (message) => {
    console.log('Sending message:', message);
    setShowComposer(false);
  };

  const handleRefreshIntegration = () => {
    setIntegrationData({
      ...integrationData,
      lastSync: 'Now'
    });
  };

  const handleScanQR = () => {
    alert('QR code scanning feature will be available soon');
  };

  const unreadCount = notifications?.filter((n) => !n?.isRead)?.length;

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: 'Bell', badge: unreadCount },
    { id: 'whatsapp', label: 'WhatsApp Integration', icon: 'MessageCircle' },
    { id: 'preferences', label: 'Preferences', icon: 'Settings' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <MobileMenuButton />
        <Sidebar userRole="admin" />

        <div className="main-content">
          <div className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Notification Center
                  </h1>
                  <p className="text-muted-foreground">
                    Manage all communications and alerts in one place
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <QuickActionDropdown userRole="admin" />
                  <Button
                    variant="default"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => setShowComposer(true)}>
                    New Message
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab?.id ?
                  'bg-primary text-primary-foreground shadow-elevation-2' :
                  'bg-card text-muted-foreground hover:bg-muted'}`
                  }>

                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                    {tab?.badge > 0 &&
                  <NotificationBadge count={tab?.badge} variant="error" />
                  }
                  </button>
                )}
              </div>

              {showComposer &&
              <div className="mb-6">
                  <MessageComposer
                  onSend={handleSendMessage}
                  onCancel={() => setShowComposer(false)} />

                </div>
              }

              {activeTab === 'notifications' &&
              <div className="space-y-6">
                  <FilterToolbar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onSearch={handleSearch}
                  onBulkAction={handleBulkAction}
                  selectedCount={selectedNotifications?.length} />


                  <div className="space-y-4">
                    {notifications?.length > 0 ? (
                      notifications?.map((notification) => (
                        <NotificationCard
                          key={notification?.id}
                          notification={notification}
                          onMarkAsRead={handleMarkAsRead}
                          onDelete={handleDelete}
                          onRetry={handleRetry}
                        />
                      ))
                    ) : (
                      <div className="bg-card border border-border rounded-lg p-12 text-center">
                        <Icon
                          name="Inbox"
                          size={64}
                          className="text-muted-foreground mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          No Notifications
                        </h3>
                        <p className="text-muted-foreground">
                          You don't have any notifications at the moment
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              }

              {activeTab === 'whatsapp' &&
              <WhatsAppIntegrationPanel
                integrationData={integrationData}
                onRefresh={handleRefreshIntegration}
                onScanQR={handleScanQR} />

              }

              {activeTab === 'preferences' &&
              <NotificationPreferences
                preferences={preferences}
                onPreferenceChange={handlePreferenceChange} />

              }

              {activeTab === 'analytics' &&
              <DeliveryAnalytics analyticsData={analyticsData} />
              }
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default NotificationCenterAndCommunicationHub;