import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LiveMonitoringPanel = () => {
  const activeEmployees = [
    {
      id: 1,
      name: "Rajesh Kumar",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b09cae8d-1763295945796.png",
      avatarAlt: "Professional headshot of Indian man with short black hair wearing blue shirt",
      department: "Development",
      currentTask: "Working on API integration",
      sessionTime: "7h 20m",
      lastActivity: "Active now"
    },
    {
      id: 2,
      name: "Priya Sharma",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1947937c9-1763297984932.png",
      avatarAlt: "Professional headshot of Indian woman with long black hair wearing formal attire",
      department: "Design",
      currentTask: "Designing UI mockups",
      sessionTime: "7h 35m",
      lastActivity: "Active now"
    },
    {
      id: 3,
      name: "Vikram Singh",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12717b500-1763291922394.png",
      avatarAlt: "Professional headshot of Indian man with beard wearing black shirt",
      department: "Finance",
      currentTask: "Preparing financial reports",
      sessionTime: "7h 30m",
      lastActivity: "1 minute ago"
    },
    {
      id: 4,
      name: "Kavya Desai",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_142754305-1763293808603.png",
      avatarAlt: "Professional headshot of Indian woman with wavy hair wearing green dress",
      department: "Design",
      currentTask: "Editing graphics",
      sessionTime: "7h 25m",
      lastActivity: "Active now"
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              Live Monitoring
            </h3>
            <p className="text-sm text-muted-foreground">Currently active employees</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 text-success rounded-full">
            <Icon name="Users" size={16} />
            <span className="text-sm font-medium">{activeEmployees?.length} Active</span>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
        {activeEmployees?.map((employee) =>
        <div
          key={employee?.id}
          className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">

            <div className="flex items-start gap-3 mb-3">
              <div className="relative">
                <Image
                src={employee?.avatar}
                alt={employee?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover" />

                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground">{employee?.name}</h4>
                <p className="text-xs text-muted-foreground">{employee?.department}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{employee?.sessionTime}</p>
                <p className="text-xs text-muted-foreground">{employee?.lastActivity}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
              <Icon name="Activity" size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">{employee?.currentTask}</p>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: '75%' }} />

              </div>
              <span className="text-xs text-muted-foreground">75%</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">4</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-warning">2</p>
            <p className="text-xs text-muted-foreground">On Break</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-error">1</p>
            <p className="text-xs text-muted-foreground">Inactive</p>
          </div>
        </div>
      </div>
    </div>);

};

export default LiveMonitoringPanel;