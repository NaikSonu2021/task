/**
 * WhatsApp Notification Service
 * Handles automatic WhatsApp message sending through the backend server
 */

const WHATSAPP_BACKEND_URL = import.meta.env?.VITE_WHATSAPP_BACKEND_URL || 'http://localhost:3001';

/**
 * Send WhatsApp message to a recipient
 * @param {string} phoneNumber - Recipient's phone number (with country code)
 * @param {string} message - Message text to send
 * @returns {Promise<Object>} Response with success status
 */
export const sendWhatsAppMessage = async (phoneNumber, message) => {
  try {
    // Remove any spaces or special characters from phone number
    const cleanPhone = phoneNumber?.replace(/\s+/g, '')?.replace(/[^\d+]/g, '');
    
    const response = await fetch(`${WHATSAPP_BACKEND_URL}/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: cleanPhone,
        message: message
      })
    });

    if (!response?.ok) {
      throw new Error('Failed to send WhatsApp message');
    }

    const data = await response?.json();
    return { success: true, data };
  } catch (error) {
    console.error('WhatsApp message error:', error);
    return { success: false, error: error?.message };
  }
};

/**
 * Send task assignment notification
 * @param {Object} task - Task object
 * @param {Object} employee - Employee object with phone number
 */
export const sendTaskAssignmentNotification = async (task, employee) => {
  if (!employee?.whatsappConnected || !employee?.phone) {
    console.log(`WhatsApp not connected for ${employee?.name}`);
    return { success: false, reason: 'WhatsApp not connected' };
  }

  const message = `
🎯 *New Task Assigned - Baba Groups*

*Task:* ${task?.title}
*ID:* ${task?.id}
*Priority:* ${task?.priorityLabel}
*Due Date:* ${new Date(task?.dueDate)?.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })}

*Description:*
${task?.description}

*Project:* ${task?.project}

Please acknowledge and start working on this task.

_Baba Groups Task Management System_
  `?.trim();

  return await sendWhatsAppMessage(employee?.phone, message);
};

/**
 * Send task status update notification
 * @param {Object} task - Task object with updated status
 * @param {Object} employee - Employee object
 * @param {string} oldStatus - Previous status
 */
export const sendTaskStatusUpdateNotification = async (task, employee, oldStatus) => {
  if (!employee?.whatsappConnected || !employee?.phone) {
    return { success: false, reason: 'WhatsApp not connected' };
  }

  const statusEmojis = {
    'pending': '⏳',
    'in-progress': '🚀',
    'review': '👀',
    'completed': '✅',
    'blocked': '🚫'
  };

  const message = `
${statusEmojis?.[task?.status] || '📋'} *Task Status Updated - Baba Groups*

*Task:* ${task?.title}
*ID:* ${task?.id}

*Status Changed:*
${statusEmojis?.[oldStatus] || '📋'} ${oldStatus?.replace(/-/g, ' ')?.toUpperCase()} → ${statusEmojis?.[task?.status] || '📋'} ${task?.statusLabel}

${task?.status === 'completed' ? '🎉 Congratulations on completing the task!' : ''}
${task?.status === 'blocked' ? '⚠️ Please address the blocking issues immediately.' : ''}

*Current Progress:* ${task?.progress}%

_Baba Groups Task Management System_
  `?.trim();

  return await sendWhatsAppMessage(employee?.phone, message);
};

/**
 * Send task completion notification to admin/manager
 * @param {Object} task - Completed task object
 * @param {Object} employee - Employee who completed the task
 * @param {string} adminPhone - Admin phone number
 */
export const sendTaskCompletionNotificationToAdmin = async (task, employee, adminPhone) => {
  if (!adminPhone) {
    return { success: false, reason: 'Admin phone not provided' };
  }

  const message = `
✅ *Task Completed - Baba Groups*

*Employee:* ${employee?.name} (${employee?.role})
*Task:* ${task?.title}
*ID:* ${task?.id}
*Project:* ${task?.project}

*Completed At:* ${new Date(task?.completedAt)?.toLocaleString('en-IN')}
*Priority:* ${task?.priorityLabel}

Review the task completion in the system.

_Baba Groups Task Management System_
  `?.trim();

  return await sendWhatsAppMessage(adminPhone, message);
};

/**
 * Send employee credential notification
 * @param {Object} employee - New employee object
 * @param {string} temporaryPassword - Generated temporary password
 */
export const sendEmployeeCredentialsNotification = async (employee, temporaryPassword) => {
  if (!employee?.whatsappConnected || !employee?.phone) {
    return { success: false, reason: 'WhatsApp not connected' };
  }

  const message = `
👋 *Welcome to Baba Groups!*

Hello *${employee?.name}*,

Your account has been created successfully.

*Login Credentials:*
📧 Email: ${employee?.email}
🔑 Password: ${temporaryPassword}

*Role:* ${employee?.role}
*Department:* ${employee?.department}

⚠️ Please change your password after first login.

Login at: [Your App URL]

_Baba Groups Task Management System_
  `?.trim();

  return await sendWhatsAppMessage(employee?.phone, message);
};

export default {
  sendWhatsAppMessage,
  sendTaskAssignmentNotification,
  sendTaskStatusUpdateNotification,
  sendTaskCompletionNotificationToAdmin,
  sendEmployeeCredentialsNotification
};