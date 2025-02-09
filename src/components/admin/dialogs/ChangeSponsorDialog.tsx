
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ChangeSponsorDialogProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ChangeSponsorDialog = ({ userId, isOpen, onClose }: ChangeSponsorDialogProps) => {
  const [newSponsorId, setNewSponsorId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.rpc("move_user_and_network", {
        admin_user_id: (await supabase.auth.getUser()).data.user?.id,
        user_to_move_id: userId,
        new_sponsor_id: newSponsorId
      });

      if (error) throw error;
      onClose();
    } catch (error) {
      console.error("Error changing sponsor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Sponsor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="New Sponsor ID"
            value={newSponsorId}
            onChange={(e) => setNewSponsorId(e.target.value)}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Sponsor"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
