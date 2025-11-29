import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  sendTaskAssignmentNotification, 
  sendTaskStatusUpdateNotification,
  sendTaskCompletionNotificationToAdmin 
} from '../utils/whatsappService';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

// Helper function to calculate employee availability status
const calculateEmployeeAvailability = (employeeName, allTasks) => {
  // Check if employee has any active (non-completed) tasks
  const hasActiveTasks = allTasks?.some(
    (task) => 
      task?.assignee?.name === employeeName && 
      task?.status !== 'completed'
  );
  
  // Employee is available only if they have NO active tasks
  return !hasActiveTasks;
};

// Helper function to update all tasks with correct availability status
const updateTasksWithAvailability = (tasks) => {
  return tasks?.map((task) => ({
    ...task,
    assignee: {
      ...task?.assignee,
      available: calculateEmployeeAvailability(task?.assignee?.name, tasks)
    }
  }));
};

export const TaskProvider = ({ children }) => {
  const defaultTasks = [
    {
      id: "TSK-001",
      title: "Database Schema Design and Migration",
      description: "Design database schema for new user management module and migrate existing data. Ensure all relationships and indexes are properly set up.",
      project: "Website Redesign",
      assignee: {
        name: "Priya Sharma",
        role: "Senior Developer",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc96d634-1763295460493.png",
        avatarAlt: "Professional headshot of Indian woman with long black hair wearing red traditional attire",
        available: true
      },
      priority: "high",
      priorityLabel: "High",
      status: "in-progress",
      statusLabel: "In Progress",
      dueDate: "2025-12-05T18:00:00",
      progress: 65,
      createdAt: "2025-11-25T09:00:00",
      completedAt: null
    },
    {
      id: "TSK-002",
      title: "Mobile App UI/UX Design",
      description: "Design responsive mobile app interface for iOS and Android. Include all screens and interaction flows.",
      project: "Mobile App Development",
      assignee: {
        name: "Neha Gupta",
        role: "UI/UX Designer",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_110d6e0d8-1763301538824.png",
        avatarAlt: "Professional headshot of Indian woman with medium length black hair wearing blue formal attire",
        available: true
      },
      priority: "critical",
      priorityLabel: "Critical",
      status: "review",
      statusLabel: "In Review",
      dueDate: "2025-12-02T17:00:00",
      progress: 90,
      createdAt: "2025-11-20T10:30:00",
      completedAt: null
    },
    {
      id: "TSK-003",
      title: "API Endpoint Development",
      description: "Create RESTful API endpoints for user authentication, data management and file uploads.",
      project: "API Integration",
      assignee: {
        name: "Amit Patel",
        role: "Backend Developer",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17de2c40c-1763294952850.png",
        avatarAlt: "Professional headshot of Indian man with short black hair wearing white formal shirt",
        available: false
      },
      priority: "high",
      priorityLabel: "High",
      status: "in-progress",
      statusLabel: "In Progress",
      dueDate: "2025-12-08T16:00:00",
      progress: 45,
      createdAt: "2025-11-26T11:00:00",
      completedAt: null
    },
    {
      id: "TSK-004",
      title: "Security Audit and Penetration Testing",
      description: "Conduct comprehensive security audit of the entire application and identify potential vulnerabilities.",
      project: "Security Audit",
      assignee: {
        name: "Vikas Singh",
        role: "Security Expert",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18c23f11e-1763293073674.png",
        avatarAlt: "Professional headshot of Indian man with short black hair and beard wearing grey formal suit",
        available: true
      },
      priority: "critical",
      priorityLabel: "Critical",
      status: "pending",
      statusLabel: "Pending",
      dueDate: "2025-12-10T18:00:00",
      progress: 0,
      createdAt: "2025-11-28T09:30:00",
      completedAt: null
    },
    {
      id: "TSK-005",
      title: "Performance Optimization",
      description: "Improve website loading speed and performance. Implement code splitting and lazy loading.",
      project: "Website Redesign",
      assignee: {
        name: "Rajesh Kumar",
        role: "Frontend Developer",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17de2c40c-1763294952850.png",
        avatarAlt: "Professional headshot of Indian man with short black hair wearing blue formal shirt",
        available: true
      },
      priority: "medium",
      priorityLabel: "Medium",
      status: "completed",
      statusLabel: "Completed",
      dueDate: "2025-11-30T17:00:00",
      progress: 100,
      createdAt: "2025-11-22T10:00:00",
      completedAt: "2025-11-30T16:45:00"
    },
    {
      id: "TSK-006",
      title: "Write Unit Test Cases",
      description: "Write comprehensive unit test cases for all API endpoints and business logic.",
      project: "API Integration",
      assignee: {
        name: "Priya Sharma",
        role: "Senior Developer",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc96d634-1763295460493.png",
        avatarAlt: "Professional headshot of Indian woman with long black hair wearing red traditional attire",
        available: true
      },
      priority: "medium",
      priorityLabel: "Medium",
      status: "in-progress",
      statusLabel: "In Progress",
      dueDate: "2025-12-06T16:00:00",
      progress: 30,
      createdAt: "2025-11-27T14:00:00",
      completedAt: null
    },
    {
      id: "TSK-007",
      title: "Prepare Documentation",
      description: "Prepare API documentation, user guide and developer documentation.",
      project: "Database Migration",
      assignee: {
        name: "Neha Gupta",
        role: "UI/UX Designer",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_110d6e0d8-1763301538824.png",
        avatarAlt: "Professional headshot of Indian woman with medium length black hair wearing blue formal attire",
        available: true
      },
      priority: "low",
      priorityLabel: "Low",
      status: "pending",
      statusLabel: "Pending",
      dueDate: "2025-12-15T18:00:00",
      progress: 0,
      createdAt: "2025-11-29T10:00:00",
      completedAt: null
    },
    {
      id: "TSK-008",
      title: "Cloud Deployment Setup",
      description: "Setup production environment on AWS and configure CI/CD pipeline.",
      project: "API Integration",
      assignee: {
        name: "Vikas Singh",
        role: "Security Expert",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18c23f11e-1763293073674.png",
        avatarAlt: "Professional headshot of Indian man with short black hair and beard wearing grey formal suit",
        available: true
      },
      priority: "high",
      priorityLabel: "High",
      status: "blocked",
      statusLabel: "Blocked",
      dueDate: "2025-12-12T17:00:00",
      progress: 20,
      createdAt: "2025-11-28T15:30:00",
      completedAt: null
    }
  ];

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('babagroups_tasks');
    const loadedTasks = savedTasks ? JSON.parse(savedTasks) : defaultTasks;
    // Calculate correct availability status on initial load
    return updateTasksWithAvailability(loadedTasks);
  });

  const [showCompletedTasks, setShowCompletedTasks] = useState(() => {
    const savedPreference = localStorage.getItem('babagroups_show_completed_tasks');
    return savedPreference ? JSON.parse(savedPreference) : true;
  });

  useEffect(() => {
    localStorage.setItem('babagroups_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('babagroups_show_completed_tasks', JSON.stringify(showCompletedTasks));
  }, [showCompletedTasks]);

  const addTask = async (task) => {
    const newTask = {
      ...task,
      id: `TSK-${String(tasks?.length + 1)?.padStart(3, '0')}`,
      createdAt: new Date()?.toISOString(),
      completedAt: null,
      progress: 0
    };
    
    const updatedTasks = [...tasks, newTask];
    // Recalculate availability for all employees
    setTasks(updateTasksWithAvailability(updatedTasks));

    // Send WhatsApp notification to assigned employee
    try {
      const result = await sendTaskAssignmentNotification(newTask, task?.assignee);
      if (result?.success) {
        console.log(`WhatsApp notification sent to ${task?.assignee?.name}`);
      } else {
        console.log(`WhatsApp notification not sent: ${result?.reason || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to send WhatsApp notification:', error);
    }

    return newTask;
  };

  const updateTask = async (taskId, updates) => {
    const oldTask = tasks?.find((task) => task?.id === taskId);
    
    const updatedTasks = tasks?.map((task) => {
      if (task?.id === taskId) {
        const updatedTask = { ...task, ...updates };
        if (updates?.status === 'completed' && !task?.completedAt) {
          updatedTask.completedAt = new Date()?.toISOString();
          updatedTask.progress = 100;
        }
        return updatedTask;
      }
      return task;
    });
    
    // Recalculate availability for all employees after status change
    setTasks(updateTasksWithAvailability(updatedTasks));

    // Send WhatsApp notification if status changed
    if (updates?.status && oldTask?.status !== updates?.status) {
      try {
        const updatedTask = updatedTasks?.find((t) => t?.id === taskId);
        
        // Notify employee about status change
        const result = await sendTaskStatusUpdateNotification(
          updatedTask, 
          updatedTask?.assignee, 
          oldTask?.status
        );
        
        if (result?.success) {
          console.log(`Status update notification sent to ${updatedTask?.assignee?.name}`);
        }

        // If task completed, notify admin/manager
        if (updates?.status === 'completed') {
          // You can configure admin phone in settings or environment variable
          const adminPhone = '+91 98765 43210'; // Replace with actual admin phone
          await sendTaskCompletionNotificationToAdmin(
            updatedTask,
            updatedTask?.assignee,
            adminPhone
          );
        }
      } catch (error) {
        console.error('Failed to send status update notification:', error);
      }
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks?.filter((task) => task?.id !== taskId);
    // Recalculate availability after task deletion
    setTasks(updateTasksWithAvailability(updatedTasks));
  };

  const getTaskById = (taskId) => {
    return tasks?.find((task) => task?.id === taskId);
  };

  const getActiveTasks = () => {
    if (showCompletedTasks) {
      return tasks;
    }
    return tasks?.filter((task) => task?.status !== 'completed');
  };

  const getCompletedTasks = () => {
    return tasks?.filter((task) => task?.status === 'completed');
  };

  const toggleShowCompletedTasks = () => {
    setShowCompletedTasks((prev) => !prev);
  };

  // Comprehensive search function that searches across all task data
  const searchTasks = (searchQuery) => {
    if (!searchQuery || searchQuery?.trim() === '') {
      return tasks;
    }

    const query = searchQuery?.toLowerCase()?.trim();
    
    return tasks?.filter((task) => {
      // Search in task ID
      if (task?.id?.toLowerCase()?.includes(query)) return true;
      
      // Search in task title
      if (task?.title?.toLowerCase()?.includes(query)) return true;
      
      // Search in task description
      if (task?.description?.toLowerCase()?.includes(query)) return true;
      
      // Search in project name
      if (task?.project?.toLowerCase()?.includes(query)) return true;
      
      // Search in assignee name
      if (task?.assignee?.name?.toLowerCase()?.includes(query)) return true;
      
      // Search in assignee role
      if (task?.assignee?.role?.toLowerCase()?.includes(query)) return true;
      
      // Search in status
      if (task?.status?.toLowerCase()?.includes(query)) return true;
      if (task?.statusLabel?.toLowerCase()?.includes(query)) return true;
      
      // Search in priority
      if (task?.priority?.toLowerCase()?.includes(query)) return true;
      if (task?.priorityLabel?.toLowerCase()?.includes(query)) return true;
      
      return false;
    });
  };

  const value = {
    tasks,
    showCompletedTasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    getActiveTasks,
    getCompletedTasks,
    toggleShowCompletedTasks,
    searchTasks
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};