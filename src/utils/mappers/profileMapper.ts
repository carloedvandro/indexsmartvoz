
import { Sponsor } from "@/types/profile";

/**
 * Maps the sponsor data from the database to a strongly typed Sponsor object
 * @param sponsorData - Raw sponsor data from the database
 * @returns Typed Sponsor object or null if no sponsor data
 */
export const mapSponsor = (sponsorData: Record<string, any> | null): Sponsor | null => {
  if (!sponsorData || typeof sponsorData !== "object") {
    console.warn("Invalid sponsor data:", sponsorData);
    return null;
  }

  return {
    id: sponsorData.id || null,
    full_name: sponsorData.full_name || null,
    email: sponsorData.email || null,
    custom_id: sponsorData.custom_id || null,
  };
};
