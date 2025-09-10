import { supabase } from "@/integrations/supabase/client";

export interface Notification {
  id: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
  user_id: string;
}

export const notificationsService = {
  // Fetch notifications for the current user
  async getUserNotifications() {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }

    return data || [];
  },

  // Mark a notification as read
  async markAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }

    return true;
  },

  // Mark all notifications as read for the current user
  async markAllAsRead() {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('read', false);

    if (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }

    return true;
  },

  // Create a new notification (admin only)
  async createNotification(userId: string, message: string, type: string) {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        message,
        type,
        read: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating notification:', error);
      return null;
    }

    return data;
  }
};